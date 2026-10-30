import { useNavigate } from "react-router-dom";
import VesselDetailsTopBar from "../../../components/Vessels/VesselDetails/VesselDetailsTopBar/VesselDetailsTopBar";

const VesselDetailsPage = () => {
  const navigate = useNavigate();

  const vessel = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "MV Kwale Star",
    sector: "KILINDINI-04",
  };

  const handleViewMap = () => {
    navigate("/app/map", {
      state: {
        selectedVesselId: vessel.id,
      },
    });
  };
  return (
    <>
      <VesselDetailsTopBar
        vesselName={vessel.name}
        sector={vessel.sector}
        onViewMap={handleViewMap}
      />
    </>
  );
};

export default VesselDetailsPage;
