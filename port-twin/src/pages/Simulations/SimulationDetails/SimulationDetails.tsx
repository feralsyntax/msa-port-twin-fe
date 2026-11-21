import { useParams } from 'react-router-dom';

import SimulationDetailsTopBar from '../../../components/Simulations/SimulationDetails/SimulationDetailsTopBar/SimulationDetailsTopBar';
import SimulatedDataBanner from '../../../components/Simulations/SimulationDetails/SimulatedDataBanner/SimulatedDataBanner';
import SimulationIdentityHeader from '../../../components/Simulations/SimulationDetails/SimulationIdentityHeader/SimulationIdentityHeader';
import SimulationMetricCards from '../../../components/Simulations/SimulationDetails/SimulationMetricCards/SimulationMetricCards';
import BerthSchedule from '../../../components/Simulations/SimulationDetails/BerthSchedule/BerthSchedule';
import VesselQueueImpact from '../../../components/Simulations/SimulationDetails/VesselQueueImpact/VesselQueueImpact';
import SimulationDetailsFooter from '../../../components/Simulations/SimulationDetails/SimulationDetailsFooter/SimulationDetailsFooter';
import ServerErrors from '../../../components/errors/ServerErrors';
import { parseApiError } from '../../../utils/apiError';

import './SimulationDetails.scss';
import useGetSimulationDetails from '../../../hooks/simulations/useGetSimulationDetails';

const SimulationDetailsPage = () => {
  const { simulationId } = useParams<{ simulationId: string }>();
  const id = simulationId ?? '';

  const {
    data: simulation,
    isPending,
    isError,
    error,
    isFetching,
    refetch,
  } = useGetSimulationDetails(id);
  const parsedError = isError ? parseApiError(error) : null;

  if (!id) {
    return (
      <div className="sim-details-page">
        <p role="alert">No simulation ID was provided.</p>
      </div>
    );
  }

  const showBlockingState = isPending || isError || parsedError != null || !simulation;

  if (showBlockingState) {
    return (
      <div className="sim-details-page">
        <ServerErrors
          isPending={isPending}
          isError={isError}
          isFetching={isFetching}
          parsedError={parsedError}
          refetch={refetch}
          requestedData="simulation details"
          noData={!isPending && !isError && !simulation}
        />
      </div>
    );
  }

  return (
    <div className="sim-details-page">
      <SimulationDetailsTopBar simulationId={simulation.id} />
      <SimulatedDataBanner />

      <div className="sim-details-page__content">
        <SimulationIdentityHeader simulation={simulation} />

        <SimulationMetricCards
          summary={simulation.summary}
          queueTimeline={simulation.queue_timeline}
        />

        <BerthSchedule vesselResults={simulation.vessel_results} />

        <VesselQueueImpact vesselResults={simulation.vessel_results} />

        <SimulationDetailsFooter simulationId={simulation.id} />
      </div>
    </div>
  );
};

export default SimulationDetailsPage;
