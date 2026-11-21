import { useNavigate } from 'react-router-dom';
import TopBarBase from '../../../Common/TopBar/TopBar';

const PredictionsDirectoryTopBar = () => {
  const navigate = useNavigate();

  return (
    <TopBarBase
      title="Marine Predictions"
      showSearch={false}
      action={
        <button
          type="button"
          className="app-topbar__action"
          onClick={() => navigate('/app/predictions/new')}
        >
          <span className="material-symbols-outlined">add</span>
          <span>New Prediction</span>
        </button>
      }
    />
  );
};

export default PredictionsDirectoryTopBar;
