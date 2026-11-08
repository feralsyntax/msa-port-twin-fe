import { Link } from 'react-router-dom';
import './AddSimulationTopBar.scss';

const AddSimulationTopBar = () => {
  return (
    <header className="add-simulation-top-bar">
      <nav className="add-simulation-top-bar__breadcrumb" aria-label="Breadcrumb">
        <Link to="/app/simulations">Simulations</Link>
        <span>/</span>
        <span className="add-simulation-top-bar__current">New</span>
      </nav>
    </header>
  );
};

export default AddSimulationTopBar;
