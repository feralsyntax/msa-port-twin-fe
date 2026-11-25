import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import PredictedWaterFlow from '../../../components/Predictions/PredictionDetails/PredictedWaterFlow/PredictedWaterFlow';
import PredictionTargetGrid from '../../../components/Predictions/PredictionDetails/PredictionTargetGrid/PredictionTargetGrid';
import PredictionForecastWindow from '../../../components/Predictions/PredictionDetails/PredictionForecastWindow/PredictionForecastWindow';
import PredictionPeakFlow from '../../../components/Predictions/PredictionDetails/PredictionPeakFlow/PredictionPeakFlow';
import './PredictionDetails.scss';
import PredictionDetailsHeader from '../../../components/Predictions/PredictionDetails/PredictionDetailsHeader/PredictionDetailsHeader';
import { useGetMarinePredictionDetails } from '../../../hooks/predictions/useGetMarinePredictionDetails';
import { useGetMarinePredictionStatus } from '../../../hooks/predictions/useGetMarinePredictionStatus';
import { parseApiError } from '../../../utils/apiError';
import {
  guardMarineForecast,
  guardMarineGrid,
  guardMarinePredictionResult,
  guardRecord,
} from '../../../utils/apiDataGuards';
import type { MarinePredictionResultData } from '../../../utils/apiDataGuards';
import ServerErrors from '../../../components/errors/ServerErrors';

const isTerminalStatus = (status: string | undefined) =>
  status === 'completed' || status === 'failed';

const readPositiveNumber = (value: unknown): number | undefined =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : undefined;

const readPositiveInteger = (value: unknown): number | undefined =>
  typeof value === 'number' && Number.isInteger(value) && value > 0 ? value : undefined;

const readString = (value: unknown): string =>
  typeof value === 'string' && value.trim() ? value : 'Not available';

const formatUtcDateTime = (value: string | undefined): string => {
  if (!value) return 'Not available';

  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return 'Not available';

  return `${new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(timestamp)} UTC`;
};

const formatCoordinate = (value: number): string => `${Number(value.toFixed(4))}°`;

const findPeakCurrent = (
  result: MarinePredictionResultData,
  stepIntervalHours: number | undefined,
) => {
  let peakSpeed = 0;
  let peakStep = 0;

  result.current_u_ms.forEach((frame, step) => {
    frame.forEach((row, y) => {
      row.forEach((u, x) => {
        const speed = Math.hypot(u, result.current_v_ms[step][y][x]);
        if (speed > peakSpeed) {
          peakSpeed = speed;
          peakStep = step;
        }
      });
    });
  });

  const stepLabel =
    stepIntervalHours === undefined
      ? `Step ${peakStep + 1}`
      : `T+${Number(((peakStep + 1) * stepIntervalHours).toFixed(2))} h`;

  return { speed: `${peakSpeed.toFixed(2)} m/s`, stepLabel };
};

