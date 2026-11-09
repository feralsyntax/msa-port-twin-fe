import './SimulatedDataBanner.scss';

const SimulatedDataBanner = () => {
  return (
    <div className="sim-data-banner" role="status">
      <div className="sim-data-banner__accent" />
      <div className="sim-data-banner__body">
        <span className="material-symbols-outlined sim-data-banner__icon">warning</span>
        <span className="sim-data-banner__text">Simulated scenario — not live port data.</span>
        <span className="sim-data-banner__pipe" aria-hidden="true">
          |
        </span>
      </div>
      <span className="sim-data-banner__tag">◇ SYNTHETIC</span>
    </div>
  );
};

export default SimulatedDataBanner;
