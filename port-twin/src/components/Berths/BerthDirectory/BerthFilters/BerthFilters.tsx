import './BerthFilters.scss';

export type BerthFilterStatus = 'all' | 'occupied' | 'available'

interface BerthFiltersProps {
  activeFilter: BerthFilterStatus
  onFilterChange: (filter: BerthFilterStatus) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  counts?: {
    all: number
    occupied: number
    available: number
  }
}

const BerthFilters = ({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts = {
    all: 0,
    occupied: 0,
    available: 0,
  },
}: BerthFiltersProps) => {
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
  ]

  return (
    <section className="berth-filters">
      <div
        className="berth-filters__tabs"
        role="tablist"
        aria-label="Berth status filters"
      >
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

      <div className="berth-filters__actions">
        <div className="berth-filters__search">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <input
            type="text"
            placeholder="Search by berth, vessel, or terminal"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            aria-label="Search berths"
          />
        </div>
      </div>
    </section>
  )
}

export default BerthFilters