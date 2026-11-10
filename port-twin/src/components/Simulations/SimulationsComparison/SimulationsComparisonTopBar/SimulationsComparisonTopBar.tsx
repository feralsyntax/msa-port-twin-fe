import { Link } from 'react-router-dom';
import './SimulationsComparisonTopBar.scss';

const SimulationsComparisonTopBar = () => {
  return (
    <header className="simulations-comparison-top-bar">
      <nav className="simulations-comparison-top-bar__breadcrumb" aria-label="Breadcrumb">
        <Link to="/simulations">Simulations</Link>
        <span>/</span>
        <span aria-current="page">Compare</span>
      </nav>
    </header>
  );
};

export default SimulationsComparisonTopBar;
