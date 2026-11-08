import { Link } from 'react-router-dom';

import './ScenarioDetailsTopBar.scss';

interface ScenarioDetailsTopBarProps {
  scenarioName: string;
  onRunSimulation: () => void;
  isRunning: boolean;
}

const ScenarioDetailsTopBar = ({
  scenarioName,
  onRunSimulation,
  isRunning,
}: ScenarioDetailsTopBarProps) => {
  return (
    <header className="scenario-details-topbar">
      <nav className="scenario-details-topbar__breadcrumb" aria-label="Breadcrumb">
        <Link to="/app/scenarios">Scenarios</Link>
        <span aria-hidden="true">/</span>
        <span className="scenario-details-topbar__current">{scenarioName}</span>
      </nav>

      <button
        type="button"
        className="scenario-details-topbar__run-button"
        onClick={onRunSimulation}
        disabled={isRunning}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5.5v13l10-6.5-10-6.5z" />
        </svg>
        <span>{isRunning ? 'Queuing...' : 'Run Simulation'}</span>
      </button>
    </header>
  );
};

export default ScenarioDetailsTopBar;
