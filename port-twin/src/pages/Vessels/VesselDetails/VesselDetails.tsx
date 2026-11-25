import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '../../../components/Common/TopBar/TopBar';
import VesselIdentityHeader from '../../../components/Vessels/VesselDetails/VesselIdentityHeader/VesselIdentityHeader';
import VesselSpecifications from '../../../components/Vessels/VesselDetails/VesselSpecifications/VesselSpecifications';
import VesselIdentityPanel from '../../../components/Vessels/VesselDetails/VesselIdentityPanel/VesselIdentityPanel';
import LastKnownPositionPanel from '../../../components/Vessels/VesselDetails/LastKnownPositionPanel/LastKnownPositionPanel';
import VesselSimulationUsage from '../../../components/Vessels/VesselDetails/VesselSimulationUsage/VesselSimulationUsage';
import './VesselDetails.scss';
import { useGetVesselDetails } from '../../../hooks/vessels/useGetVesselDetails';
import { useGetVesselPositions } from '../../../hooks/vessels/useGetVesselPositions';
import type { VesselPosition } from '../../../api/models';
import { parseApiError } from '../../../utils/apiError';
import ServerErrors from '../../../components/errors/ServerErrors';
import { routes } from '../../../utils/routes';
const VesselDetailsPage = () => {
  const navigate = useNavigate();

  const { vesselId } = useParams<{ vesselId: string }>();

  const {
    data: vessel,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetVesselDetails(vesselId);

  const { data: positionsData } = useGetVesselPositions(vesselId);

  const latestPosition = positionsData?.results.reduce<VesselPosition | undefined>(
    (latest, current) => {
      if (
        !latest ||
        new Date(current.recorded_at).getTime() > new Date(latest.recorded_at).getTime()
      ) {
        return current;
      }

      return latest;
    },
    undefined,
  );

  const position = latestPosition
    ? {
        latitude: latestPosition.latitude,
        longitude: latestPosition.longitude,
        speed: latestPosition.speed_over_ground,
        course: latestPosition.course_over_ground,
        recordedAt: latestPosition.recorded_at,
        provenance: latestPosition,
      }
    : undefined;

  const handleViewSimulations = () => {
    navigate(routes.simulations());
  };

  const parsedError = isError ? parseApiError(error) : null;

  return (
    <main className="vessel-details-page">
      {isPending || isError || parsedError || isFetching || !vessel ? (
        <>
          <TopBar
            breadcrumb={{ label: 'Vessels', to: routes.vessels() }}
            current={vessel?.name}
            showSearch={false}
          />
          <div className="vessel-details-page__content">
            <ServerErrors
              isPending={isPending}
              isError={isError}
              isFetching={isFetching}
              parsedError={parsedError}
              refetch={refetch}
              requestedData="vessels"
              noData={!vessel}
            />
          </div>
        </>
      ) : (
        <>
          <TopBar
            breadcrumb={{ label: 'Vessels', to: routes.vessels() }}
            current={vessel.name}
            showSearch={false}
          />

          <div className="vessel-details-page__content">
            <VesselIdentityHeader vessel={vessel} />

            <VesselSpecifications vessel={vessel} />

            <section className="vessel-details-page__overview">
              <VesselIdentityPanel vessel={vessel} />

              <LastKnownPositionPanel position={position} />
            </section>

            <VesselSimulationUsage runCount={0} onViewSimulations={handleViewSimulations} />
          </div>
        </>
      )}
    </main>
  );
};

export default VesselDetailsPage;
