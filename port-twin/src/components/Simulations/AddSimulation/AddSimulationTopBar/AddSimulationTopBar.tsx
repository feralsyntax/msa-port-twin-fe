import './AddSimulationTopBar.scss';

const AddSimulationTopBar = () => {
  return (
    <header className="add-simulation-top-bar">
      <nav className="add-simulation-top-bar__breadcrumb" aria-label="Breadcrumb">
        <a href="/simulations">Simulations</a>
        <span>/</span>
        <span className="add-simulation-top-bar__current">New</span>
      </nav>
    </header>
  );
};

export default AddSimulationTopBar;
