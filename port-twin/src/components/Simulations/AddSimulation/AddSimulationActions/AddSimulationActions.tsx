import './AddSimulationActions.scss';

type SimulationActionStatus = 'idle' | 'pending' | 'success' | 'error';

interface AddSimulationActionsProps {
  onRun: () => void;
  disabled?: boolean;
  status: SimulationActionStatus;
  responseStatus?: string;
  errorMessage?: string;
}

const AddSimulationActions = ({
  onRun,
  disabled = false,
  status,
  responseStatus,
  errorMessage,
}: AddSimulationActionsProps) => {
  const isPending = status === 'pending';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  const buttonLabel = isPending
    ? 'Queueing Simulation...'
    : isSuccess
      ? 'Simulation Queued'
      : 'Queue Simulation';

  return (
    <section className="add-simulation-actions">
      <div className="add-simulation-actions__divider" />

      <div className="add-simulation-actions__buttons">
        <a href="/simulations" className="add-simulation-actions__cancel">
          Cancel
        </a>

        <button
          type="button"
          className={`add-simulation-actions__run ${
            isSuccess ? 'add-simulation-actions__run--queued' : ''
          }`}
          onClick={onRun}
          disabled={disabled || isPending}
        >
          <span className="material-symbols-outlined">
            {isPending ? 'progress_activity' : isSuccess ? 'check' : 'play_arrow'}
          </span>

          <span>{buttonLabel}</span>
        </button>
      </div>

      {isSuccess && (
        <div className="add-simulation-actions__toast" role="status">
          <div className="add-simulation-actions__toast-content">
            <span className="add-simulation-actions__toast-indicator" />

            <div>
              <p>SIMULATION ACCEPTED</p>
              <span>
                The backend accepted the request. Current status: {responseStatus ?? 'pending'}.
              </span>
            </div>
          </div>

          <span className="add-simulation-actions__toast-status">
            {responseStatus?.toUpperCase() ?? 'ACCEPTED'}
          </span>
        </div>
      )}

      {isError && (
        <div className="add-simulation-actions__toast" role="alert">
          <div className="add-simulation-actions__toast-content">
            <span className="add-simulation-actions__toast-indicator" />

            <div>
              <p>SIMULATION REQUEST FAILED</p>
              <span>{errorMessage}</span>
            </div>
          </div>

          <span className="add-simulation-actions__toast-status">ERROR</span>
        </div>
      )}
    </section>
  );
};

export default AddSimulationActions;
