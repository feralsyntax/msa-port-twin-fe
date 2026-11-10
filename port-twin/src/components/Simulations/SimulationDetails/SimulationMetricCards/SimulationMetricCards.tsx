import './SimulationMetricCards.scss';

type DeltaTone = 'up' | 'down' | 'flat';

interface SimulationMetricCardsProps {
  summary: {
    total_arrivals: number;
    vessels_served: number;
    vessels_waiting: number;
    vessels_in_service: number;
    average_waiting_hours: number;
    average_turnaround_hours: number;
    berth_utilization_percent: number;
  } | null;

  queueTimeline:
    | {
        hour: number;
        vessels_waiting: number;
      }[]
    | null;
}

const formatNumber = (value: number, decimals = 1) => Number(value.toFixed(decimals)).toString();

const SimulationMetricCards = ({ summary, queueTimeline }: SimulationMetricCardsProps) => {
  if (!summary) {
    return (
      <section className="sim-metrics" aria-label="Simulation outcome metrics">
        <p>Simulation metrics are not available.</p>
      </section>
    );
  }

  const maxQueueLength = queueTimeline?.length
    ? Math.max(...queueTimeline.map((point) => point.vessels_waiting))
    : 0;

  const metrics = [
    {
      label: 'AVG WAIT TIME',
      value: `${formatNumber(summary.average_waiting_hours)} h`,
      baseline: 'Not available',
      delta: null,
      tone: 'flat' as DeltaTone,
    },
    {
      label: 'MAX QUEUE LENGTH',
      value: String(maxQueueLength),
      baseline: 'Not available',
      delta: null,
      tone: 'flat' as DeltaTone,
    },
    {
      label: 'BERTH UTILIZATION',
      value: `${formatNumber(summary.berth_utilization_percent)}%`,
      baseline: 'Not available',
      delta: null,
      tone: 'flat' as DeltaTone,
    },
    {
      label: 'VESSELS PROCESSED',
      value: `${summary.vessels_served} / ${summary.total_arrivals}`,
      baseline: `${summary.total_arrivals} arrivals`,
      delta: null,
      tone: 'flat' as DeltaTone,
    },
  ];

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
              {metric.label === 'VESSELS PROCESSED'
                ? metric.baseline
                : 'Historical baseline unavailable'}
            </span>
          </div>
        </article>
      ))}
    </section>
  );
};

export default SimulationMetricCards;
