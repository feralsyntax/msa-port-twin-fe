import type { Simulation } from '../types/simulations.types';

import './SimulationsDirectoryTable.scss';

interface SimulationsTableProps {
  simulations: Simulation[];
}

const SimulationsTable = ({ simulations }: SimulationsTableProps) => {
  return (
    <div className="simulations-table">
      <table>
        <thead>
          <tr>
            <th className="simulations-table__run-column">
              <div className="simulations-table__heading">
                <span>Run ID</span>
                <span className="simulations-table__simulated-label">◇ Simulated</span>
              </div>
            </th>

            <th className="simulations-table__scenario-column">Scenario</th>

            <th className="simulations-table__status-column">Status</th>

            <th className="simulations-table__started-column">Started</th>
          </tr>
        </thead>

        <tbody>
          {simulations.length > 0 ? (
            simulations.map((simulation) => (
              <tr key={simulation.id}>
                <td className="simulations-table__run-id">
                  <div>
                    <span className="simulations-table__hash">#</span>
                    <span>{simulation.id}</span>
                  </div>
                </td>

                <td className="simulations-table__scenario">{simulation.scenarioName}</td>

                <td>
                  <span
                    className={`simulations-table__status simulations-table__status--${simulation.status}`}
                  >
                    {simulation.status === 'running' && (
                      <span className="simulations-table__pulse">
                        <span />
                      </span>
                    )}

                    {simulation.status}
                  </span>
                </td>

                <td className="simulations-table__started">{simulation.startedAt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="simulations-table__empty">
                No simulations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SimulationsTable;
