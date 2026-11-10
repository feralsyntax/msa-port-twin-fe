import { Link } from 'react-router-dom';
import './AddPredictionTopBar.scss';

const AddPredictionTopBar = () => {
  return (
    <header className="add-prediction-top-bar">
      <nav aria-label="Breadcrumb">
        <Link to="/app/predictions">Marine Predictions</Link>

        <span>/</span>

        <span className="add-prediction-top-bar__current">New</span>
      </nav>
    </header>
  );
};

export default AddPredictionTopBar;
