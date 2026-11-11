import type { PredictionFilter } from '../types/predictions-directory.types';
import './PredictionsDirectoryStatusTabs.scss';

interface PredictionsDirectoryStatusTabsProps {
  activeFilter: PredictionFilter;
  counts: {
    all: number;
    completed: number;
    failed: number;
  };
  onFilterChange: (filter: PredictionFilter) => void;
  onReset: () => void;
}

const PredictionsDirectoryStatusTabs = ({
  activeFilter,
  counts,
  onFilterChange,
  onReset,
}: PredictionsDirectoryStatusTabsProps) => {
  const tabs: {
    label: string;
    value: PredictionFilter;
    count: number;
  }[] = [
    { label: 'All Runs', value: 'all', count: counts.all },
    { label: 'Completed', value: 'completed', count: counts.completed },
    { label: 'Failed', value: 'failed', count: counts.failed },
  ];

  return (
    <section className="predictions-directory-status-tabs">
      <div className="predictions-directory-status-tabs__tabs">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`predictions-directory-status-tabs__tab ${
              activeFilter === tab.value ? 'is-active' : ''
            }`}
            type="button"
            aria-pressed={activeFilter === tab.value}
            onClick={() => onFilterChange(tab.value)}
          >
            <span>{tab.label}</span>
            <span
              className={`predictions-directory-status-tabs__count predictions-directory-status-tabs__count--${tab.value}`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <button
        className="predictions-directory-status-tabs__reset"
        type="button"
        title="Reset status filter"
        aria-label="Reset status filter"
        onClick={onReset}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          refresh
        </span>
      </button>
    </section>
  );
};

export default PredictionsDirectoryStatusTabs;
