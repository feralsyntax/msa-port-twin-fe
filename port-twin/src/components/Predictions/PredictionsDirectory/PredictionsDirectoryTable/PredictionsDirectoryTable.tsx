import type { MarinePrediction } from '../types/predictions-directory.types';
import { guardMarineGrid, guardRecord } from '../../../../utils/apiDataGuards';
import ProvenanceBadge from '../../../Common/ProvenanceBadge/ProvenanceBadge';
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
        <p>No predictions with this status on the current page.</p>
      </div>
    );
  }

  const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    return Number.isNaN(date.getTime()) ? createdAt : date.toLocaleString();
  };

  return (
    <div className="predictions-directory-table__scroll">
      <table className="predictions-directory-table">
        <thead>
          <tr>
            <th className="predictions-directory-table__id-column">Prediction ID</th>
            <th>Area Covered</th>
            <th>Grid Size</th>
            <th className="predictions-directory-table__status-column">Status</th>
            <th>Model Version</th>
            <th>Prediction Mode</th>
            <th className="predictions-directory-table__created-column">Created</th>
            <th>Error</th>
          </tr>
        </thead>

        <tbody>
          {predictions.map((prediction) => {
            const grid = guardMarineGrid(prediction.grid);
            const record = guardRecord(prediction);
            const predictionMode =
              record.recognised && typeof record.value.prediction_mode === 'string'
                ? record.value.prediction_mode
                : '—';
            const areaCovered = grid.recognised
              ? `${grid.value.west}, ${grid.value.south} to ${grid.value.east}, ${grid.value.north}`
              : '—';
            const gridSize = grid.recognised ? `${grid.value.nx} × ${grid.value.ny}` : '—';

            return (
              <tr
                key={prediction.id}
                className="predictions-directory-table__row"
                tabIndex={0}
                aria-label={`Open prediction ${prediction.id}`}
                onClick={() => onSelectPrediction(prediction.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelectPrediction(prediction.id);
                  }
                }}
              >
                <td>
                  <span className="predictions-directory-table__id">
                    <span
                      className={`predictions-directory-table__indicator predictions-directory-table__indicator--${prediction.status}`}
                    />
                    <span>{prediction.id}</span>
                  </span>
                </td>
                <td>
                  <span className="predictions-directory-table__extent">{areaCovered}</span>
                </td>
                <td>{gridSize}</td>
                <td>
                  <span
                    className={`predictions-directory-table__status predictions-directory-table__status--${prediction.status}`}
                  >
                    {prediction.status}
                  </span>
                  {prediction.status === 'completed' && (
                    <span className="predictions-directory-table__provenance">
                      <ProvenanceBadge value={prediction} context="prediction" />
                    </span>
                  )}
                </td>
                <td>{prediction.model_version || '—'}</td>
                <td>{predictionMode}</td>
                <td className="predictions-directory-table__created">
                  {formatCreatedAt(prediction.created_at)}
                </td>
                <td className="predictions-directory-table__error">
                  {prediction.status === 'failed'
                    ? prediction.error_message || 'No error message provided.'
                    : '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionsDirectoryTable;
