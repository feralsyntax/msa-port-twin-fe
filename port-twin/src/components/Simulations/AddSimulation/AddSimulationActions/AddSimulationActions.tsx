import './AddSimulationActions.scss';

interface AddSimulationActionsProps {
  onRun: () => void;
  disabled?: boolean;
  queued: boolean;
}

const AddSimulationActions = ({ onRun, disabled = false, queued }: AddSimulationActionsProps) => {
  return (
    <section className="add-simulation-actions">
      <div className="add-simulation-actions__divider" />

      <div className="add-simulation-actions__buttons">
        <a href="/simulations" className="add-simulation-actions__cancel">
          Cancel
        </a>

        <button
          type="button"
          className={`add-simulation-actions__run ${queued ? 'add-simulation-actions__run--queued' : ''}`}
          onClick={onRun}
          disabled={disabled}
        >
          <span className="material-symbols-outlined">{queued ? 'check' : 'play_arrow'}</span>

          <span>{queued ? 'Run Queued (Demo)' : 'Queue Simulation'}</span>
        </button>
      </div>

      {queued && (
        <div className="add-simulation-actions__toast" role="status">
          <div className="add-simulation-actions__toast-content">
            <span className="add-simulation-actions__toast-indicator" />

            <div>
              <p>DEMO RUN ENQUEUED</p>
              <span>Simulated confirmation — no server request was made.</span>
            </div>
          </div>

          <span className="add-simulation-actions__toast-status">DEMO ONLY</span>
        </div>
      )}
    </section>
  );
};

export default AddSimulationActions;
