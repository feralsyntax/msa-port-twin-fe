import ScenarioPageHeader from '../../../components/Scenarios/AddScenario/ScenarioPageHeader/ScenarioPageHeader';
import ScenarioIdentity from '../../../components/Scenarios/AddScenario/ScenarioIdentity/ScenarioIdentity';
import SimulationParameters from '../../../components/Scenarios/AddScenario/SimulationParameters/SimulationParameters';
import ScenarioActions from '../../../components/Scenarios/AddScenario/ScenarioActions/ScenarioActions';

import './AddScenario.scss';
import AddScenarioTopBar from '../../../components/Scenarios/AddScenario/AddScenarioTopBar/AddScenarioTopBar';

export const AddScenarioPage = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="add-scenario-page">
      <div className="add-scenario-page__content">
        <AddScenarioTopBar />

        <ScenarioPageHeader />

        <form className="add-scenario-page__form" onSubmit={handleSubmit}>
          <ScenarioIdentity />

          <SimulationParameters />

          <ScenarioActions />
        </form>
      </div>
    </div>
  );
};

export default AddScenarioPage;
