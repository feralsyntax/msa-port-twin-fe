import "./AddVesselActions.scss";

interface AddVesselActionsProps {
  isSubmitting?: boolean;
  onCancel: () => void;
}

const AddVesselActions = ({
  isSubmitting = false,
  onCancel,
}: AddVesselActionsProps) => {
  return (
    <footer className='add-vessel-actions'>
      <button
        type='button'
        className='add-vessel-actions__cancel'
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Cancel
      </button>

      <button
        type='submit'
        className='add-vessel-actions__submit'
        disabled={isSubmitting}
      >
        <span className='material-symbols-outlined'>
          {isSubmitting ? "progress_activity" : "check"}
        </span>

        <span>{isSubmitting ? "Saving..." : "Save Vessel"}</span>
      </button>
    </footer>
  );
};

export default AddVesselActions;
