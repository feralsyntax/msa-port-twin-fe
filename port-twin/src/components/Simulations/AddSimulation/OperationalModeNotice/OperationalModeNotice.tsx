import './OperationalModeNotice.scss';

const OperationalModeNotice = () => {
  return (
    <section className="operational-mode-notice" aria-label="Operational Mode Notice">
      <div className="operational-mode-notice__message">
        <span className="operational-mode-notice__symbol">◇</span>

        <p>Simulated Scenario Configuration — Not Live Port Data</p>
      </div>

      <div className="operational-mode-notice__metadata">
        <span className="operational-mode-notice__solver">Solver: DES-SIMPY-v3</span>

        <span className="operational-mode-notice__indicator" />
      </div>
    </section>
  );
};

export default OperationalModeNotice;
