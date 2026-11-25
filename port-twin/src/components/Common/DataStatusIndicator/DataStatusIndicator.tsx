import { useGetDataStatus } from '../../../hooks/data-status/useGetDataStatus';
import { parseApiError } from '../../../utils/apiError';
import { guardRecord } from '../../../utils/apiDataGuards';
import './DataStatusIndicator.scss';

type FeedFreshness = 'fresh' | 'stale' | 'no-data' | 'unknown';
type OverallFreshness = 'live' | 'stale' | 'no-data' | 'unknown' | 'loading' | 'error';

const readExplicitFreshness = (value: unknown): 'fresh' | 'stale' | null => {
  const record = guardRecord(value);
  if (!record.recognised) return null;

  const freshness = record.value.freshness ?? record.value.freshness_status;
  if (typeof freshness === 'string') {
    const normalized = freshness.toLowerCase();
    if (normalized === 'fresh' || normalized === 'live') return 'fresh';
    if (normalized === 'stale' || normalized === 'outdated') return 'stale';
  }

  const isFresh = record.value.is_fresh ?? record.value.fresh;
  if (isFresh === true) return 'fresh';
  if (isFresh === false) return 'stale';

  const isStale = record.value.is_stale ?? record.value.stale;
  if (isStale === true) return 'stale';
  if (isStale === false) return 'fresh';

  return null;
};

const getFeedFreshness = (value: unknown, overallFreshness: 'fresh' | 'stale' | null): FeedFreshness => {
  const record = guardRecord(value);
  if (!record.recognised) return 'unknown';

  if (record.value.total_records === 0) return 'no-data';

  const freshness = readExplicitFreshness(value) ?? overallFreshness;
  return freshness ?? 'unknown';
};

const formatTimestamp = (value: string | null | undefined): string => {
  if (!value) return 'No update reported';

  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return 'Update time unavailable';

  return `${new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(timestamp)} UTC`;
};

const freshnessLabel: Record<OverallFreshness, string> = {
  live: 'LIVE',
  stale: 'STALE',
  'no-data': 'NO DATA',
  unknown: 'FRESHNESS UNKNOWN',
  loading: 'LOADING',
  error: 'STATUS ERROR',
};

const feedLabel: Record<FeedFreshness, string> = {
  fresh: 'Fresh',
  stale: 'Stale',
  'no-data': 'No data',
  unknown: 'Unknown',
};

const DataStatusIndicator = () => {
  const { data, isPending, isError, error, isFetching, refetch } = useGetDataStatus();
  const parsedError = isError ? parseApiError(error) : null;
  const overallSignal = readExplicitFreshness(data);
  const positionsFreshness = getFeedFreshness(data?.vessel_positions, overallSignal);
  const marineFreshness = getFeedFreshness(data?.marine_conditions, overallSignal);

  let overallFreshness: OverallFreshness = 'unknown';
  if (isPending) {
    overallFreshness = 'loading';
  } else if (isError) {
    overallFreshness = 'error';
  } else if (positionsFreshness === 'no-data' || marineFreshness === 'no-data') {
    overallFreshness = 'no-data';
  } else if (positionsFreshness === 'stale' || marineFreshness === 'stale') {
    overallFreshness = 'stale';
  } else if (positionsFreshness === 'fresh' && marineFreshness === 'fresh') {
    overallFreshness = 'live';
  }

  const aiStatus = data?.ai;
  const readiness = !aiStatus
    ? 'Unknown'
    : aiStatus.readiness === 'ready'
      ? aiStatus.configured
        ? 'Ready'
        : 'Not configured'
      : aiStatus.readiness.replace(/_/g, ' ');
  const modelVersion =
    aiStatus?.configured_model_version?.trim()
      ? aiStatus.configured_model_version
      : 'Not configured';

  const positionsUpdatedAt =
    data?.vessel_positions.latest_ingested_at ?? data?.vessel_positions.latest_recorded_at;
  const marineUpdatedAt =
    data?.marine_conditions.latest_ingested_at ?? data?.marine_conditions.latest_recorded_at;

  return (
    <section
      className={`data-status-indicator data-status-indicator--${overallFreshness}`}
      aria-label="Marine and vessel data status"
      aria-live="polite"
    >
      <div className="data-status-indicator__heading">
        <span className="data-status-indicator__dot" aria-hidden="true" />
        <span>{freshnessLabel[overallFreshness]}</span>
      </div>

      {isPending && <p className="data-status-indicator__message">Loading data status…</p>}

      {isError && parsedError && (
        <div className="data-status-indicator__error" role="alert">
          <p>{parsedError.message}</p>
          <button type="button" onClick={() => refetch()} disabled={isFetching}>
            {isFetching ? 'Retrying…' : 'Retry'}
          </button>
        </div>
      )}

      {data && !isPending && (
        <div className="data-status-indicator__details">
          <div className="data-status-indicator__model">
            <span>AI model</span>
            <strong>{readiness}</strong>
          </div>
          <p className="data-status-indicator__version">Version: {modelVersion}</p>

          <div className="data-status-indicator__feed">
            <span>Ship positions</span>
            <strong>{feedLabel[positionsFreshness]}</strong>
            <time>{formatTimestamp(positionsUpdatedAt)}</time>
          </div>
          <div className="data-status-indicator__feed">
            <span>Marine conditions</span>
            <strong>{feedLabel[marineFreshness]}</strong>
            <time>{formatTimestamp(marineUpdatedAt)}</time>
          </div>
        </div>
      )}
    </section>
  );
};

export default DataStatusIndicator;
