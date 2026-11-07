import './ScenarioPageHeader.scss';

const ScenarioPageHeader = () => {
  return (
    <section className="scenario-page-header">
      <div className="scenario-page-header__content">
        <h1>Create Operational Scenario</h1>

        <p>
          Configure vessel arrival schedules, queue parameters, and berth availability constraints
          for baseline or contingency simulations.
        </p>
      </div>
    </section>
  );
};

export default ScenarioPageHeader;
