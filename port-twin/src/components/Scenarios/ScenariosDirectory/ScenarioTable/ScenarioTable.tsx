import './ScenarioTable.scss';

export interface Scenario {
  id: string;
  name: string;
  status: 'ready' | 'draft';
  created: string;
  updated: string;
}

interface ScenarioTableProps {
  scenarios: Scenario[];
}

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
                  <td className="scenario-table__name">{scenario.name}</td>

                  <td>
                    <span
                      className={`scenario-table__status scenario-table__status--${scenario.status}`}
                    >
                      {scenario.status}
                    </span>
                  </td>

                  <td className="scenario-table__date">{scenario.created}</td>

                  <td className="scenario-table__date">{scenario.updated}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="scenario-table__empty">
                  No scenarios found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="scenario-table__spacer" />
    </div>
  );
};

export default ScenarioTable;