export const PredictionDetailsPage = () => {
  const { predictionId } = useParams<{ predictionId: string }>();
  const detailsQuery = useGetMarinePredictionDetails(predictionId);
  const shouldPollStatus = Boolean(detailsQuery.data) && !isTerminalStatus(detailsQuery.data?.status);
  const statusQuery = useGetMarinePredictionStatus(shouldPollStatus ? predictionId : undefined);
  const prediction =
    detailsQuery.data && statusQuery.data
      ? { ...detailsQuery.data, ...statusQuery.data }
      : (statusQuery.data ?? detailsQuery.data);

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const record = guardRecord(prediction);
  const predictionFields = record.recognised ? record.value : {};
  const forecast = prediction ? guardMarineForecast(prediction.forecast) : null;
  const forecastFields = prediction ? guardRecord(prediction.forecast) : null;
  const grid = prediction ? guardMarineGrid(prediction.grid) : null;
  const rawResultData = prediction?.result_data;
  const result = useMemo(
    () => (rawResultData === undefined ? null : guardMarinePredictionResult(rawResultData)),
    [rawResultData],
  );

  const resultSteps = result?.recognised ? result.value.water_level_m.length : 0;
  const forecastSteps = forecastFields?.recognised
    ? readPositiveInteger(forecastFields.value.steps)
    : undefined;
  const forecastHorizonHours = readPositiveNumber(predictionFields.forecast_horizon_hours);
  const stepSeconds = forecastFields?.recognised
    ? readPositiveNumber(forecastFields.value.step_seconds)
    : undefined;
  const stepIntervalHours =
    stepSeconds !== undefined
      ? stepSeconds / 3600
      : forecastHorizonHours !== undefined && (forecastSteps ?? resultSteps) > 0
        ? forecastHorizonHours / (forecastSteps ?? resultSteps)
        : undefined;
  const hasStepMismatch =
    result?.recognised && forecastSteps !== undefined && forecastSteps !== resultSteps;
  const canShowResult =
    prediction?.status === 'completed' &&
    result?.recognised === true &&
    resultSteps > 0 &&
    !hasStepMismatch;
  const totalSteps = canShowResult ? resultSteps : 0;
  const activeStep = totalSteps > 0 ? Math.min(currentStep, totalSteps - 1) : 0;
  const startTime =
    forecast?.recognised && Number.isFinite(Date.parse(forecast.value.start_time))
      ? forecast.value.start_time
      : undefined;
  const displaySteps = result?.recognised ? resultSteps : forecastSteps;

  useEffect(() => {
    if (!isPlaying || totalSteps < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentStep((previousStep) => (previousStep >= totalSteps - 1 ? 0 : previousStep + 1));
    }, 600);

    return () => window.clearInterval(interval);
  }, [isPlaying, totalSteps]);

  const handleStepChange = (step: number) => {
    setCurrentStep(Math.min(totalSteps - 1, Math.max(0, step)));
  };

  const handlePlayPause = () => {
    setIsPlaying((previousState) => !previousState);
  };

  const isError = detailsQuery.isError || (shouldPollStatus && statusQuery.isError);
  const isPending =
    Boolean(predictionId) &&
    (detailsQuery.isPending || (shouldPollStatus && statusQuery.isPending));
  const isFetching =
    detailsQuery.isFetching || (shouldPollStatus && statusQuery.isFetching);
  const queryError = detailsQuery.isError ? detailsQuery.error : statusQuery.error;
  const parsedError = isError ? parseApiError(queryError) : null;
  const refetch = statusQuery.isError ? statusQuery.refetch : detailsQuery.refetch;
  const gridInfo = grid?.recognised ? grid.value : undefined;
  const area = gridInfo
    ? `W ${formatCoordinate(gridInfo.west)}, S ${formatCoordinate(gridInfo.south)}, E ${formatCoordinate(gridInfo.east)}, N ${formatCoordinate(gridInfo.north)}`
    : 'Not available';
  const gridSize = gridInfo ? `${gridInfo.nx} × ${gridInfo.ny}` : 'Not available';
  const crs = gridInfo?.crs ?? 'Not available';
  const status = prediction?.status ?? 'unknown';
  const statusClass =
    status === 'completed' ? 'completed' : status === 'failed' ? 'failed' : 'pending';
  const peakCurrent = useMemo(
    () =>
      canShowResult && result?.recognised
        ? findPeakCurrent(result.value, stepIntervalHours)
        : null,
    [canShowResult, result, stepIntervalHours],
  );
  const modelError =
    typeof predictionFields.error_message === 'string' && predictionFields.error_message.trim()
      ? predictionFields.error_message
      : 'The model did not provide an error message.';

  return (
    <div className="prediction-details-page">
      <PredictionDetailsHeader predictionId={predictionId ?? 'Prediction'} />

      {isPending || isError || !prediction ? (
        <main className="prediction-details-page__content">
          <ServerErrors
            isPending={isPending}
            isError={isError}
            isFetching={isFetching}
            parsedError={parsedError}
            refetch={refetch}
            requestedData="prediction"
            noData={!predictionId || (!isPending && !isError && !prediction)}
          />
        </main>
      ) : (
        <main className="prediction-details-page__content">
          <div className="prediction-details-page__status-header">
            <div className="prediction-details-page__identity">
              <h1>{prediction.id}</h1>

              <span
                className={`prediction-details-page__status prediction-details-page__status--${statusClass}`}
              >
                <span />
                {status.replace(/_/g, ' ')}
              </span>
            </div>
          </div>

          <div className="prediction-details-page__grid">
            <div className="prediction-details-page__visualization">
              {status === 'failed' ? (
                <div className="prediction-details-page__state-message prediction-details-page__state-message--failed" role="alert">
                  <h2>Prediction failed</h2>
                  <p>{modelError}</p>
                </div>
              ) : status !== 'completed' ? (
                <div className="prediction-details-page__state-message" role="status">
                  <h2>Prediction is in progress</h2>
                  <p>This page checks for updates automatically.</p>
                </div>
              ) : !result?.recognised ? (
                <div className="prediction-details-page__state-message" role="alert">
                  <h2>Prediction output is unavailable</h2>
                  <p>The returned water-level and current grids are missing or malformed.</p>
                </div>
              ) : hasStepMismatch ? (
                <div className="prediction-details-page__state-message" role="alert">
                  <h2>Prediction output is inconsistent</h2>
                  <p>
                    The forecast declares {forecastSteps} steps, but the result contains {resultSteps}{' '}
                    frames. No visualization is shown.
                  </p>
                </div>
              ) : (
                <PredictedWaterFlow
                  result={result.value}
                  currentStep={activeStep}
                  totalSteps={totalSteps}
                  startTime={startTime}
                  stepIntervalHours={stepIntervalHours}
                  isPlaying={isPlaying}
                  onStepChange={handleStepChange}
                  onPlayPause={handlePlayPause}
                />
              )}
            </div>

            <aside className="prediction-details-page__metadata">
              <PredictionTargetGrid area={area} gridSize={gridSize} crs={crs} />

              <PredictionForecastWindow
                startTime={formatUtcDateTime(startTime)}
                timeSteps={displaySteps === undefined ? 'Not available' : String(displaySteps)}
                interval={
                  stepIntervalHours === undefined
                    ? 'Not available'
                    : `${Number(stepIntervalHours.toFixed(4))} h`
                }
                horizon={
                  forecastHorizonHours === undefined
                    ? 'Not available'
                    : `${forecastHorizonHours} h`
                }
                modelVersion={readString(predictionFields.model_version)}
                contractVersion={readString(predictionFields.contract_version)}
                predictionMode={readString(predictionFields.prediction_mode)}
                modelStatus={readString(predictionFields.model_status)}
                createdAt={formatUtcDateTime(prediction.created_at)}
              />

              {peakCurrent && (
                <PredictionPeakFlow value={peakCurrent.speed} stepLabel={peakCurrent.stepLabel} />
              )}
            </aside>
          </div>
        </main>
      )}
    </div>
  );
};

export default PredictionDetailsPage;
