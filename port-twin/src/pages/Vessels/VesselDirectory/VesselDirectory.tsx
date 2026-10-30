import { useMemo, useState } from "react";
import TopBar from "../../../components/Vessels/VesselDirectory/TopBar/TopBar";
import type { VesselFilterStatus } from "../../../components/Vessels/VesselDirectory/VesselFilters/VesselFilters";
import VesselFilters from "../../../components/Vessels/VesselDirectory/VesselFilters/VesselFilters";
import VesselTable from "../../../components/Vessels/VesselDirectory/VesselTable/VesselTable";
import { demoVessels } from "../../../components/Vessels/VesselDirectory/VesselTable/demoVessels";
import VesselPagination from "../../../components/Vessels/VesselDirectory/VesselPagination/VesselPagination";

const PAGE_SIZE = 8;

const VesselsDirectoryPage = () => {
  const [activeFilter, setActiveFilter] = useState<VesselFilterStatus>("all");

  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  // This will eventually contain the vessels returned by the API.
  const vessels = demoVessels;

  const totalItems = vessels.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  // Keep the current page within the valid range.
  const safePage = Math.min(
    Math.max(currentPage, 1),
    Math.max(totalPages, 1)
  );

  // Select only the records belonging to the current page.
  const paginatedVessels = useMemo(() => {
    const startIndex = (safePage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    return vessels.slice(startIndex, endIndex);
  }, [vessels, safePage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };
  
  return (
    <>
      <TopBar />
      <VesselFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <VesselTable vessels={paginatedVessels} />
      <VesselPagination
        currentPage={safePage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={PAGE_SIZE}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default VesselsDirectoryPage;
