import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import type { ParsedApiError } from '../../utils/apiError';
import './ServerErrors.scss';

interface ServerErrorsProps {
  isPending: boolean;
  isError: boolean;
  isFetching: boolean;
  parsedError: ParsedApiError | null;
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult>;
}

const ServerErrors = ({
  isPending,
  isError,
  isFetching,
  parsedError,
  refetch,
}: ServerErrorsProps) => {
  <></>;
};
