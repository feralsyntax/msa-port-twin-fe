import { useNavigate } from 'react-router-dom';
import './PredictionDetailsHeader.scss';

interface PredictionDetailsHeaderProps {
  predictionId: string;
}

const PredictionDetailsHeader = ({ predictionId }: PredictionDetailsHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="prediction-details-header">
      <button
        className="prediction-details-header__breadcrumb"
        type="button"
        onClick={() => navigate('/app/predictions')}
      >
        <span>Predictions</span>
        <span className="prediction-details-header__separator">/</span>
        <span className="prediction-details-header__current">{predictionId}</span>
      </button>
    </header>
  );
};

export default PredictionDetailsHeader;
