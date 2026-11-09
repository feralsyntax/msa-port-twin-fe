import { useParams } from 'react-router-dom';
import SimulationDetailsTopBar from '../../../components/Simulations/SimulationDetails/SimulationDetailsTopBar/SimulationDetailsTopBar';
import SimulatedDataBanner from '../../../components/Simulations/SimulationDetails/SimulatedDataBanner/SimulatedDataBanner';
import SimulationIdentityHeader from '../../../components/Simulations/SimulationDetails/SimulationIdentityHeader/SimulationIdentityHeader';
import SimulationMetricCards from '../../../components/Simulations/SimulationDetails/SimulationMetricCards/SimulationMetricCards';
import BerthSchedule from '../../../components/Simulations/SimulationDetails/BerthSchedule/BerthSchedule';
import VesselQueueImpact from '../../../components/Simulations/SimulationDetails/VesselQueueImpact/VesselQueueImpact';
import SimulationDetailsFooter from '../../../components/Simulations/SimulationDetails/SimulationDetailsFooter/SimulationDetailsFooter';
import './SimulationDetails.scss';

const SimulationDetailsPage = () => {
  const { simulationId } = useParams<{ simulationId: string }>();
  const id = simulationId ?? 'sim_9a4b8e';

  return (
    <div className="sim-details-page">
      <SimulationDetailsTopBar simulationId={id} />
      <SimulatedDataBanner />

      <div className="sim-details-page__content">
        <SimulationIdentityHeader simulationId={id} />
        <SimulationMetricCards />
        <BerthSchedule />
        <VesselQueueImpact />
        <SimulationDetailsFooter />
      </div>
    </div>
  );
};

export default SimulationDetailsPage;
