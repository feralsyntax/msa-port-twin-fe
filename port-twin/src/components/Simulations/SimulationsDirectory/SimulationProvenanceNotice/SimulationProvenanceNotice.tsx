import './SimulationProvenanceNotice.scss';

const SimulationProvenanceNotice = () => {
  return (
    <aside className="simulation-provenance-notice" aria-label="Simulation Data Provenance">
      <div className="simulation-provenance-notice__content">
        <span className="simulation-provenance-notice__label">Provenance Notice</span>

        <p className="simulation-provenance-notice__message">
          Simulated scenario — not live port data.
        </p>
      </div>
    </aside>
  );
};

export default SimulationProvenanceNotice;
