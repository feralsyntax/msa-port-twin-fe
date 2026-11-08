import { useState } from 'react';

import './SimulationsDirectory.scss';
import {
  simulations,
  simulationStatusCounts,
} from '../../../components/Simulations/SimulationsDirectory/data/simulations.data';
import SimulationProvenanceNotice from '../../../components/Simulations/SimulationsDirectory/SimulationProvenanceNotice/SimulationProvenanceNotice';
import SimulationsTable from '../../../components/Simulations/SimulationsDirectory/SimulationsDirectoryTable/SimulationsDirectoryTable';
import SimulationStatusTabs from '../../../components/Simulations/SimulationsDirectory/SimulationStatusTabs/SimulationStatusTabs';
import type { SimulationFilter } from '../../../components/Simulations/SimulationsDirectory/types/simulations.types';
import SimulationsDirectoryPagination from '../../../components/Simulations/SimulationsDirectory/SimulationsDirectoryPagination/SimulationsDirectoryPagination';
import SimulationsDirectoryTopBar from '../../../components/Simulations/SimulationsDirectory/SimulationsDirectoryTopBar/SimulationsDirectoryTopBar';

const SimulationsDirectoryPage = () => {
  const [activeFilter, setActiveFilter] = useState<SimulationFilter>('all');

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;

  const filteredSimulations =
    activeFilter === 'all'
      ? simulations
      : simulations.filter((simulation) => simulation.status === activeFilter);

  const totalItems = simulationStatusCounts.find((tab) => tab.status === activeFilter)?.count ?? 0;

  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedSimulations = filteredSimulations.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="simulations-directory-page">
      <SimulationsDirectoryTopBar />

      <SimulationProvenanceNotice />

      <SimulationStatusTabs
        tabs={simulationStatusCounts}
        activeFilter={activeFilter}
        onFilterChange={(filter) => {
          setActiveFilter(filter);
          setCurrentPage(1);
        }}
      />

      <SimulationsTable simulations={paginatedSimulations} />

      <SimulationsDirectoryPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
      />
    </div>
  );
};

export default SimulationsDirectoryPage;
