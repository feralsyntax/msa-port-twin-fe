import { Link } from 'react-router-dom';
import type { ScenarioResponse } from '../../../../api/models';
import './ScenarioTable.scss';

interface ScenarioTableProps {
  scenarios: ScenarioResponse[];
  isLoading?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
}

const formatScenarioDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
};

const ScenarioTable = ({
  scenarios,
  isLoading = false,
  errorMessage,
  onRetry,
}: ScenarioTableProps) => {
  const renderTableMessage = (message: string) => (
    <tr>
      <td colSpan={4} className="scenario-table__empty">
        {message}
      </td>
    </tr>
  );

  return (
    <div className="scenario-table">
      <div className="scenario-table__scroll">
        <table>
          <thead>
            <tr>
              <th scope="col" className="scenario-table__name-column">
                Scenario Name
              </th>

              <th scope="col" className="scenario-table__status-column">
                Status
              </th>

              <th scope="col" className="scenario-table__date-column">
                Created
              </th>

              <th scope="col" className="scenario-table__date-column">
                Updated
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              renderTableMessage('Loading scenarios...')
            ) : errorMessage ? (
              <tr>
                <td colSpan={4} className="scenario-table__empty">
                  <div className="scenario-table__error alert">
                    <span>{errorMessage}</span>

                    {onRetry && (
                      <button type="button" onClick={onRetry}>
                        <span className="material-symbols-outlined">refresh</span>
                        <span>Retry</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : scenarios.length > 0 ? (
              scenarios.map((scenario) => (
                <tr key={scenario.id}>
                  <td className="scenario-table__name">
                    <Link to={`/app/scenarios/${scenario.id}`}>{scenario.name}</Link>
                  </td>

                  <td>
                    <span
                      className={`scenario-table__status scenario-table__status--${scenario.status}`}
                    >
                      {scenario.status}
                    </span>
                  </td>

                  <td className="scenario-table__date">
                    {formatScenarioDate(scenario.created_at)}
                  </td>

                  <td className="scenario-table__date">
                    {formatScenarioDate(scenario.updated_at)}
                  </td>
                </tr>
              ))
            ) : (
              renderTableMessage('No scenarios found.')
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScenarioTable;
