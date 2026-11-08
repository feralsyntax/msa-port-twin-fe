import './SimulationMetricCards.scss';

type DeltaTone = 'up' | 'down' | 'flat'

interface MetricCard {
  label: string
  value: string
  baseline: string
  delta: string
  tone: DeltaTone
}

const metrics: MetricCard[] = [
  {
    label: 'AVG WAIT TIME',
    value: '2.4 h',
    baseline: '3.2 h',
    delta: '▼ -0.8 h',
    tone: 'down',
  },
  {
    label: 'MAX QUEUE LENGTH',
    value: '4',
    baseline: '6',
    delta: '▼ -2',
    tone: 'down',
  },
  {
    label: 'BERTH UTILIZATION',
    value: '82%',
    baseline: '78%',
    delta: '▲ +4%',
    tone: 'up',
  },
  {
    label: 'VESSELS PROCESSED',
    value: '14 / 14',
    baseline: '14',
    delta: '— 0',
    tone: 'flat',
  },
]

const SimulationMetricCards = () => {
  return (
    <section className="sim-metrics" aria-label="Simulation outcome metrics">
      {metrics.map((metric) => (
        <article key={metric.label} className="sim-metric-card">
          <div className="sim-metric-card__top">
            <span className="sim-metric-card__label">{metric.label}</span>
            <span className="sim-metric-card__tag">◇ SIMULATED</span>
          </div>

          <div className="sim-metric-card__value">{metric.value}</div>

          <div className="sim-metric-card__footer">
            <span className="sim-metric-card__baseline">
              Baseline: <span>{metric.baseline}</span>
            </span>
            <span
              className={`sim-metric-card__delta sim-metric-card__delta--${metric.tone}`}
            >
              {metric.delta}
            </span>
          </div>
        </article>
      ))}
    </section>
  )
}

export default SimulationMetricCards