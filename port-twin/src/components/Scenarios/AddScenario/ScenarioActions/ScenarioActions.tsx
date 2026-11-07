import './ScenarioActions.scss';

const ScenarioActions = () => {
  return (
    <div className="scenario-actions">
      <button className="scenario-actions__cancel" type="button">
        Cancel
      </button>

      <div className="scenario-actions__buttons">
        <button className="scenario-actions__draft" type="button">
          Save as Draft
        </button>

        <button className="scenario-actions__submit" type="submit">
          <span className="material-symbols-outlined">save</span>
          <span>Save Scenario</span>
        </button>
      </div>
    </div>
  );
};

export default ScenarioActions;
