import './ScenarioFilters.scss';

export type ScenarioStatusFilter = 'all' | 'ready' | 'draft';

interface ScenarioFiltersProps {
  activeFilter: ScenarioStatusFilter;
  onFilterChange: (filter: ScenarioStatusFilter) => void;
}

const FILTERS: { label: string; value: ScenarioStatusFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Ready', value: 'ready' },
  { label: 'Draft', value: 'draft' },
];

const ScenarioFilters = ({ activeFilter, onFilterChange }: ScenarioFiltersProps) => {
  return (
    <div className="scenario-filters">
      <div
        className="scenario-filters__tabs"
        role="tablist"
        aria-label="Filter scenarios by status"
      >
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter.value;

          return (
            <button
              key={filter.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`scenario-filters__tab ${isActive ? 'scenario-filters__tab--active' : ''}`}
              onClick={() => onFilterChange(filter.value)}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ScenarioFilters;
