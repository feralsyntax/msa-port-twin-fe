import { useState } from "react";
import TopBar from "../../../components/Vessels/VesselDirectory/TopBar/TopBar";
import type { VesselFilterStatus } from "../../../components/Vessels/VesselDirectory/VesselFilters/VesselFilters";
import VesselFilters from "../../../components/Vessels/VesselDirectory/VesselFilters/VesselFilters";

const VesselsDirectoryPage = () => {
  const [activeFilter, setActiveFilter] = useState<VesselFilterStatus>("all");

  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <TopBar />
      <VesselFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    </>
  );
};

export default VesselsDirectoryPage;
