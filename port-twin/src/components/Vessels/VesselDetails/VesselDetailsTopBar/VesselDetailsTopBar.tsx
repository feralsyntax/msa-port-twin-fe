import "./VesselDetailsTopBar.scss";

interface VesselDetailsTopBarProps {
  vesselName: string;
  sector: string;
  onViewMap: () => void;
}

const VesselDetailsTopBar = ({
  vesselName,
  sector,
  onViewMap,
}: VesselDetailsTopBarProps) => {
  return (
    <header className='vessel-details-topbar'>
      <div className='vessel-details-topbar__breadcrumb'>
        <a href='/vessels'>Vessels</a>

        <span className='vessel-details-topbar__separator'>/</span>

        <span className='vessel-details-topbar__vessel-name'>{vesselName}</span>

        <div className='vessel-details-topbar__sector'>
          <span className='vessel-details-topbar__sector-label'>SECTOR</span>
          <span className='vessel-details-topbar__sector-value'>{sector}</span>
        </div>
      </div>

      <button
        type='button'
        className='vessel-details-topbar__map-button'
        onClick={onViewMap}
      >
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          aria-hidden='true'
        >
          <polygon points='1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6' />
          <line x1='8' y1='2' x2='8' y2='18' />
          <line x1='16' y1='6' x2='16' y2='22' />
        </svg>

        <span>View on Map</span>
      </button>
    </header>
  );
};

export default VesselDetailsTopBar;
