import './SimulationIdentityHeader.scss';

interface SimulationIdentityHeaderProps {
  simulationId: string
  status?: 'COMPLETED' | 'RUNNING' | 'FAILED'
  scenarioTitle?: string
  runAt?: string
}

const SimulationIdentityHeader = ({
  simulationId,
  status = 'COMPLETED',
  scenarioTitle = 'Scenario A: Baseline Vessel Arrivals',
  runAt = 'Run on 12 May, 14:08',
}: SimulationIdentityHeaderProps) => {
  return (
    <section className="sim-identity">
      <div className="sim-identity__title-row">
        <h1 className="sim-identity__id">{simulationId}</h1>
        <span
          className={`sim-identity__status sim-identity__status--${status.toLowerCase()}`}
        >
          {status}
        </span>
      </div>
      <p className="sim-identity__meta">
        <span>{scenarioTitle}</span>
        <span className="sim-identity__dot">·</span>
        <span>{runAt}</span>
      </p>
    </section>
  )
}

export default SimulationIdentityHeader