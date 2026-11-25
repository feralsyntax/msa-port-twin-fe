import './SimulatedDataBanner.scss';
import ProvenanceBadge from '../../../Common/ProvenanceBadge/ProvenanceBadge';

interface SimulatedDataBannerProps {
  value: unknown;
}

const SimulatedDataBanner = ({ value }: SimulatedDataBannerProps) => {
  return (
    <div className="sim-data-banner" role="status">
      <div className="sim-data-banner__accent" />
      <div className="sim-data-banner__body">
        <span className="material-symbols-outlined sim-data-banner__icon">warning</span>
        <span className="sim-data-banner__text">Simulation results are not live port data.</span>
        <span className="sim-data-banner__pipe" aria-hidden="true">
          |
        </span>
      </div>
      <ProvenanceBadge value={value} context="simulation" />
    </div>
  );
};

export default SimulatedDataBanner;
