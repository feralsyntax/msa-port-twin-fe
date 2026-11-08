import { Link } from 'react-router-dom';
import './SimulationsDirectoryTopBar.scss';

const SimulationsDirectoryTopBar = () => {
  return (
    <header className="simulations-directory-top-bar">
      <h1 className="simulations-directory-top-bar__title">Simulations</h1>

      <Link to="/app/simulations/new" className="simulations-directory-top-bar__action">
        <span className="material-symbols-outlined">add</span>
        <span>New Simulation</span>
      </Link>
    </header>
  );
};

export default SimulationsDirectoryTopBar;
