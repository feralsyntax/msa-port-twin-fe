import './SimulationIdentityHeader.scss';

interface SimulationIdentityHeaderProps {
  simulation: {
    id: string;
    scenario_name: string;
    status: string;
    started_at: string | null;
    completed_at: string | null;
    created_at: string;
  };
}

const formatDate = (value: string | null) => {
  if (!value) return 'Not available';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return 'Not available';

  return new Intl.DateTimeFormat('en-KE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

const SimulationIdentityHeader = ({ simulation }: SimulationIdentityHeaderProps) => {
  const status = simulation.status.toLowerCase();

  const displayStatus = status.charAt(0).toUpperCase() + status.slice(1);

  const runDate = simulation.completed_at ?? simulation.started_at ?? simulation.created_at;

  return (
    <section className="sim-identity">
      <div className="sim-identity__title-row">
        <h1 className="sim-identity__id">{simulation.id}</h1>

        <span className={`sim-identity__status sim-identity__status--${status}`}>
          {displayStatus}
        </span>
      </div>

      <p className="sim-identity__meta">
        <span>{simulation.scenario_name}</span>
        <span className="sim-identity__dot">·</span>
        <span>Run on {formatDate(runDate)}</span>
      </p>
    </section>
  );
};

export default SimulationIdentityHeader;
