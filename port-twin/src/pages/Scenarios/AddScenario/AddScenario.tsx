import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ScenarioPageHeader from '../../../components/Scenarios/AddScenario/ScenarioPageHeader/ScenarioPageHeader';
import ScenarioIdentity from '../../../components/Scenarios/AddScenario/ScenarioIdentity/ScenarioIdentity';
import SimulationParameters from '../../../components/Scenarios/AddScenario/SimulationParameters/SimulationParameters';
import ScenarioActions from '../../../components/Scenarios/AddScenario/ScenarioActions/ScenarioActions';
import AddScenarioTopBar from '../../../components/Scenarios/AddScenario/AddScenarioTopBar/AddScenarioTopBar';

import './AddScenario.scss';
import useAddScenario from '../../../hooks/scenarios/useAddScenario';
import type { ScenarioCreateUpdateRequest } from '../../../api/models';

const AddScenarioPage = () => {
  const navigate = useNavigate();
  const createScenario = useAddScenario();

  const {
    register,
    handleSubmit,
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

  const onSubmit: SubmitHandler<ScenarioCreateUpdateRequest> = async (values) => {
    try {
      await createScenario.mutateAsync(values);
      navigate('/scenarios');
    } catch (error) {
      console.error('Failed to create scenario:', error);
    }
  };

  const handleSaveDraft = handleSubmit(async (values) => {
    await onSubmit({
      ...values,
      status: 'draft',
    });
  });

  const getErrorMessage = (): string => {
    const error = createScenario.error;

    if (
      error &&
      typeof error === 'object' &&
      'response' in error &&
      error.response &&
      typeof error.response === 'object' &&
      'data' in error.response
    ) {
      const data = error.response.data;

      if (data && typeof data === 'object' && 'detail' in data) {
        if (typeof data.detail === 'string') {
          return data.detail;
        }
      }
    }

    return 'Unable to create scenario. Please check your details and try again.';
  };

  return (
    <div className="add-scenario-page">
      <AddScenarioTopBar />

      <div className="add-scenario-page__content">
        <ScenarioPageHeader />

        <form className="add-scenario-page__form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {createScenario.isError && (
            <div className="add-scenario-page__error" role="alert">
              {getErrorMessage()}
            </div>
          )}

          <ScenarioIdentity register={register} errors={errors} />

          <SimulationParameters register={register} errors={errors} />

          <ScenarioActions
            onSaveDraft={handleSaveDraft}
            onCancel={() => navigate('/scenarios')}
            isSubmitting={isSubmitting || createScenario.isPending}
          />
        </form>
      </div>
    </div>
  );
};

export default AddScenarioPage;
