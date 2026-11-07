import './AddScenarioTopBar.scss';

const AddScenarioTopBar = () => {
  return (
    <header className="add-scenario-top-bar">
      <div className="add-scenario-top-bar__breadcrumb-container">
        <nav aria-label="Breadcrumb" className="add-scenario-top-bar__breadcrumb">
          <a href="#" className="add-scenario-top-bar__parent">
            Scenarios
          </a>

          <span className="add-scenario-top-bar__separator">/</span>

          <span className="add-scenario-top-bar__current">New</span>
        </nav>
      </div>

      <div className="add-scenario-top-bar__actions"></div>
    </header>
  );
};

export default AddScenarioTopBar;
