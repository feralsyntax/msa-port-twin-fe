import { useState } from "react";
import TopBar from "../../../components/Vessels/VesselDirectory/TopBar/TopBar";
import type { VesselFilterStatus } from "../../../components/Vessels/VesselDirectory/VesselFilters/VesselFilters";
import VesselFilters from "../../../components/Vessels/VesselDirectory/VesselFilters/VesselFilters";
import VesselTable from "../../../components/Vessels/VesselDirectory/VesselTable/VesselTable";
import { demoVessels } from "../../../components/Vessels/VesselDirectory/VesselTable/demoVessels";

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
      <VesselTable vessels={demoVessels} />
    </>
  );
};

export default VesselsDirectoryPage;
