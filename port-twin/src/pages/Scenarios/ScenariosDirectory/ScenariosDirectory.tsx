import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ScenarioFilters, {
  type ScenarioStatusFilter,
} from '../../../components/Scenarios/ScenariosDirectory/ScenarioFilters/ScenarioFilters';
import ScenarioTable from '../../../components/Scenarios/ScenariosDirectory/ScenarioTable/ScenarioTable';
import ScenarioTableFooter from '../../../components/Scenarios/ScenariosDirectory/ScenarioTableFooter/ScenarioTableFooter';
import ScenariosDirectoryHeader from '../../../components/Scenarios/ScenariosDirectory/ScenariosDirectoryHeader/ScenariosDirectoryHeader';

import './ScenariosDirectory.scss';
import { useGetScenarios } from '../../../hooks/scenarios/useGetScenarios';
import type { ScenarioResponse } from '../../../api/models';

const ScenariosDirectoryPage = () => {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState<ScenarioStatusFilter>('all');
  const [page, setPage] = useState(1);

  const { data, isPending, isError, error, refetch } = useGetScenarios(page);

  const EMPTY_SCENARIOS: ScenarioResponse[] = [];

  const scenarios = data?.results ?? EMPTY_SCENARIOS;

  const filteredScenarios = useMemo(() => {
    if (activeFilter === 'all') {
      return scenarios;
    }

    return scenarios.filter((scenario) => scenario.status === activeFilter);
  }, [scenarios, activeFilter]);

  const handleNewScenario = () => {
    navigate('/app/scenarios/new');
  };

  const handleFilterChange = (filter: ScenarioStatusFilter) => {
    setActiveFilter(filter);
    setPage(1);
  };

  const handlePreviousPage = () => {
    setPage((currentPage) => Math.max(1, currentPage - 1));
  };

  const handleNextPage = () => {
    if (data?.next) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  return (
    <div className="scenarios-directory">
      <ScenariosDirectoryHeader onNewScenario={handleNewScenario} />

      <div className="scenarios-directory__content">
        <ScenarioFilters activeFilter={activeFilter} onFilterChange={handleFilterChange} />

        <section className="scenarios-directory__table-container">
          <ScenarioTable
            scenarios={filteredScenarios}
            isLoading={isPending}
            errorMessage={
              isError
                ? error instanceof Error
                  ? error.message
                  : 'Unable to load scenarios. Please try again.'
                : undefined
            }
            onRetry={() => refetch()}
          />

          <ScenarioTableFooter
            displayedCount={filteredScenarios.length}
            pageCount={scenarios.length}
            totalCount={data?.count ?? 0}
            page={page}
            hasPreviousPage={Boolean(data?.previous)}
            hasNextPage={Boolean(data?.next)}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        </section>
      </div>
    </div>
  );
};

export default ScenariosDirectoryPage;
