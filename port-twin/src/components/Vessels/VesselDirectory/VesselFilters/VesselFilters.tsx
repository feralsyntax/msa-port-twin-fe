import './VesselFilters.scss';

export type VesselFilterStatus = 'all' | 'in-port' | 'approaching';

interface VesselFiltersProps {
  activeFilter: VesselFilterStatus;
  onFilterChange: (filter: VesselFilterStatus) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts?: {
    all: number;
    inPort: number;
    approaching: number;
  };
}

const VesselFilters = ({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts = {
    all: 0,
    inPort: 0,
    approaching: 0,
  },
}: VesselFiltersProps) => {
  const filters = [
    {
      label: 'All Vessels',
      value: 'all' as const,
      count: counts.all,
    },
    {
      label: 'In Port',
      value: 'in-port' as const,
      count: counts.inPort,
    },
    {
      label: 'Approaching',
      value: 'approaching' as const,
      count: counts.approaching,
    },
  ];

  return (
    <section className="vessel-filters">
      {/* Status Tabs */}
      <div className="vessel-filters__tabs" role="tablist" aria-label="Vessel status filters">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            role="tab"
            aria-selected={activeFilter === filter.value}
            className={`vessel-filters__tab ${
              activeFilter === filter.value ? 'vessel-filters__tab--active' : ''
            }`}
            onClick={() => onFilterChange(filter.value)}
          >
            <span>{filter.label}</span>

            <span className="vessel-filters__count">{filter.count}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="vessel-filters__actions">
        <div className="vessel-filters__search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <input
            type="text"
            placeholder="Search by name, MMSI, or IMO"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            aria-label="Search vessels"
          />
        </div>
      </div>
    </section>
  );
};

export default VesselFilters;
