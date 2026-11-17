import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import type { ParsedApiError } from '../../utils/apiError';
import './ServerErrors.scss';

interface ServerErrorsProps {
  isPending: boolean;
  isError: boolean;
  isFetching: boolean;
  parsedError: ParsedApiError | null;
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult>;
  requestedData: string;
  noData: boolean;
}

const ServerErrors = ({
  isPending,
  isError,
  isFetching,
  parsedError,
  refetch,
  requestedData,
  noData,
}: ServerErrorsProps) => {
  return (
    <>
      {isPending ? (
        <p role="status">Loading {requestedData}...</p>
      ) : isError && parsedError ? (
        <div className="server-errors__error" role="alert">
          <p className="server-errors__error-title">Failed to load {requestedData}</p>
          <p className="server-errors__error-message">{parsedError.message}</p>
          {(parsedError.status || parsedError.code) && (
            <p className="server-errors__error-meta">
              {parsedError.status != null && <span>HTTP {parsedError.status}</span>}
              {parsedError.status != null && parsedError.code && ' · '}
              {parsedError.code && <span>{parsedError.code}</span>}
            </p>
          )}
          <button
            type="button"
            className="server-errors__error-retry"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? 'Retrying…' : 'Try again'}
          </button>
        </div>
      ) : noData ? (
        <div className="server-errors__error" role="alert">
          <p className="server-errors__error-title">No {requestedData} found</p>
          <p className="server-errors__error-message">
            No {requestedData} have been added yet; {requestedData} will appear here once they're
            added.
          </p>
        </div>
      ) : null}
    </>
  );
};

export default ServerErrors;
