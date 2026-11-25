import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { BerthOperationalStatusEnum } from '../../api/models';
import type { Berth, SimulationHistoryItem } from '../../api/models';
import ProvenanceBadge from '../../components/Common/ProvenanceBadge/ProvenanceBadge';
import PredictedWaterFlow from '../../components/Predictions/PredictionDetails/PredictedWaterFlow/PredictedWaterFlow';
import ServerErrors from '../../components/errors/ServerErrors';
import { useGetAllBerths } from '../../hooks/berths/useGetAllBerths';
import { useGetOverview } from '../../hooks/overview/useGetOverview';
import { useGetMarinePredictions } from '../../hooks/predictions/useGetMarinePredictions';
import useGetSimulationDetails from '../../hooks/simulations/useGetSimulationDetails';
import useGetSimulations from '../../hooks/simulations/useGetSimulations';
import { useGetAllVessels } from '../../hooks/vessels/useGetAllVessels';
import {
  guardMarineForecast,
  guardMarinePredictionResult,
  guardRecord,
} from '../../utils/apiDataGuards';
import { parseApiError } from '../../utils/apiError';
import { routes } from '../../utils/routes';
import './Dashboard.scss';

type BerthState = 'occupied' | 'free' | 'maintenance' | 'inactive' | 'unknown';

const berthStateLabels: Record<BerthState, string> = {
  occupied: 'Occupied',
  free: 'Free',
  maintenance: 'Maintenance',
  inactive: 'Inactive',
  unknown: 'Unknown',
};

const berthStates: BerthState[] = ['occupied', 'free', 'maintenance', 'inactive'];

const getBerthState = (berth: Berth): BerthState => {
  if (berth.status === BerthOperationalStatusEnum.maintenance) return 'maintenance';
  if (berth.status === BerthOperationalStatusEnum.inactive) return 'inactive';
  if (berth.status !== BerthOperationalStatusEnum.active) return 'unknown';
  return berth.is_occupied ? 'occupied' : 'free';
};

const getTimestamp = (value: string | null | undefined): number => {
  if (!value) return 0;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? timestamp : 0;
};

const formatTimestamp = (value: string | null | undefined): string => {
  if (!value) return 'Unavailable';

  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return 'Unavailable';

  return `${new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(timestamp)} UTC`;
};

const formatCount = (value: number): string =>
  Number.isFinite(value) ? new Intl.NumberFormat('en').format(value) : 'Unavailable';

const formatHours = (value: number): string =>
  Number.isFinite(value) ? `${value.toFixed(1)} h` : 'Unavailable';

const formatPercent = (value: number): string =>
  Number.isFinite(value) ? `${value.toFixed(1)}%` : 'Unavailable';

const readPositiveNumber = (value: unknown): number | undefined =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : undefined;

const noStepChange = () => undefined;
const noPlayPause = () => undefined;

interface KpiCardProps {
  label: string;
  value: string | null;
  source: unknown;
  context?: 'simulation';
  progress?: number;
  emptyMessage?: string;
}

