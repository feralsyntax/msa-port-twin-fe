import './ScenarioMetrics.scss';

interface ScenarioMetricsProps {
  expectedArrivals: number;
  arrivalInterval: number;
  averageServiceTime: number;
  simulationHours: number;
  availableBerths?: number | null;
}

const ScenarioMetrics = ({
  expectedArrivals,
  arrivalInterval,
  averageServiceTime,
  simulationHours,
  availableBerths,
}: ScenarioMetricsProps) => {
  const metrics = [
    {
      label: 'Expected Arrivals',
      value: expectedArrivals.toString(),
      unit: 'VESSELS',
      description: `Every ${arrivalInterval} hours`,
    },
    {
      label: 'Avg Service Time',
      value: averageServiceTime.toFixed(1),
      unit: 'h',
      description: 'Crane handling + dispatch',
    },
    {
      label: 'Simulation Horizon',
      value: simulationHours.toString(),
      unit: 'h',
      description: `${simulationHours / 24}-day rolling window`,
    },
    {
      label: 'Available Berths',
      value: availableBerths == null ? '—' : availableBerths.toString(),
      unit: availableBerths == null ? '' : 'BERTHS',
      description: availableBerths == null ? 'Not specified' : 'Configured for this scenario',
    },
  ];

  return (
    <section className="scenario-metrics" aria-label="Scenario metrics">
      {metrics.map((metric) => (
        <article className="scenario-metrics__card" key={metric.label}>
          <div className="scenario-metrics__card-header">
            <span className="scenario-metrics__label">{metric.label}</span>
          </div>

          <div className="scenario-metrics__value">
            <span>{metric.value}</span>
            <small>{metric.unit}</small>
          </div>

          <div className="scenario-metrics__description">{metric.description}</div>
        </article>
      ))}
    </section>
  );
};

export default ScenarioMetrics;
