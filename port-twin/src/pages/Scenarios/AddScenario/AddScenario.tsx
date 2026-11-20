import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ScenarioPageHeader from '../../../components/Scenarios/AddScenario/ScenarioPageHeader/ScenarioPageHeader';
import ScenarioIdentity from '../../../components/Scenarios/AddScenario/ScenarioIdentity/ScenarioIdentity';
import SimulationParameters from '../../../components/Scenarios/AddScenario/SimulationParameters/SimulationParameters';
import ScenarioActions from '../../../components/Scenarios/AddScenario/ScenarioActions/ScenarioActions';
import AddScenarioTopBar from '../../../components/Scenarios/AddScenario/AddScenarioTopBar/AddScenarioTopBar';

import useAddScenario from '../../../hooks/scenarios/useAddScenario';
import type { ScenarioCreateUpdateRequest } from '../../../api/models';
import { getFieldErrors, hasFieldErrors, parseApiError } from '../../../utils/apiError';

import './AddScenario.scss';

const SERVER_FIELDS = ['name', 'description', 'status'] as const satisfies ReadonlyArray<
  keyof ScenarioCreateUpdateRequest
>;

const PARAMETER_FIELDS = [
  'expected_vessel_arrivals',
  'arrival_interval_hours',
  'average_service_time_hours',
  'simulation_hours',
  'available_berths',
] as const;

const AddScenarioPage = () => {
  const navigate = useNavigate();
  const createScenario = useAddScenario();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
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

    // Nested parameter errors (DRF often returns { parameters: { field: ["msg"] } })
    const data =
      error &&
      typeof error === 'object' &&
      'response' in error &&
      (error as { response?: { data?: Record<string, unknown> } }).response?.data;

    const parameters =
      data &&
      typeof data === 'object' &&
      data.parameters &&
      typeof data.parameters === 'object' &&
      !Array.isArray(data.parameters)
        ? (data.parameters as Record<string, unknown>)
        : null;

    if (parameters) {
      for (const key of PARAMETER_FIELDS) {
        const value = parameters[key];
        const message =
          typeof value === 'string'
            ? value
            : Array.isArray(value) && typeof value[0] === 'string'
              ? value[0]
              : undefined;
        if (message) {
          setError(`parameters.${key}`, { type: 'server', message });
        }
      }
    }
  };

  const onSubmit: SubmitHandler<ScenarioCreateUpdateRequest> = (values) => {
    clearErrors();
    createScenario.reset();

    createScenario.mutate(values, {
      onSuccess: () => {
        reset();
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

  const handleCancel = () => {
    navigate('/app/scenarios');
  };

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

          {createScenario.isSuccess && (
            <p role="status" className="add-scenario-page__success">
              Scenario created successfully.
            </p>
          )}

          <ScenarioIdentity register={register} errors={errors} />
          <SimulationParameters register={register} errors={errors} />

          <ScenarioActions
            onSaveDraft={handleSaveDraft}
            onCancel={handleCancel}
            isSubmitting={createScenario.isPending}
          />
        </form>
      </div>
    </div>
  );
};

export default AddScenarioPage;
