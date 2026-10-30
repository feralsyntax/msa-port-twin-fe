import "./VesselSimulationUsage.scss";

interface VesselSimulationUsageProps {
  runCount: number;
  onViewSimulations: () => void;
}

const VesselSimulationUsage = ({
  runCount,
  onViewSimulations,
}: VesselSimulationUsageProps) => {
  return (
    <section className='vessel-simulation-usage'>
      <div className='vessel-simulation-usage__header'>
        <div>
          <span className='vessel-simulation-usage__eyebrow'>
            OPERATIONAL HISTORY
          </span>
          <h2>Simulation Usage</h2>
        </div>

        <span className='vessel-simulation-usage__count'>
          {runCount} {runCount === 1 ? "RUN" : "RUNS"} LOGGED
        </span>
      </div>

      <div className='vessel-simulation-usage__empty'>
        <div className='vessel-simulation-usage__icon'>
          <svg viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path
              d='M8 5.75C8 5.15 8.65 4.78 9.17 5.09L19 10.84C19.51 11.14 19.51 11.86 19 12.16L9.17 17.91C8.65 18.22 8 17.85 8 17.25V5.75Z'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinejoin='round'
            />
          </svg>
        </div>

        <h3>No simulation history</h3>

        <p>
          This vessel has not been included in any completed simulations yet.
        </p>

        <button
          type='button'
          className='vessel-simulation-usage__link'
          onClick={onViewSimulations}
        >
          View Simulations
          <svg viewBox='0 0 20 20' fill='none' aria-hidden='true'>
            <path
              d='M4.167 10H15.833M15.833 10L10 4.167M15.833 10L10 15.833'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default VesselSimulationUsage;
