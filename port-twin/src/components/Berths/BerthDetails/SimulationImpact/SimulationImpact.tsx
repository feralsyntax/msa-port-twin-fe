import './SimulationImpact.scss';

interface SimulationImpactProps {
  scenarioCount?: number
  avgUtilization?: string
  utilizationDelta?: string
  mostFrequentVessel?: string
  vesselClass?: string
  simulatedClosures?: number
  closuresNote?: string
}

const SimulationImpact = ({
  scenarioCount = 14,
  avgUtilization = '82%',
  utilizationDelta = '+4.2% vs baseline capacity',
  mostFrequentVessel = 'Container Ship',
  vesselClass = 'Panamax / Post-Panamax class',
  simulatedClosures = 2,
  closuresNote = 'Monsoon surge & maintenance drills',
}: SimulationImpactProps) => {
  return (
    <section className="simulation-impact" aria-label="Simulation impact">
      <div className="simulation-impact__header">
        <h2 className="simulation-impact__title">Simulation Impact</h2>
      </div>

      <p className="simulation-impact__summary">
        This berth has been used in {scenarioCount} simulation scenarios over the
        last 30 days.
      </p>

      <div className="simulation-impact__metrics">
        <article className="simulation-impact__metric">
          <div className="simulation-impact__metric-top">
            <span className="simulation-impact__metric-label">Avg. Utilization</span>
            <span className="simulation-impact__tag simulation-impact__tag--sim">
              SIMULATED
            </span>
          </div>
          <div className="simulation-impact__metric-value">{avgUtilization}</div>
          <div className="simulation-impact__metric-note">{utilizationDelta}</div>
        </article>

        <article className="simulation-impact__metric">
          <div className="simulation-impact__metric-top">
            <span className="simulation-impact__metric-label">
              Most Frequent Vessel
            </span>
            <span className="simulation-impact__tag simulation-impact__tag--hist">
              HISTORICAL
            </span>
          </div>
          <div className="simulation-impact__metric-value simulation-impact__metric-value--text">
            {mostFrequentVessel}
          </div>
          <div className="simulation-impact__metric-note">{vesselClass}</div>
        </article>

        <article className="simulation-impact__metric">
          <div className="simulation-impact__metric-top">
            <span className="simulation-impact__metric-label">
              Simulated Closures
            </span>
            <span className="simulation-impact__tag simulation-impact__tag--sim">
              SIMULATED
            </span>
          </div>
          <div className="simulation-impact__metric-value">{simulatedClosures}</div>
          <div className="simulation-impact__metric-note">{closuresNote}</div>
        </article>
      </div>
    </section>
  )
}

export default SimulationImpact