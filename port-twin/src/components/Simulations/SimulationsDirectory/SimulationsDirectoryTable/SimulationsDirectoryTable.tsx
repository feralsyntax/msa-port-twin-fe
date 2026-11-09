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
  if (simulations.length === 0) {
    return (
      <div className="simulations-directory-table__empty">
        <span>No simulations found.</span>
      </div>
    );
  }

  return (
    <div className="simulations-directory-table__wrapper">
      <table className="simulations-directory-table">
        <thead>
          <tr>
            <th>Run ID</th>
            <th>Scenario</th>
            <th>Status</th>
            <th>Started</th>
          </tr>
        </thead>

        <tbody>
          {simulations.map((simulation) => {
            const status = simulation.status ?? 'pending';

            return (
              <tr key={simulation.id}>
                <td className="simulations-directory-table__id">{simulation.id}</td>

                <td className="simulations-directory-table__scenario">
                  {simulation.scenario_name}
                </td>

                <td>
                  <span
                    className={`simulations-directory-table__status simulations-directory-table__status--${status}`}
                  >
                    {status.replace('_', ' ')}
                  </span>
                </td>

                <td className="simulations-directory-table__date">
                  {formatDate(simulation.started_at ?? simulation.created_at)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SimulationsDirectoryTable;
