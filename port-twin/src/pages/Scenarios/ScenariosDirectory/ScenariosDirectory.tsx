import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ScenarioFilters, {
  type ScenarioStatusFilter,
} from '../../../components/Scenarios/ScenariosDirectory/ScenarioFilters/ScenarioFilters';
import ScenarioTable from '../../../components/Scenarios/ScenariosDirectory/ScenarioTable/ScenarioTable';
import ScenarioTableFooter from '../../../components/Scenarios/ScenariosDirectory/ScenarioTableFooter/ScenarioTableFooter';
import TopBar from '../../../components/Common/TopBar/TopBar';

import { useGetScenarios } from '../../../hooks/scenarios/useGetScenarios';
import { parseApiError } from '../../../utils/apiError';
import ServerErrors from '../../../components/errors/ServerErrors';

import './ScenariosDirectory.scss';

const PAGE_SIZE = 20;

const ScenariosDirectoryPage = () => {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState<ScenarioStatusFilter>('all');
  const [page, setPage] = useState(1);

  const { data, isPending, isError, error, isPlaceholderData, refetch, isFetching } =
    useGetScenarios(page);

  const scenarios = useMemo(() => data?.results ?? [], [data?.results]);
  const totalItems = data?.count ?? 0;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE) || 0;

  const parsedError = isError ? parseApiError(error) : null;

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

  const handlePageChange = (nextPage: number) => {
    if (isPlaceholderData) return;
    if (nextPage < 1 || nextPage > totalPages) return;
    setPage(nextPage);
  };

  // Block on API list state, not client filter results
  const showBlockingState = isPending || isError || parsedError != null || scenarios.length === 0;

  return (
    <div className="scenarios-directory">
      <TopBar
        title="Scenarios"
        showSearch={false}
        action={
          <button type="button" className="app-topbar__action" onClick={handleNewScenario}>
            <span className="material-symbols-outlined">add</span>
            <span>New Scenario</span>
          </button>
        }
      />

      <div className="scenarios-directory__content">
        {showBlockingState ? (
          <ServerErrors
            isPending={isPending}
            isError={isError}
            isFetching={isFetching}
            parsedError={parsedError}
            refetch={refetch}
            requestedData="scenarios"
            noData={!isPending && !isError && scenarios.length === 0}
          />
        ) : (
          <>
            <ScenarioFilters activeFilter={activeFilter} onFilterChange={handleFilterChange} />

            <section className="scenarios-directory__table-container">
              <ScenarioTable scenarios={filteredScenarios} />

              <ScenarioTableFooter
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={PAGE_SIZE}
                onPageChange={handlePageChange}
                canGoPrevious={Boolean(data?.previous) && !isPlaceholderData}
                canGoNext={Boolean(data?.next) && !isPlaceholderData}
              />
            </section>

            {isPlaceholderData && <p role="status">Loading the selected page...</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default ScenariosDirectoryPage;
