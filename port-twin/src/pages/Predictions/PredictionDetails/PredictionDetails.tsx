import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ServerErrors from '../../../components/errors/ServerErrors';
import PredictionDetailsHeader from '../../../components/Predictions/PredictionDetails/PredictionDetailsHeader/PredictionDetailsHeader';
import { useGetMarinePredictionDetails } from '../../../hooks/predictions/useGetMarinePredictionDetails';
import { guardMarineForecast, guardMarineGrid } from '../../../utils/apiDataGuards';
import { parseApiError } from '../../../utils/apiError';
import { routes } from '../../../utils/routes';

import './PredictionDetails.scss';

interface PredictionResultDataProps {
  resultData: unknown;
}

const PredictionResultData = ({ resultData }: PredictionResultDataProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="prediction-details-page__result-card">
      <h2>Generated result data</h2>
      <button
        type="button"
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((expanded) => !expanded)}
      >
        {isExpanded ? 'Hide result data' : 'View generated result data'}
      </button>
      {isExpanded && (
        <pre className="prediction-details-page__result-data">
          {JSON.stringify(resultData, null, 2)}
        </pre>
      )}
    </section>
  );
};

const formatDateTime = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
};

export const PredictionDetailsPage = () => {
  const { predictionId } = useParams<{ predictionId: string }>();
  const navigate = useNavigate();
  const { data, isPending, isError, error, isFetching, refetch } =
    useGetMarinePredictionDetails(predictionId);

  const parsedError = isError ? parseApiError(error) : null;
  const grid = data ? guardMarineGrid(data.grid) : null;
  const forecast = data ? guardMarineForecast(data.forecast) : null;
  const hasResultData = data?.result_data !== null && data?.result_data !== undefined;
  const displayId = data?.id ?? predictionId ?? 'Prediction';

  return (
    <div className="prediction-details-page">
      <PredictionDetailsHeader predictionId={displayId} />

      <main className="prediction-details-page__content">
        {isPending || isError ? (
          <ServerErrors
            isPending={isPending}
            isError={isError}
            isFetching={isFetching}
            parsedError={parsedError}
            refetch={refetch}
            requestedData="prediction"
            noData={false}
          />
        ) : data ? (
          <>
            <div className="prediction-details-page__status-header">
              <div className="prediction-details-page__identity">
                <h1>{data.id}</h1>
                <span
                  className={`prediction-details-page__status prediction-details-page__status--${data.status}`}
                >
                  <span />
                  {data.status}
                </span>
              </div>
            </div>

            {data.status === 'failed' ? (
              <section className="prediction-details-page__failure" role="alert">
                <h2>Prediction failed</h2>
                <p>
                  {data.error_message ||
                    'The backend did not provide an error message for this failed prediction.'}
                </p>
                <button type="button" onClick={() => navigate(routes.predictionNew())}>
                  Retry
                </button>
              </section>
            ) : hasResultData ? (
              <PredictionResultData resultData={data.result_data} />
            ) : (
              <section className="prediction-details-page__failure" role="status">
                <h2>No result data returned</h2>
                <p>
                  This prediction is marked completed, but the backend did not return generated
                  result data. No result is shown.
                </p>
                <button type="button" onClick={() => navigate(routes.predictionNew())}>
                  Retry
                </button>
              </section>
            )}

            <section className="prediction-details-page__metadata-card">
              <h2>Prediction metadata</h2>
              <dl className="prediction-details-page__metadata-list">
                <div>
                  <dt>Model version</dt>
                  <dd>{data.model_version || 'Unavailable'}</dd>
                </div>
                <div>
                  <dt>Created</dt>
                  <dd>{formatDateTime(data.created_at)}</dd>
                </div>
                <div>
                  <dt>Forecast start</dt>
                  <dd>
                    {forecast?.recognised
                      ? formatDateTime(forecast.value.start_time)
                      : 'Unavailable'}
                  </dd>
                </div>
                <div>
                  <dt>Area bounds</dt>
                  <dd>
                    {grid?.recognised
                      ? `W ${grid.value.west}, S ${grid.value.south}, E ${grid.value.east}, N ${grid.value.north}`
                      : 'Unavailable'}
                  </dd>
                </div>
                <div>
                  <dt>Grid size</dt>
                  <dd>
                    {grid?.recognised ? `${grid.value.nx} × ${grid.value.ny}` : 'Unavailable'}
                  </dd>
                </div>
                <div>
                  <dt>CRS</dt>
                  <dd>{grid?.recognised ? (grid.value.crs ?? 'Unavailable') : 'Unavailable'}</dd>
                </div>
              </dl>
            </section>
          </>
        ) : null}
      </main>
    </div>
  );
};

export default PredictionDetailsPage;
