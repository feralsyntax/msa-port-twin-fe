import { useMemo, useState } from 'react';

import './SimulationsDirectory.scss';
import type {
  SimulationFilter,
  SimulationStatusCount,
} from '../../../components/Simulations/SimulationsDirectory/types/simulations.types';
import useGetSimulations from '../../../hooks/simulations/useGetSimulations';
import SimulationsDirectoryTopBar from '../../../components/Simulations/SimulationsDirectory/SimulationsDirectoryTopBar/SimulationsDirectoryTopBar';
import SimulationProvenanceNotice from '../../../components/Simulations/SimulationsDirectory/SimulationProvenanceNotice/SimulationProvenanceNotice';
import SimulationStatusTabs from '../../../components/Simulations/SimulationsDirectory/SimulationStatusTabs/SimulationStatusTabs';
import SimulationsDirectoryTable from '../../../components/Simulations/SimulationsDirectory/SimulationsDirectoryTable/SimulationsDirectoryTable';
import SimulationsDirectoryPagination from '../../../components/Simulations/SimulationsDirectory/SimulationsDirectoryPagination/SimulationsDirectoryPagination';

const PAGE_SIZE = 20;

const statusLabels = {
  all: 'All Runs',
  running: 'Running',
  completed: 'Completed',
  failed: 'Failed',
  pending: 'Pending',
} as const;

const SimulationsDirectoryPage = () => {
  const [activeFilter, setActiveFilter] = useState<SimulationFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: simulations = [], isLoading, isError, refetch } = useGetSimulations();

  const statusCounts = useMemo<SimulationStatusCount[]>(() => {
    const counts = {
      all: simulations.length,
      running: 0,
      completed: 0,
      failed: 0,
      pending: 0,
    };

    simulations.forEach((simulation) => {
      const status = simulation.status ?? 'pending';
      counts[status] += 1;
    });

    return (Object.keys(statusLabels) as SimulationFilter[]).map((status) => ({
      status,
      label: statusLabels[status],
      count: counts[status],
    }));
  }, [simulations]);

  const filteredSimulations = useMemo(() => {
    if (activeFilter === 'all') {
      return simulations;
    }

    return simulations.filter((simulation) => (simulation.status ?? 'pending') === activeFilter);
  }, [simulations, activeFilter]);

  const totalItems = filteredSimulations.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedSimulations = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;

    return filteredSimulations.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredSimulations, safeCurrentPage]);

  const handleFilterChange = (filter: SimulationFilter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  return (
    <div className="simulations-directory-page">
      <SimulationsDirectoryTopBar />

      <div className="simulations-directory-page__content">
        <SimulationProvenanceNotice />

        {isLoading ? (
          <div className="simulations-directory-page__state">Loading simulations...</div>
        ) : isError ? (
          <div className="simulations-directory-page__state simulations-directory-page__state--error">
            <p>Unable to load simulations.</p>

            <button type="button" onClick={() => refetch()}>
              Try again
            </button>
          </div>
        ) : (
          <>
            <SimulationStatusTabs
              tabs={statusCounts}
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
            />

            <SimulationsDirectoryTable simulations={paginatedSimulations} />

            <SimulationsDirectoryPagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SimulationsDirectoryPage;
