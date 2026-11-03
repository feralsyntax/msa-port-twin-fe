import { useNavigate, useParams } from "react-router-dom";
import VesselDetailsTopBar from "../../../components/Vessels/VesselDetails/VesselDetailsTopBar/VesselDetailsTopBar";
import VesselIdentityHeader from "../../../components/Vessels/VesselDetails/VesselIdentityHeader/VesselIdentityHeader";
import VesselSpecifications from "../../../components/Vessels/VesselDetails/VesselSpecifications/VesselSpecifications";
import VesselIdentityPanel from "../../../components/Vessels/VesselDetails/VesselIdentityPanel/VesselIdentityPanel";
import LastKnownPositionPanel from "../../../components/Vessels/VesselDetails/LastKnownPositionPanel/LastKnownPositionPanel";
import VesselSimulationUsage from "../../../components/Vessels/VesselDetails/VesselSimulationUsage/VesselSimulationUsage";
import "./VesselDetails.scss";
import { useGetVesselDetails } from "../../../hooks/vessels/useGetVesselDetails";
const VesselDetailsPage = () => {
  const navigate = useNavigate();

  const { vesselId } = useParams<{ vesselId: string }>();

  const {
    data: vessel,
    isPending,
    isError,
    refetch,
  } = useGetVesselDetails(vesselId);

  const handleViewMap = () => {
    navigate("/app/map", {
      state: {
        selectedVesselId: vessel?.id,
      },
    });
  };

  const handleViewSimulations = () => {
    navigate("/app/simulations");
  };

  if (isPending) {
    return <p role='status'>Loading vessel details...</p>;
  }

  if (isError) {
    return (
      <div role="alert" className='alert'>
        <p>Failed to load vessel details.</p>
        <button type="button" onClick={() => refetch()}>
          Try again
        </button>
      </div>
    );
  }

  if (!vessel) {
    return <p>Vessel not found.</p>;
  }

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
