import { useState } from 'react';


import './SimulationsDirectoryPage.scss';
import { simulations, simulationStatusCounts } from '../../../components/Simulations/SimulationsDirectory/data/simulations.data';
import SimulationProvenanceNotice from '../../../components/Simulations/SimulationsDirectory/SimulationProvenanceNotice/SimulationProvenanceNotice';
import SimulationsTable from '../../../components/Simulations/SimulationsDirectory/SimulationsDirectoryTable/SimulationsDirectoryTable';
import SimulationStatusTabs from '../../../components/Simulations/SimulationsDirectory/SimulationStatusTabs/SimulationStatusTabs';
import type { SimulationFilter } from '../../../components/Simulations/SimulationsDirectory/types/simulations.types';
import SimulationsDirectoryPagination from '../../../components/Simulations/SimulationsDirectory/SimulationsDirectoryPagination/SimulationsDirectoryPagination';
import SimulationsDirectoryTopBar from '../../../components/Simulations/SimulationsDirectory/SimulationsDirectoryTopBar/SimulationsDirectoryTopBar';

const SimulationsDirectoryPage = () => {
  const [activeFilter, setActiveFilter] = useState<SimulationFilter>('all');

  const filteredSimulations =
    activeFilter === 'all'
      ? simulations
      : simulations.filter((simulation) => simulation.status === activeFilter);

  const activeTab = simulationStatusCounts.find((tab) => tab.status === activeFilter);

  const totalCount = activeTab?.count ?? 0;

  return (
    <div className="simulations-directory-page">
      <SimulationsDirectoryTopBar />

      <SimulationProvenanceNotice />

      <SimulationStatusTabs
        tabs={simulationStatusCounts}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <SimulationsTable simulations={filteredSimulations} />

      <SimulationsDirectoryPagination displayedCount={filteredSimulations.length} totalCount={totalCount} />
    </div>
  );
};

export default SimulationsDirectoryPage;
