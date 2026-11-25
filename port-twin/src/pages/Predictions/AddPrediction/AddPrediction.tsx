import { useRef, useState, type FormEvent } from 'react';
import { useForm, type Path, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import './AddPrediction.scss';

import TopBar from '../../../components/Common/TopBar/TopBar';
import { routes } from '../../../utils/routes';
import AddPredictionFooter from '../../../components/Predictions/AddPrediction/AddPredictionFooter/AddPredictionFooter';
import GridDefinition from '../../../components/Predictions/AddPrediction/GridDefinition/GridDefinition';
import ForecastWindow from '../../../components/Predictions/AddPrediction/ForecastWindow/ForecastWindow';
import { useAddMarinePrediction } from '../../../hooks/predictions/useAddMarinePrediction';
import type { MarinePrediction, MarinePredictionRequest } from '../../../api/models';
import { getFieldErrors, hasFieldErrors, parseApiError } from '../../../utils/apiError';

const SERVER_FIELD_PATHS = [
  'domain',
  'forecast.start_time',
] as const satisfies readonly Path<MarinePredictionRequest>[];

const AddPredictionPage = () => {
  const navigate = useNavigate();
  const createPrediction = useAddMarinePrediction();
  const submissionLock = useRef(false);
  const [failedPrediction, setFailedPrediction] = useState<MarinePrediction | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<MarinePredictionRequest>({
    defaultValues: {
      domain: 'mombasa_offshore',
      forecast: { start_time: '' },
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const parsedError = createPrediction.isError ? parseApiError(createPrediction.error) : null;
  const fieldErrors = createPrediction.isError ? getFieldErrors(createPrediction.error) : {};
  const showFormBanner =
    createPrediction.isError &&
    parsedError &&
    (!hasFieldErrors(fieldErrors) || Boolean(fieldErrors.non_field_errors));
  const isGenerating = isSubmitting || createPrediction.isPending;

  const applyServerFieldErrors = (error: unknown) => {
    const fields = getFieldErrors(error);

    for (const path of SERVER_FIELD_PATHS) {
      const message = fields[path];
      if (message) {
        setError(path, { type: 'server', message });
      }
    }
  };

  const onSubmit: SubmitHandler<MarinePredictionRequest> = async (values) => {
    clearErrors();
    createPrediction.reset();
    setFailedPrediction(null);

    const startTime = new Date(values.forecast.start_time);
    if (Number.isNaN(startTime.getTime())) {
      setError('forecast.start_time', {
        type: 'validate',
        message: 'Enter a valid forecast start time.',
      });
      return;
    }

    try {
      const prediction = await createPrediction.mutateAsync({
        domain: values.domain,
        forecast: { start_time: startTime.toISOString() },
      });

      if (prediction.status === 'failed') {
        setFailedPrediction(prediction);
        return;
      }

      navigate(routes.predictionDetails(prediction.id));
    } catch (error) {
      applyServerFieldErrors(error);
    }
  };

  const runSubmit = (submit: () => Promise<unknown>) => {
    if (submissionLock.current) return;
    submissionLock.current = true;
    void submit().finally(() => {
      submissionLock.current = false;
    });
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runSubmit(handleSubmit(onSubmit));
  };

  const retrySubmit = () => {
    runSubmit(handleSubmit(onSubmit));
  };

  return (
    <div className="add-prediction-page">
      <TopBar
        breadcrumb={{ label: 'Marine Predictions', to: routes.predictions() }}
        current="New"
        showSearch={false}
      />

      <div className="add-prediction-page__content">
        <div className="add-prediction-page__container">
          <form
            className="add-prediction-page__form"
            onSubmit={handleFormSubmit}
            noValidate
            aria-busy={isGenerating}
          >
            {showFormBanner && parsedError && (
              <div className="add-prediction-page__error" role="alert">
                <p className="add-prediction-page__error-title">Failed to generate prediction</p>
                <p className="add-prediction-page__error-message">
                  {fieldErrors.non_field_errors ?? parsedError.message}
                </p>
                {(parsedError.status != null || parsedError.code) && (
                  <p className="add-prediction-page__error-meta">
                    {parsedError.status != null && <span>HTTP {parsedError.status}</span>}
                    {parsedError.status != null && parsedError.code ? ' · ' : null}
                    {parsedError.code && <span>{parsedError.code}</span>}
                  </p>
                )}
                <button type="button" onClick={retrySubmit} disabled={isGenerating}>
                  Retry
                </button>
              </div>
            )}

            {failedPrediction && (
              <div className="add-prediction-page__error" role="alert">
                <p className="add-prediction-page__error-title">Prediction failed</p>
                <p className="add-prediction-page__error-message">
                  {failedPrediction.error_message ||
                    'The backend did not provide an error message for this failed prediction.'}
                </p>
                <button type="button" onClick={retrySubmit} disabled={isGenerating}>
                  Retry
                </button>
              </div>
            )}

            <fieldset className="add-prediction-page__fieldset" disabled={isGenerating}>
              <GridDefinition register={register} errors={errors} />
              <ForecastWindow register={register} errors={errors} />

              {isGenerating && (
                <p className="add-prediction-page__loading" role="status">
                  Generating prediction. The AI model may take a moment…
                </p>
              )}

              <AddPredictionFooter
                disabled={isGenerating}
                isSubmitting={isGenerating}
                onCancel={() => navigate(-1)}
              />
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPredictionPage;
