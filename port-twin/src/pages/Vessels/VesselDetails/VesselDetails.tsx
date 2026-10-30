import { useNavigate } from "react-router-dom";
import VesselDetailsTopBar from "../../../components/Vessels/VesselDetails/VesselDetailsTopBar/VesselDetailsTopBar";
import VesselIdentityHeader from "../../../components/Vessels/VesselDetails/VesselIdentityHeader/VesselIdentityHeader";
import VesselSpecifications from "../../../components/Vessels/VesselDetails/VesselSpecifications/VesselSpecifications";
import VesselIdentityPanel from "../../../components/Vessels/VesselDetails/VesselIdentityPanel/VesselIdentityPanel";
import LastKnownPositionPanel from "../../../components/Vessels/VesselDetails/LastKnownPositionPanel/LastKnownPositionPanel";
import VesselSimulationUsage from "../../../components/Vessels/VesselDetails/VesselSimulationUsage/VesselSimulationUsage";
import "./VesselDetails.scss";
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

    // Physical specifications
    lengthOverall: 300.0,
    parallelBody: 184.2,
    width: 42.0,
    mouldedDepth: 24.6,
    draft: 14.2,
    airDraftClearance: 48.3,

    identity: {
      id: "550e8400-e29b-41d4-a716-446655440000",
      vesselType: "Container Ship",
      imo: "9876543",
      mmsi: "636019283",
      callSign: "D5NX4",
      grossTonnage: 74210,
      recordCreated: "2024-05-12 08:00",
      lastUpdated: "2024-05-12 14:20",
    },

    position: {
      latitude: "04°03′ S",
      longitude: "39°41′ E",
      speed: 12.4,
      heading: 240,
      sector: "C-2",
      provenance: "MEASURED",
      lastUpdate: "2m ago",
    },

    simulationRuns: 0,
  };

  const handleViewMap = () => {
    navigate("/app/map", {
      state: {
        selectedVesselId: vessel.id,
      },
    });
  };

  const handleViewSimulations = () => {
    navigate("/app/simulations");
  };

  return (
    <main className='vessel-details-page'>
      <VesselDetailsTopBar
        vesselName={vessel.name}
        sector={vessel.sector}
        onViewMap={handleViewMap}
      />

      <div className='vessel-details-page__content'>
        <VesselIdentityHeader
          name={vessel.name}
          status={vessel.status}
          imo={vessel.imo}
          mmsi={vessel.mmsi}
          vesselType={vessel.vessel_type}
          flag={vessel.flag}
          flagCode={vessel.flagCode}
        />

        <VesselSpecifications
          lengthOverall={vessel.lengthOverall}
          parallelBody={vessel.parallelBody}
          width={vessel.width}
          mouldedDepth={vessel.mouldedDepth}
          draft={vessel.draft}
          airDraftClearance={vessel.airDraftClearance}
        />

        <section className='vessel-details-page__overview'>
          <VesselIdentityPanel vessel={vessel.identity} />

          <LastKnownPositionPanel position={vessel.position} />
        </section>

        <VesselSimulationUsage
          runCount={vessel.simulationRuns}
          onViewSimulations={handleViewSimulations}
        />
      </div>
    </main>
  );
};

export default VesselDetailsPage;
