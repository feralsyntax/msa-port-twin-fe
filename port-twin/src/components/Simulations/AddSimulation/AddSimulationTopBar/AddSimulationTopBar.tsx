import './AddSimulationTopBar.scss';

interface AddSimulationTopBarProps {
  onRun: () => void;
  disabled?: boolean;
}

const AddSimulationTopBar = ({ onRun, disabled = false }: AddSimulationTopBarProps) => {
  return (
    <header className="add-simulation-top-bar">
      <nav className="add-simulation-top-bar__breadcrumb" aria-label="Breadcrumb">
        <a href="/simulations">Simulations</a>
        <span>/</span>
        <span className="add-simulation-top-bar__current">New</span>
      </nav>

      <button
        type="button"
        className="add-simulation-top-bar__run-button"
        onClick={onRun}
        disabled={disabled}
      >
        <span className="material-symbols-outlined">play_arrow</span>
        <span>Run Simulation</span>
      </button>
    </header>
  );
};

export default AddSimulationTopBar;
