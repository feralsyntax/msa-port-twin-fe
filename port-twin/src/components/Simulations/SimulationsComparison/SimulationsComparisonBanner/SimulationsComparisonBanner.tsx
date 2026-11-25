import './SimulationsComparisonBanner.scss';
import ProvenanceBadge from '../../../Common/ProvenanceBadge/ProvenanceBadge';

const SimulationsComparisonBanner = () => {
  return (
    <div className="simulations-comparison-banner" role="status">
      <div className="simulations-comparison-banner__message">
        <ProvenanceBadge value="simulation" context="simulation" />
        <span>Comparison results are not live port data.</span>
      </div>
    </div>
  );
};

export default SimulationsComparisonBanner;
