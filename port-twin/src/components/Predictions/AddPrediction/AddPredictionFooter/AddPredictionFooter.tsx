import './AddPredictionFooter.scss';

interface AddPredictionFooterProps {
  disabled?: boolean;
  isSubmitting?: boolean;
  onCancel: () => void;
}

const AddPredictionFooter = ({
  disabled = false,
  isSubmitting = false,
  onCancel,
}: AddPredictionFooterProps) => {
  return (
    <footer className="add-prediction-footer">
      <button
        type="button"
        className="add-prediction-footer__cancel"
        onClick={onCancel}
        disabled={disabled}
      >
        <span className="material-symbols-outlined">arrow_back</span>
        <span>Cancel</span>
      </button>

      <button type="submit" className="add-prediction-footer__submit" disabled={disabled}>
        <span className="material-symbols-outlined">
          {isSubmitting ? 'hourglass_top' : 'play_arrow'}
        </span>
        <span>{isSubmitting ? 'Generating Prediction…' : 'Generate Prediction'}</span>
      </button>
    </footer>
  );
};

export default AddPredictionFooter;
