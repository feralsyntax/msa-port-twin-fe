import "./AddBerthActions.scss";

interface AddBerthActionsProps {
  isSubmitting?: boolean;
  onCancel: () => void;
}

const AddBerthActions = ({
  isSubmitting = false,
  onCancel,
}: AddBerthActionsProps) => {
  return (
    <footer className='add-berth-actions'>
      <button
        type='button'
        className='add-berth-actions__cancel'
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Cancel
      </button>

      <button
        type='submit'
        className='add-berth-actions__submit'
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        <span className='material-symbols-outlined'>
          {isSubmitting ? "progress_activity" : "save"}
        </span>
        <span>{isSubmitting ? "Saving..." : "Save Berth"}</span>
      </button>
    </footer>
  );
};

export default AddBerthActions;
