import { Link } from 'react-router-dom';
import './SimulationDetailsTopBar.scss';

interface SimulationDetailsTopBarProps {
  simulationId: string;
}

const SimulationDetailsTopBar = ({ simulationId }: SimulationDetailsTopBarProps) => {
  return (
    <header className="sim-details-topbar">
      <div className="sim-details-topbar__left">
        <div className="sim-details-topbar__crumbs">
          <Link to="/app/simulations" className="sim-details-topbar__parent">
            Simulations
          </Link>
          <span className="sim-details-topbar__sep">/</span>
          <span className="sim-details-topbar__current">{simulationId}</span>
        </div>
        <span className="sim-details-topbar__live-pip" aria-hidden="true" />
      </div>

      <button type="button" className="sim-details-topbar__compare">
        <span className="material-symbols-outlined">compare_arrows</span>
        <span>Compare Runs</span>
      </button>
    </header>
  );
};

export default SimulationDetailsTopBar;
