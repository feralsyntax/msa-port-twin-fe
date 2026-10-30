import { useNavigate } from "react-router-dom";
import VesselDetailsTopBar from "../../../components/Vessels/VesselDetails/VesselDetailsTopBar/VesselDetailsTopBar";
import VesselIdentityHeader from "../../../components/Vessels/VesselDetails/VesselIdentityHeader/VesselIdentityHeader";

const VesselDetailsPage = () => {
  const navigate = useNavigate();

  const vessel = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "MV Kwale Star",
    imo: "9876543",
    mmsi: "636019283",
    vessel_type: "Container Ship",
    status: "Active in Port",
    flag: "Marshall Islands",
    flagCode: "MH",
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
      <VesselIdentityHeader
        name={vessel.name}
        status='Active in Port'
        imo={vessel.imo}
        mmsi={vessel.mmsi}
        vesselType={vessel.vessel_type}
        flag='Marshall Islands'
        flagCode='MH'
      />
    </>
  );
};

export default VesselDetailsPage;
