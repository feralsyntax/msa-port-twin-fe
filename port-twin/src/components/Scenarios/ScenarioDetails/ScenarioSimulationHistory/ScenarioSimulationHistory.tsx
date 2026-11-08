import { Link } from 'react-router-dom';

import './ScenarioSimulationHistory.scss';

export interface ScenarioSimulation {
  id: string;
  status: 'completed' | 'failed' | 'pending' | 'running';
  executedAt: string;
}

interface ScenarioSimulationHistoryProps {
  simulations: ScenarioSimulation[];
  totalRuns: number;
}

const ScenarioSimulationHistory = ({ simulations, totalRuns }: ScenarioSimulationHistoryProps) => {
  return (
    <section className="scenario-simulation-history">
      <div className="scenario-simulation-history__content">
        <div className="scenario-simulation-history__header">
          <h2>Simulations using this Scenario</h2>
        </div>

        <p className="scenario-simulation-history__subtitle">Recent batch execution history</p>

        <div className="scenario-simulation-history__list">
          {simulations.length > 0 ? (
            simulations.map((simulation) => (
              <div className="scenario-simulation-history__row" key={simulation.id}>
                <div className="scenario-simulation-history__identity">
                  <span className="scenario-simulation-history__id">{simulation.id}</span>

                  <span
                    className={`scenario-simulation-history__status scenario-simulation-history__status--${simulation.status}`}
                  >
                    {simulation.status}
                  </span>
                </div>

                <time
                  className="scenario-simulation-history__date"
                  dateTime={simulation.executedAt}
                >
                  {new Intl.DateTimeFormat('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  }).format(new Date(simulation.executedAt))}
                </time>
              </div>
            ))
          ) : (
            <div className="scenario-simulation-history__empty">
              No simulations have been run using this scenario yet.
            </div>
          )}
        </div>
      </div>

      <footer className="scenario-simulation-history__footer">
        <span>
          {simulations.length} of {totalRuns} TOTAL RUNS
        </span>

        <Link to="/app/simulations">
          View all runs
          <span aria-hidden="true">→</span>
        </Link>
      </footer>
    </section>
  );
};

export default ScenarioSimulationHistory;
