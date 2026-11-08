import type { SimulationFilter, SimulationStatusCount } from '../types/simulations.types';

import './SimulationStatusTabs.scss';

interface SimulationStatusTabsProps {
  tabs: SimulationStatusCount[];
  activeFilter: SimulationFilter;
  onFilterChange: (filter: SimulationFilter) => void;
}

const SimulationStatusTabs = ({
  tabs,
  activeFilter,
  onFilterChange,
}: SimulationStatusTabsProps) => {
  return (
    <section className="simulation-status-tabs">
      <div
        className="simulation-status-tabs__list"
        role="tablist"
        aria-label="Filter simulations by status"
      >
        {tabs.map((tab) => {
          const isActive = activeFilter === tab.status;

          return (
            <button
              key={tab.status}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`simulation-status-tabs__tab ${
                isActive ? 'simulation-status-tabs__tab--active' : ''
              }`}
              onClick={() => onFilterChange(tab.status)}
            >
              <span className="simulation-status-tabs__label">{tab.label}</span>

              <span className="simulation-status-tabs__count">{tab.count}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default SimulationStatusTabs;
