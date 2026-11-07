import './BerthFilters.scss';

export type BerthFilterStatus = 'all' | 'occupied' | 'available';

interface BerthFiltersProps {
  activeFilter: BerthFilterStatus;
  onFilterChange: (filter: BerthFilterStatus) => void;
  counts: {
    all: number;
    occupied: number;
    available: number;
  };
}

const BerthFilters = ({ activeFilter, onFilterChange, counts }: BerthFiltersProps) => {
  const filters = [
    {
      label: 'All Berths',
      value: 'all' as const,
      count: counts.all,
    },
    {
      label: 'Occupied',
      value: 'occupied' as const,
      count: counts.occupied,
    },
    {
      label: 'Available',
      value: 'available' as const,
      count: counts.available,
    },
  ];

  return (
    <section className="berth-filters">
      <div className="berth-filters__tabs" role="tablist" aria-label="Berth status filters">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            role="tab"
            aria-selected={activeFilter === filter.value}
            className={`berth-filters__tab${
              activeFilter === filter.value ? ' berth-filters__tab--active' : ''
            }`}
            onClick={() => onFilterChange(filter.value)}
          >
            <span>{filter.label}</span>
            <span className="berth-filters__count">{filter.count}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default BerthFilters;
