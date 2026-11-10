import { Link } from 'react-router-dom';
import type { SimulationHistoryItem } from '../../../../api/models';

import './SimulationsDirectoryTable.scss';

interface SimulationsDirectoryTableProps {
  simulations: SimulationHistoryItem[];
}

const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return '—';

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return '—';

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
};

const SimulationsDirectoryTable = ({ simulations }: SimulationsDirectoryTableProps) => {
  return (
    <div className="simulations-directory-table__wrapper">
      {simulations.length === 0 ? (
        <div className="simulations-directory-table__empty">No simulations found.</div>
      ) : (
        <table className="simulations-directory-table">
          <thead>
            <tr>
              <th className="simulations-directory-table__run-column" scope="col">
                <div className="simulations-directory-table__heading">
                  <span>RUN ID</span>

                  <span className="simulations-directory-table__simulated-label">◇ SIMULATED</span>
                </div>
              </th>

              <th className="simulations-directory-table__scenario-column" scope="col">
                SCENARIO
              </th>

              <th className="simulations-directory-table__status-column" scope="col">
                STATUS
              </th>

              <th className="simulations-directory-table__started-column" scope="col">
                STARTED
              </th>
            </tr>
          </thead>

          <tbody>
            {simulations.map((simulation) => {
              const status = simulation.status ?? 'pending';

              return (
                <tr
                  key={simulation.id}
                  className={
                    status === 'running' ? 'simulations-directory-table__row--running' : undefined
                  }
                >
                  <td className="simulations-directory-table__run-id">
                    <div>
                      <span className="simulations-directory-table__hash">#</span>
                      <span className="simulations-directory-table__id">
                        <Link to={`/app/simulations/${simulation.id}`}>{simulation.id}</Link>
                      </span>
                    </div>
                  </td>

                  <td className="simulations-directory-table__scenario">
                    {simulation.scenario_name}
                  </td>

                  <td>
                    <span
                      className={`simulations-directory-table__status simulations-directory-table__status--${status}`}
                    >
                      {status === 'running' && (
                        <span className="simulations-directory-table__pulse">
                          <span />
                        </span>
                      )}

                      {status.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="simulations-directory-table__started">
                    {formatDate(simulation.started_at ?? simulation.created_at)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SimulationsDirectoryTable;
