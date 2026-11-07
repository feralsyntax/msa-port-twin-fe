import './ScenarioActions.scss';

interface ScenarioActionsProps {
  onSaveDraft: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const ScenarioActions = ({ onSaveDraft, onCancel, isSubmitting }: ScenarioActionsProps) => {
  return (
    <div className="scenario-actions">
      <button
        className="scenario-actions__cancel"
        type="button"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Cancel
      </button>

      <div className="scenario-actions__buttons">
        <button
          className="scenario-actions__draft"
          type="button"
          onClick={onSaveDraft}
          disabled={isSubmitting}
        >
          Save as Draft
        </button>

        <button className="scenario-actions__submit" type="submit" disabled={isSubmitting}>
          <span className="material-symbols-outlined">
            {isSubmitting ? 'progress_activity' : 'save'}
          </span>

          <span>{isSubmitting ? 'Saving...' : 'Save Scenario'}</span>
        </button>
      </div>
    </div>
  );
};

export default ScenarioActions;
