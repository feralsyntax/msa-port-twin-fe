import './ScenarioMetrics.scss';

interface ScenarioMetricsProps {
  expectedArrivals: number;
  arrivalInterval: number;
  averageServiceTime: number;
  simulationHours: number;
  availableBerths: number;
  totalBerths: number;
  activeBerthNames: string[];
}

const ScenarioMetrics = ({
  expectedArrivals,
  arrivalInterval,
  averageServiceTime,
  simulationHours,
  availableBerths,
  totalBerths,
  activeBerthNames,
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
      value: availableBerths.toString(),
      unit: `/ ${totalBerths} TOTAL`,
      description: activeBerthNames.join(', '),
      measured: true,
    },
  ];

  return (
    <section className="scenario-metrics" aria-label="Scenario metrics">
      {metrics.map((metric) => (
        <article className="scenario-metrics__card" key={metric.label}>
          <div className="scenario-metrics__card-header">
            <span className="scenario-metrics__label">{metric.label}</span>

            {metric.measured && (
              <span className="scenario-metrics__measured">
                <span aria-hidden="true">●</span>
                Measured Infrastructure
              </span>
            )}
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
