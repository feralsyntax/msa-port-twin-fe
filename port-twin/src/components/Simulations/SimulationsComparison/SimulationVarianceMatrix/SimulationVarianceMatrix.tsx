import './SimulationVarianceMatrix.scss';

export interface SimulationVarianceRow {
  metric: string;
  runA: string;
  runB: string;
  delta: string;
  tone: 'moss' | 'coral' | 'amber' | 'neutral';
}

interface SimulationVarianceMatrixProps {
  rows: SimulationVarianceRow[];
}

const SimulationVarianceMatrix = ({ rows }: SimulationVarianceMatrixProps) => {
  return (
    <section className="simulation-variance-matrix">
      <div className="simulation-variance-matrix__heading">
        <span>Detailed Variance Matrix</span>
        <span>Values Audited Per Discrete Event Engine</span>
      </div>

      <div
        className="simulation-variance-matrix__scroll"
        role="region"
        aria-label="Simulation comparison variance matrix"
        tabIndex={0}
      >
        <table>
          <thead>
            <tr>
              <th scope="col">Metric</th>
              <th scope="col">Run A (Baseline)</th>
              <th scope="col">Run B (Alternative)</th>
              <th scope="col">Delta</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.metric}>
                <td>{row.metric}</td>
                <td>{row.runA}</td>
                <td>{row.runB}</td>
                <td
                  className={`simulation-variance-matrix__delta simulation-variance-matrix__delta--${row.tone}`}
                >
                  {row.delta}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SimulationVarianceMatrix;
