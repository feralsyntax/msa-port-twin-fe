import { Link } from 'react-router-dom';
import type { ScenarioResponse } from '../../../../api/models';
import './ScenarioTable.scss';
import { routes } from '../../../../utils/routes';

interface ScenarioTableProps {
  scenarios: ScenarioResponse[];
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

const ScenarioTable = ({ scenarios }: ScenarioTableProps) => {
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
            {scenarios.length > 0 ? (
              scenarios.map((scenario) => (
                <tr key={scenario.id}>
                  <td className="scenario-table__name">
                    <Link to={routes.scenarioDetails(scenario.id)}>{scenario.name}</Link>
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
              <tr>
                <td colSpan={4} className="scenario-table__empty">
                  No scenarios match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScenarioTable;
