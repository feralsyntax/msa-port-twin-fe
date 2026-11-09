import type { SimulationStatusCount, SimulationFilter } from '../types/simulations.types';
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
    <div className="simulation-status-tabs" role="tablist" aria-label="Simulation status">
      {tabs.map((tab) => (
        <button
          key={tab.status}
          type="button"
          role="tab"
          aria-selected={activeFilter === tab.status}
          className={`simulation-status-tabs__tab ${
            activeFilter === tab.status ? 'simulation-status-tabs__tab--active' : ''
          }`}
          onClick={() => onFilterChange(tab.status)}
        >
          <span>{tab.label}</span>
          <span className="simulation-status-tabs__count">{tab.count}</span>
        </button>
      ))}
    </div>
  );
};

export default SimulationStatusTabs;
