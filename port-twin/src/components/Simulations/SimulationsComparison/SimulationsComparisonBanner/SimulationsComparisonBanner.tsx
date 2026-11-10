import './SimulationsComparisonBanner.scss';

const SimulationsComparisonBanner = () => {
  return (
    <div className="simulations-comparison-banner" role="status">
      <div className="simulations-comparison-banner__message">
        <span aria-hidden="true">◇</span>
        <span>Simulated Scenario — Not Live Port Data</span>
      </div>
    </div>
  );
};

export default SimulationsComparisonBanner;