const KpiCard = ({ label, value, source, context, progress, emptyMessage }: KpiCardProps) => (
  <article className="kpi-card">
    <div className="kpi-card__top">
      <span className="kpi-card__label">{label}</span>
      {value !== null && <ProvenanceBadge value={source} context={context} />}
    </div>

    <div className="kpi-card__value-row">
      {value === null ? (
        <span className="kpi-card__empty">{emptyMessage}</span>
      ) : (
        <span className="kpi-card__value">{value}</span>
      )}
      {progress !== undefined && (
        <div
          className="kpi-card__bar"
          role="progressbar"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div className="kpi-card__bar-fill" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  </article>
);

export default function Dashboard() {
  const overviewQuery = useGetOverview();
  const berthQuery = useGetAllBerths();
  const simulationListQuery = useGetSimulations();
  const predictionListQuery = useGetMarinePredictions(1, true);

  const latestSimulationId = overviewQuery.data?.latest_simulation_id ?? '';
  const latestSimulationQuery = useGetSimulationDetails(latestSimulationId);
  const vesselsQuery = useGetAllVessels(Boolean(latestSimulationId));

  const berths = useMemo(() => berthQuery.data ?? [], [berthQuery.data]);
  const vesselNameById = useMemo(
    () => new Map((vesselsQuery.data ?? []).map((vessel) => [vessel.id, vessel.name])),
    [vesselsQuery.data],
  );
  const berthNameById = useMemo(
    () => new Map(berths.map((berth) => [berth.id, berth.name])),
    [berths],
  );
  const berthCounts = useMemo(
    () =>
      berths.reduce<Record<BerthState, number>>(
        (counts, berth) => {
          counts[getBerthState(berth)] += 1;
          return counts;
        },
        { occupied: 0, free: 0, maintenance: 0, inactive: 0, unknown: 0 },
      ),
    [berths],
  );

  const recentSimulations = useMemo(
    () =>
      [...(simulationListQuery.data ?? [])]
        .sort((a, b) => getTimestamp(b.created_at) - getTimestamp(a.created_at))
        .slice(0, 4),
    [simulationListQuery.data],
  );
  const latestPrediction = useMemo(() => {
    const predictions = predictionListQuery.data?.results ?? [];
    return [...predictions].sort(
      (a, b) => getTimestamp(b.created_at) - getTimestamp(a.created_at),
    )[0];
  }, [predictionListQuery.data]);
  const predictionResult = useMemo(
    () => (latestPrediction ? guardMarinePredictionResult(latestPrediction.result_data) : null),
    [latestPrediction],
  );
  const hasPredictionOutput =
    latestPrediction?.status === 'completed' && predictionResult?.recognised === true;
  const predictionForecast = latestPrediction
    ? guardMarineForecast(latestPrediction.forecast)
    : null;
  const predictionForecastRecord = latestPrediction ? guardRecord(latestPrediction.forecast) : null;
  const predictionRecord = latestPrediction ? guardRecord(latestPrediction) : null;
  const predictionStartTime =
    predictionForecast?.recognised &&
    Number.isFinite(Date.parse(predictionForecast.value.start_time))
      ? predictionForecast.value.start_time
      : undefined;
  const stepSeconds = predictionForecastRecord?.recognised
    ? readPositiveNumber(predictionForecastRecord.value.step_seconds)
    : undefined;
  const forecastHorizonHours = predictionRecord?.recognised
    ? readPositiveNumber(predictionRecord.value.forecast_horizon_hours)
    : undefined;
  const predictionSteps = predictionResult?.recognised
    ? predictionResult.value.water_level_m.length
    : 0;
  const stepIntervalHours =
    stepSeconds !== undefined
      ? stepSeconds / 3600
      : forecastHorizonHours !== undefined && predictionSteps > 0
        ? forecastHorizonHours / predictionSteps
        : undefined;

  const operations = overviewQuery.data?.operations;
  const overviewNoData = !overviewQuery.isPending && !overviewQuery.isError && !overviewQuery.data;
  const latestSimulationNoData =
    !latestSimulationQuery.isPending &&
    !latestSimulationQuery.isError &&
    !latestSimulationQuery.data;
  const overviewError = overviewQuery.isError ? parseApiError(overviewQuery.error) : null;
  const berthError = berthQuery.isError ? parseApiError(berthQuery.error) : null;
  const simulationListError = simulationListQuery.isError
    ? parseApiError(simulationListQuery.error)
    : null;
  const predictionListError = predictionListQuery.isError
    ? parseApiError(predictionListQuery.error)
    : null;
  const latestSimulationError = latestSimulationQuery.isError
    ? parseApiError(latestSimulationQuery.error)
    : null;
  const vesselsError = vesselsQuery.isError ? parseApiError(vesselsQuery.error) : null;

  const queueVessels = useMemo(
    () =>
      [...(latestSimulationQuery.data?.vessel_results?.vessels ?? [])].sort(
        (a, b) => a.arrival_hour - b.arrival_hour,
      ),
    [latestSimulationQuery.data],
  );

  const simulationErrorMessage =
    latestSimulationQuery.data?.error_message?.trim() || 'The latest simulation failed.';
  const predictionErrorMessage =
    latestPrediction?.error_message?.trim() || 'The prediction did not provide an error message.';

  return (
    <div className="dashboard">
      <div className="dashboard__meta">
        <span>Last updated</span>
        {overviewQuery.data?.generated_at ? (
          <time dateTime={overviewQuery.data.generated_at}>
            {formatTimestamp(overviewQuery.data.generated_at)}
          </time>
        ) : (
          <span>Unavailable</span>
        )}
      </div>

      <section className="dashboard__kpi-row" aria-label="Key performance indicators">
        {overviewQuery.isPending || overviewQuery.isError || !overviewQuery.data ? (
          <div className="dashboard__state">
            <ServerErrors
              isPending={overviewQuery.isPending}
              isError={overviewQuery.isError}
              isFetching={overviewQuery.isFetching}
              parsedError={overviewError}
              refetch={overviewQuery.refetch}
              requestedData="dashboard overview"
              noData={overviewNoData}
            />
          </div>
        ) : (
          <>
            <KpiCard
              label="Total vessels"
              value={formatCount(overviewQuery.data.total_vessels)}
              source={overviewQuery.data}
            />
            <KpiCard
              label="Vessels waiting"
              value={operations ? formatCount(operations.vessels_waiting) : null}
              source={operations}
              context="simulation"
              emptyMessage="No simulation data yet"
            />
            <KpiCard
              label="Vessels in service"
              value={operations ? formatCount(operations.vessels_in_service) : null}
              source={operations}
              context="simulation"
              emptyMessage="No simulation data yet"
            />
            <KpiCard
              label="Average waiting time"
              value={operations ? formatHours(operations.average_waiting_hours) : null}
              source={operations}
              context="simulation"
              emptyMessage="No simulation data yet"
            />
            <KpiCard
              label="Berth utilisation"
              value={operations ? formatPercent(operations.berth_utilization_percent) : null}
              source={operations}
              context="simulation"
              progress={
                operations && Number.isFinite(operations.berth_utilization_percent)
                  ? Math.min(100, Math.max(0, operations.berth_utilization_percent))
                  : undefined
              }
              emptyMessage="No simulation data yet"
            />
          </>
        )}
      </section>

      <section className="dashboard__main-grid">
        <article className="panel panel--queue">
          <header className="panel__header">
            <h2 className="panel__title">Vessel queue</h2>
            {latestSimulationQuery.data && (
              <ProvenanceBadge value={latestSimulationQuery.data} context="simulation" />
            )}
          </header>

          {overviewQuery.isPending || overviewQuery.isError || !overviewQuery.data ? (
            <div className="dashboard__state">
              <ServerErrors
                isPending={overviewQuery.isPending}
                isError={overviewQuery.isError}
                isFetching={overviewQuery.isFetching}
                parsedError={overviewError}
                refetch={overviewQuery.refetch}
                requestedData="dashboard overview"
                noData={overviewNoData}
              />
            </div>
          ) : !latestSimulationId ? (
            <p className="dashboard__empty">No simulation has run yet.</p>
          ) : latestSimulationQuery.isPending ||
            latestSimulationQuery.isError ||
            !latestSimulationQuery.data ? (
            <div className="dashboard__state">
              <ServerErrors
                isPending={latestSimulationQuery.isPending}
                isError={latestSimulationQuery.isError}
                isFetching={latestSimulationQuery.isFetching}
                parsedError={latestSimulationError}
                refetch={latestSimulationQuery.refetch}
                requestedData="latest simulation"
                noData={latestSimulationNoData}
              />
            </div>
          ) : latestSimulationQuery.data.status === 'failed' ? (
            <p className="dashboard__empty dashboard__empty--error" role="alert">
              {simulationErrorMessage}
            </p>
          ) : queueVessels.length === 0 ? (
            <p className="dashboard__empty">The latest simulation has no vessel queue results.</p>
          ) : (
            <>
              {vesselsError && (
                <p className="dashboard__inline-error" role="alert">
                  Vessel names could not be loaded: {vesselsError.message}
                </p>
              )}
              <div className="queue-table">
                <div className="queue-table__head">
                  <span>Vessel</span>
                  <span>Wait time</span>
                  <span>Berth</span>
                  <span>Status</span>
                </div>
                <div className="queue-table__rows">
                  {queueVessels.map((vessel) => (
                    <div
                      key={`${vessel.vessel_id}-${vessel.arrival_hour}`}
                      className="queue-table__row"
                    >
                      <span className="queue-table__name">
                        {vesselNameById.get(vessel.vessel_id) ?? vessel.vessel_id}
                      </span>
                      <span className="queue-table__wait">
                        {vessel.waiting_hours === null
                          ? '—'
                          : `${vessel.waiting_hours.toFixed(1)} h`}
                      </span>
                      <span className="queue-table__berth">
                        {vessel.berth_id
                          ? (berthNameById.get(vessel.berth_id) ?? vessel.berth_id)
                          : 'Unassigned'}
                      </span>
                      <span className="queue-table__status">
                        {vessel.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <footer className="panel__footer">
                <Link
                  className="panel__footer-link"
                  to={routes.simulationDetails(latestSimulationId)}
                >
                  View full simulation →
                </Link>
              </footer>
            </>
          )}
        </article>

        <article className="panel panel--status">
          <header className="panel__header">
            <h2 className="panel__title">Berth occupancy</h2>
            {berthQuery.data && <ProvenanceBadge value={berthQuery.data} />}
          </header>

          {berthQuery.isPending || berthQuery.isError ? (
            <div className="dashboard__state">
              <ServerErrors
                isPending={berthQuery.isPending}
                isError={berthQuery.isError}
                isFetching={berthQuery.isFetching}
                parsedError={berthError}
                refetch={berthQuery.refetch}
                requestedData="berths"
                noData={false}
              />
            </div>
          ) : berths.length === 0 ? (
            <p className="dashboard__empty">No berths have been configured yet.</p>
          ) : (
            <>
              <div className="dashboard__berth-summary">
                {berthStates.map((state) => (
                  <div
                    key={state}
                    className={`dashboard__berth-summary-item dashboard__berth-summary-item--${state}`}
                  >
                    <strong>{formatCount(berthCounts[state])}</strong>
                    <span>{berthStateLabels[state]}</span>
                  </div>
                ))}
              </div>
              <div className="dashboard__berth-list" aria-label="Berth status list">
                {berths.map((berth) => {
                  const state = getBerthState(berth);
                  return (
                    <div className="dashboard__berth-row" key={berth.id}>
                      <span className="dashboard__berth-name">{berth.name}</span>
                      {berth.assigned_vessel && (
                        <span className="dashboard__berth-vessel">
                          {berth.assigned_vessel.name}
                        </span>
                      )}
                      <span className={`dashboard__berth-state dashboard__berth-state--${state}`}>
                        {berthStateLabels[state]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </article>
      </section>

      <section className="dashboard__bottom-grid">
        <article className="panel panel--prediction">
          <header className="panel__header">
            <h2 className="panel__title">Latest marine prediction</h2>
            {hasPredictionOutput && latestPrediction && (
              <ProvenanceBadge value={latestPrediction} context="prediction" />
            )}
            <Link className="panel__link" to={routes.predictionNew()}>
              New prediction →
            </Link>
          </header>

          {predictionListQuery.isPending || predictionListQuery.isError ? (
            <div className="dashboard__state">
              <ServerErrors
                isPending={predictionListQuery.isPending}
                isError={predictionListQuery.isError}
                isFetching={predictionListQuery.isFetching}
                parsedError={predictionListError}
                refetch={predictionListQuery.refetch}
                requestedData="marine predictions"
                noData={false}
              />
            </div>
          ) : !latestPrediction ? (
            <p className="dashboard__empty">
              No marine predictions yet. <Link to={routes.predictionNew()}>Create one</Link>
            </p>
          ) : latestPrediction.status === 'failed' ? (
            <p className="dashboard__empty dashboard__empty--error" role="alert">
              {predictionErrorMessage}
            </p>
          ) : hasPredictionOutput && predictionResult?.recognised ? (
            <>
              <div className="dashboard__prediction-preview">
                <PredictedWaterFlow
                  result={predictionResult.value}
                  currentStep={0}
                  totalSteps={predictionSteps}
                  startTime={predictionStartTime}
                  stepIntervalHours={stepIntervalHours}
                  isPlaying={false}
                  onStepChange={noStepChange}
                  onPlayPause={noPlayPause}
                  compact
                />
              </div>
              <footer className="panel__footer">
                <Link
                  className="panel__footer-link"
                  to={routes.predictionDetails(latestPrediction.id)}
                >
                  View prediction details →
                </Link>
              </footer>
            </>
          ) : (
            <p className="dashboard__empty">
              The latest prediction has no valid output to display.
            </p>
          )}
        </article>

        <article className="panel panel--sims">
          <header className="panel__header">
            <h2 className="panel__title">Recent simulations</h2>
            {recentSimulations[0] && (
              <ProvenanceBadge value={recentSimulations[0]} context="simulation" />
            )}
          </header>

          {simulationListQuery.isPending || simulationListQuery.isError ? (
            <div className="dashboard__state">
              <ServerErrors
                isPending={simulationListQuery.isPending}
                isError={simulationListQuery.isError}
                isFetching={simulationListQuery.isFetching}
                parsedError={simulationListError}
                refetch={simulationListQuery.refetch}
                requestedData="simulations"
                noData={false}
              />
            </div>
          ) : recentSimulations.length === 0 ? (
            <p className="dashboard__empty">No simulations have been run yet.</p>
          ) : (
            <div className="sim-list">
              {recentSimulations.map((simulation: SimulationHistoryItem) => {
                const status = simulation.status ?? 'unknown';
                const statusClass = status.toLowerCase().replace(/[^a-z0-9-]/g, '-');
                return (
                  <Link
                    key={simulation.id}
                    className="sim-row"
                    to={routes.simulationDetails(simulation.id)}
                  >
                    <div className="sim-row__left">
                      <span className="sim-row__id">{simulation.id}</span>
                      <span className="sim-row__name">{simulation.scenario_name}</span>
                    </div>
                    <div className="sim-row__right">
                      <time className="sim-row__duration" dateTime={simulation.created_at}>
                        {formatTimestamp(simulation.created_at)}
                      </time>
                      <span className={`sim-row__status sim-row__status--${statusClass}`}>
                        {status.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </article>
      </section>
    </div>
  );
}
