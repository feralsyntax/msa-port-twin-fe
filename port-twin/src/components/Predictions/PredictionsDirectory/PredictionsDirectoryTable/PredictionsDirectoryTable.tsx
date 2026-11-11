import type { MarinePrediction } from '../types/predictions-directory.types';
import './PredictionsDirectoryTable.scss';

interface PredictionsDirectoryTableProps {
  predictions: MarinePrediction[];
  onSelectPrediction: (predictionId: string) => void;
}

const PredictionsDirectoryTable = ({
  predictions,
  onSelectPrediction,
}: PredictionsDirectoryTableProps) => {
  if (predictions.length === 0) {
    return (
      <div className="predictions-directory-table__empty">
        <span className="material-symbols-outlined" aria-hidden="true">
          query_stats
        </span>
        <p>No predictions found for this status.</p>
      </div>
    );
  }

  return (
    <div className="predictions-directory-table__scroll">
      <table className="predictions-directory-table">
        <thead>
          <tr>
            <th className="predictions-directory-table__id-column">Prediction ID</th>
            <th>Grid Extent</th>
            <th className="predictions-directory-table__status-column">Status</th>
            <th className="predictions-directory-table__created-column">Created</th>
          </tr>
        </thead>

        <tbody>
          {predictions.map((prediction) => (
            <tr key={prediction.id}>
              <td>
                <button
                  className="predictions-directory-table__id"
                  type="button"
                  onClick={() => onSelectPrediction(prediction.id)}
                >
                  <span
                    className={`predictions-directory-table__indicator predictions-directory-table__indicator--${prediction.status}`}
                  />
                  <span>{prediction.id}</span>
                </button>
              </td>

              <td>
                <span className="predictions-directory-table__extent">{prediction.gridExtent}</span>
                <span className="predictions-directory-table__separator">·</span>
                <span className="predictions-directory-table__resolution">
                  {prediction.resolution}
                </span>
              </td>

              <td>
                <span
                  className={`predictions-directory-table__status predictions-directory-table__status--${prediction.status}`}
                >
                  {prediction.status}
                </span>
              </td>

              <td className="predictions-directory-table__created">{prediction.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionsDirectoryTable;
