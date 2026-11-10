import { useParams } from 'react-router-dom';

import SimulationDetailsTopBar from '../../../components/Simulations/SimulationDetails/SimulationDetailsTopBar/SimulationDetailsTopBar';
import SimulatedDataBanner from '../../../components/Simulations/SimulationDetails/SimulatedDataBanner/SimulatedDataBanner';
import SimulationIdentityHeader from '../../../components/Simulations/SimulationDetails/SimulationIdentityHeader/SimulationIdentityHeader';
import SimulationMetricCards from '../../../components/Simulations/SimulationDetails/SimulationMetricCards/SimulationMetricCards';
import BerthSchedule from '../../../components/Simulations/SimulationDetails/BerthSchedule/BerthSchedule';
import VesselQueueImpact from '../../../components/Simulations/SimulationDetails/VesselQueueImpact/VesselQueueImpact';
import SimulationDetailsFooter from '../../../components/Simulations/SimulationDetails/SimulationDetailsFooter/SimulationDetailsFooter';

import './SimulationDetails.scss';
import useGetSimulationDetails from '../../../hooks/simulations/useGetSimulationDetails';

const SimulationDetailsPage = () => {
  const { simulationId } = useParams<{ simulationId: string }>();
  const id = simulationId ?? '';

  const { data: simulation, isLoading, isError } = useGetSimulationDetails(id);

  if (!id) {
    return (
      <div className="sim-details-page">
        <p role="alert">No simulation ID was provided.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="sim-details-page">
        <p role="status">Loading simulation details...</p>
      </div>
    );
  }

  if (isError || !simulation) {
    return (
      <div className="sim-details-page">
        <p role="alert">
          Unable to load simulation details. The simulation may not exist or the server could not be
          reached.
        </p>
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
