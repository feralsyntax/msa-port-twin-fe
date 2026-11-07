import './AddScenarioTopBar.scss';

const AddScenarioTopBar = () => {
  return (
    <nav className="scenario-top-bar" aria-label="Breadcrumb">
      <span className="scenario-top-bar__parent">Scenarios</span>

      <span className="material-symbols-outlined" aria-hidden="true">
        chevron_right
      </span>

      <span className="scenario-top-bar__current" aria-current="page">
        New
      </span>
    </nav>
  );
};

export default AddScenarioTopBar;
