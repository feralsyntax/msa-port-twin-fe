import './ScenarioParameters.scss';

interface ScenarioParametersProps {
  arrivalInterval: number;
  averageServiceTime: number;
  simulationHours: number;
  expectedArrivals: number;
  availableBerthNames: string[];
  createdAt: string;
  updatedAt: string;
}

const formatDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  }).format(date);
};

const ScenarioParameters = ({
  arrivalInterval,
  averageServiceTime,
  simulationHours,
  expectedArrivals,
  availableBerthNames,
  createdAt,
  updatedAt,
}: ScenarioParametersProps) => {
  const parameters = [
    {
      label: 'Arrival Interval',
      value: `${arrivalInterval} hrs (mean spacing)`,
    },
    {
      label: 'Average Service Time',
      value: `${averageServiceTime.toFixed(1)} hrs per vessel`,
    },
    {
      label: 'Simulation Hours',
      value: `${simulationHours.toFixed(1)} hrs`,
    },
    {
      label: 'Expected Arrivals',
      value: `${expectedArrivals} vessels`,
    },
    {
      label: 'Available Berths',
      value: availableBerthNames.join(', '),
    },
  ];

  return (
    <section className="scenario-parameters">
      <div className="scenario-parameters__header">
        <h2>Parameters</h2>
      </div>

      <dl className="scenario-parameters__list">
        {parameters.map((parameter) => (
          <div className="scenario-parameters__row" key={parameter.label}>
            <dt>
              <span aria-hidden="true" />
              {parameter.label}
            </dt>

            <dd>{parameter.value}</dd>
          </div>
        ))}
      </dl>

      <footer className="scenario-parameters__metadata">
        <div className="scenario-parameters__dates">
          <span>
            CREATED: <strong>{formatDate(createdAt)}</strong>
          </span>

          <span>
            UPDATED: <strong>{formatDate(updatedAt)}</strong>
          </span>
        </div>
      </footer>
    </section>
  );
};

export default ScenarioParameters;
