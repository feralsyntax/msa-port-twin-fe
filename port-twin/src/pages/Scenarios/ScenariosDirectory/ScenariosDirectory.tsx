import { useMemo, useState } from 'react';

import ScenarioFilters, {
  type ScenarioStatusFilter,
} from '../../../components/Scenarios/ScenariosDirectory/ScenarioFilters/ScenarioFilters';
import ScenarioTable, {
  type Scenario,
} from '../../../components/Scenarios/ScenariosDirectory/ScenarioTable/ScenarioTable';
import ScenarioTableFooter from '../../../components/Scenarios/ScenariosDirectory/ScenarioTableFooter/ScenarioTableFooter';

import './ScenariosDirectory.scss';
import ScenariosDirectoryHeader from '../../../components/Scenarios/ScenariosDirectory/ScenariosDirectoryHeader/ScenariosDirectoryHeader';

const MOCK_SCENARIOS: Scenario[] = [
  {
    id: '1',
    name: 'Baseline Operations',
    status: 'ready',
    created: '12 May, 10:00',
    updated: '12 May, 14:22',
  },
  {
    id: '2',
    name: 'Heavy Traffic Test',
    status: 'ready',
    created: '11 May, 15:30',
    updated: '11 May, 18:40',
  },
  {
    id: '3',
    name: 'Storm Conditions',
    status: 'draft',
    created: '10 May, 09:15',
    updated: '10 May, 11:05',
  },
  {
    id: '4',
    name: 'Berth 2 Closure',
    status: 'ready',
    created: '09 May, 08:00',
    updated: '09 May, 16:30',
  },
];

const ScenariosDirectory = () => {
  const [activeFilter, setActiveFilter] = useState<ScenarioStatusFilter>('all');

  const filteredScenarios = useMemo(() => {
    if (activeFilter === 'all') {
      return MOCK_SCENARIOS;
    }

    return MOCK_SCENARIOS.filter((scenario) => scenario.status === activeFilter);
  }, [activeFilter]);

  return (
    <div className="scenarios-directory">
      <ScenariosDirectoryHeader />

      <div className="scenarios-directory__content">
        <ScenarioFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        <section className="scenarios-directory__table-container">
          <ScenarioTable scenarios={filteredScenarios} />

          <ScenarioTableFooter
            displayedCount={filteredScenarios.length}
            totalCount={MOCK_SCENARIOS.length}
          />
        </section>
      </div>
    </div>
  );
};

export default ScenariosDirectory;
