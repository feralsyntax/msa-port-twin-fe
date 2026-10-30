import { useMemo, useState } from "react";
import TopBar from "../../../components/Vessels/VesselDirectory/TopBar/TopBar";
import type { VesselFilterStatus } from "../../../components/Vessels/VesselDirectory/VesselFilters/VesselFilters";
import VesselFilters from "../../../components/Vessels/VesselDirectory/VesselFilters/VesselFilters";
import VesselTable from "../../../components/Vessels/VesselDirectory/VesselTable/VesselTable";
import {
  demoVessels,
  type Vessel,
} from "../../../components/Vessels/VesselDirectory/VesselTable/demoVessels";
import VesselPagination from "../../../components/Vessels/VesselDirectory/VesselPagination/VesselPagination";
import "./VesselDirectory.scss";

const PAGE_SIZE = 8;

const VesselsDirectoryPage = () => {
  const [activeFilter, setActiveFilter] = useState<VesselFilterStatus>("all");

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const vessels: Vessel[] = demoVessels;

  // Apply the selected status filter.
  const filteredByStatus = useMemo(() => {
    switch (activeFilter) {
      case "in-port":
        return vessels.filter((vessel) => vessel.status === "in-port");

      case "approaching":
        return vessels.filter((vessel) => vessel.status === "approaching");

      default:
        return vessels;
    }
  }, [vessels, activeFilter]);

  // Apply the search query after status filtering.
  const filteredVessels = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return filteredByStatus;

    return filteredByStatus.filter((vessel) =>
      [vessel.name, vessel.mmsi, vessel.type].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [filteredByStatus, searchQuery]);

  // Calculate pagination.
  const totalItems = filteredVessels.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const safePage = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));

  const paginatedVessels = useMemo(() => {
    const startIndex = (safePage - 1) * PAGE_SIZE;

    return filteredVessels.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredVessels, safePage]);

  // Reset pagination whenever filtering or searching changes.
  const handleFilterChange = (filter: VesselFilterStatus) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  const filterCounts = {
    all: vessels.length,
    inPort: vessels.filter((vessel) => vessel.status === "in-port").length,
    approaching: vessels.filter((vessel) => vessel.status === "approaching")
      .length,
  };

  return (
    <div className='vessels-page'>
      <TopBar />

      <main className='vessels-page__content'>
        <VesselFilters
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          counts={filterCounts}
        />

        <div className='vessels-page__table'>
          <VesselTable vessels={paginatedVessels} />

          <VesselPagination
            currentPage={safePage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={PAGE_SIZE}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
};

export default VesselsDirectoryPage;
