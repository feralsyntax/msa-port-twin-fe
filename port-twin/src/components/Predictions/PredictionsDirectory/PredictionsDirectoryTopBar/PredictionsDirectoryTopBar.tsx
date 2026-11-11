import { useNavigate } from 'react-router-dom';
import './PredictionsDirectoryTopBar.scss';

const PredictionsDirectoryTopBar = () => {
  const navigate = useNavigate();

  return (
    <header className="predictions-directory-top-bar">
      <div className="predictions-directory-top-bar__heading">
        <h1>Marine Predictions</h1>
        <span className="predictions-directory-top-bar__demo-label">DEMO DATA</span>
      </div>

      <button
        className="predictions-directory-top-bar__new-button"
        type="button"
        onClick={() => navigate('/app/predictions/new')}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          add
        </span>
        <span>New Prediction</span>
      </button>
    </header>
  );
};

export default PredictionsDirectoryTopBar;
