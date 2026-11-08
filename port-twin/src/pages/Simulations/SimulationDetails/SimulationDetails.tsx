import { useParams } from 'react-router-dom';
import SimulationDetailsTopBar from '../../../components/Simulations/SimulationDetails/SimulationDetailsTopBar/SimulationDetailsTopBar';
import SimulatedDataBanner from '../../../components/Simulations/SimulationDetails/SimulatedDataBanner/SimulatedDataBanner';
import SimulationIdentityHeader from '../../../components/Simulations/SimulationDetails/SimulationIdentityHeader/SimulationIdentityHeader';
import './SimulationDetails.scss';

const SimulationDetailsPage = () => {
  const { simulationId } = useParams<{ simulationId: string }>()
  const id = simulationId ?? 'sim_9a4b8e'

  return (
    <div className="sim-details-page">
      <SimulationDetailsTopBar simulationId={id} />
      <SimulatedDataBanner />

      <div className="sim-details-page__content">
        <SimulationIdentityHeader simulationId={id} />

        {/* Metrics, Gantt, queue impact — later sections */}
      </div>
    </div>
  )
}

export default SimulationDetailsPage