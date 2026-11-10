import './AddPredictionFooter.scss';

interface AddPredictionFooterProps {
  disabled?: boolean;
  onCancel: () => void;
}

const AddPredictionFooter = ({ disabled = false, onCancel }: AddPredictionFooterProps) => {
  return (
    <footer className="add-prediction-footer">
      <button type="button" className="add-prediction-footer__cancel" onClick={onCancel}>
        <span className="material-symbols-outlined">arrow_back</span>
        <span>Cancel</span>
      </button>

      <button type="submit" className="add-prediction-footer__submit" disabled={disabled}>
        <span className="material-symbols-outlined">play_arrow</span>
        <span>Generate Prediction</span>
      </button>
    </footer>
  );
};

export default AddPredictionFooter;
