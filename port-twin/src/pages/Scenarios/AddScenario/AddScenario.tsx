import { useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler, type Path } from 'react-hook-form';

import './AddScenario.scss';
import AddScenarioTopBar from '../../../components/Scenarios/AddScenario/AddScenarioTopBar/AddScenarioTopBar';
import ScenarioPageHeader from '../../../components/Scenarios/AddScenario/ScenarioPageHeader/ScenarioPageHeader';
import ScenarioIdentity from '../../../components/Scenarios/AddScenario/ScenarioIdentity/ScenarioIdentity';
import SimulationParameters from '../../../components/Scenarios/AddScenario/SimulationParameters/SimulationParameters';
import ScenarioActions from '../../../components/Scenarios/AddScenario/ScenarioActions/ScenarioActions';
import { useAddScenario } from '../../../hooks/scenarios/useAddScenario';
import type { ScenarioCreateUpdateRequest } from '../../../api/models';
import { getFieldErrors, hasFieldErrors, parseApiError } from '../../../utils/apiError';

// (merge with existing react-hook-form import at lines 1–2)

const SERVER_FIELD_PATHS = [
  'parameters.expected_vessel_arrivals',
  'parameters.arrival_interval_hours',
  'parameters.average_service_time_hours',
  'parameters.simulation_hours',
  'parameters.available_berths',
  'name',
  'description',
  'status',
] as const satisfies ReadonlyArray<Path<ScenarioCreateUpdateRequest>>;

const AddScenarioPage = () => {
  const navigate = useNavigate();
  const createScenario = useAddScenario();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ScenarioCreateUpdateRequest>({
    defaultValues: {
      name: '',
      description: '',
      status: 'draft',
      parameters: {
        expected_vessel_arrivals: 14,
        arrival_interval_hours: 3.5,
        average_service_time_hours: 8,
        simulation_hours: 48,
        available_berths: 2,
      },
    },
  });

  const parsedError = createScenario.isError ? parseApiError(createScenario.error) : null;
  const fieldErrors = createScenario.isError ? getFieldErrors(createScenario.error) : {};
  const showFormBanner =
    createScenario.isError &&
    parsedError &&
    (!hasFieldErrors(fieldErrors) || Boolean(fieldErrors.non_field_errors));

  const applyServerFieldErrors = (error: unknown) => {
    const fields = getFieldErrors(error);
    for (const name of SERVER_FIELDS) {
      const message = fields[name];
      if (message) {
        setError(name, { type: 'server', message });
      }
    }
  };

  const onSubmit: SubmitHandler<ScenarioCreateUpdateRequest> = (values) => {
    clearErrors();
    createScenario.reset();

    createScenario.mutate(values, {
      onSuccess: () => {
        navigate('/app/scenarios');
      },
      onError: (error) => {
        applyServerFieldErrors(error);
      },
    });
  };

  const handleSaveDraft = handleSubmit((values) => {
    onSubmit({
      ...values,
      status: 'draft',
    });
  });

  return (
    <div className="add-scenario-page">
      <AddScenarioTopBar />

      <div className="add-scenario-page__content">
        <ScenarioPageHeader />

        <form className="add-scenario-page__form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {showFormBanner && (
            <div className="add-scenario-page__error" role="alert">
              <p className="add-scenario-page__error-title">Failed to create scenario</p>
              <p className="add-scenario-page__error-message">
                {fieldErrors.non_field_errors ?? parsedError.message}
              </p>
              {(parsedError.status != null || parsedError.code) && (
                <p className="add-scenario-page__error-meta">
                  {parsedError.status != null && <span>HTTP {parsedError.status}</span>}
                  {parsedError.status != null && parsedError.code ? ' · ' : null}
                  {parsedError.code && <span>{parsedError.code}</span>}
                </p>
              )}
            </div>
          )}

          <ScenarioIdentity register={register} errors={errors} />
          <SimulationParameters register={register} errors={errors} />

          <ScenarioActions
            onSaveDraft={handleSaveDraft}
            onCancel={() => navigate('/app/scenarios')}
            isSubmitting={isSubmitting || createScenario.isPending}
          />
        </form>
      </div>
    </div>
  );
};

export default AddScenarioPage;
