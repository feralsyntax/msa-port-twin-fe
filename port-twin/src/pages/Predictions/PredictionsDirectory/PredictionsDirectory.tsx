import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TopBar from '../../../components/Common/TopBar/TopBar';
import PredictionsDirectoryStatusTabs from '../../../components/Predictions/PredictionsDirectory/PredictionsDirectoryStatusTabs/PredictionsDirectoryStatusTabs';
import PredictionsDirectoryTable from '../../../components/Predictions/PredictionsDirectory/PredictionsDirectoryTable/PredictionsDirectoryTable';
import PredictionsDirectoryPagination from '../../../components/Predictions/PredictionsDirectory/PredictionsDirectoryPagination/PredictionsDirectoryPagination';
import ServerErrors from '../../../components/errors/ServerErrors';
import type { PredictionFilter } from '../../../components/Predictions/PredictionsDirectory/types/predictions-directory.types';
import { useGetMarinePredictions } from '../../../hooks/predictions/useGetMarinePredictions';
import { parseApiError } from '../../../utils/apiError';

import './PredictionsDirectory.scss';
import { routes } from '../../../utils/routes';

const PAGE_SIZE = 20;

export const PredictionsDirectoryPage = () => {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState<PredictionFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isPending, isError, error, isPlaceholderData, isFetching, refetch } =
    useGetMarinePredictions(currentPage);

  const predictions = useMemo(() => data?.results ?? [], [data]);
  const visiblePredictions = useMemo(
    () =>
      activeFilter === 'all'
        ? predictions
        : predictions.filter((prediction) => prediction.status === activeFilter),
    [activeFilter, predictions],
  );

  const counts = useMemo(
    () =>
      predictions.reduce(
        (pageCounts, prediction) => {
          pageCounts.all += 1;
          pageCounts[prediction.status] += 1;
          return pageCounts;
        },
        { all: 0, completed: 0, failed: 0 },
      ),
    [predictions],
  );

  const parsedError = isError ? parseApiError(error) : null;

  const handleSelectPrediction = (predictionId: string) => {
    navigate(routes.predictionDetails(predictionId));
  };

  const handlePageChange = (page: number) => {
    if (isPlaceholderData || page < 1) return;
    if (page < currentPage && !data?.previous) return;
    if (page > currentPage && !data?.next) return;
    setCurrentPage(page);
  };

  return (
    <div className="predictions-directory-page">
      <TopBar
        title="Marine Predictions"
        showSearch={false}
        action={
          <button
            type="button"
            className="app-topbar__action"
            onClick={() => navigate(routes.predictionNew())}
          >
            <span className="material-symbols-outlined">add</span>
            <span>New Prediction</span>
          </button>
        }
      />

      <PredictionsDirectoryStatusTabs
        activeFilter={activeFilter}
        counts={counts}
        onFilterChange={setActiveFilter}
        onReset={() => setActiveFilter('all')}
      />

      <main className="marine-predictions-page__content">
        {isPending || isError || (data !== undefined && predictions.length === 0) ? (
          <ServerErrors
            isPending={isPending}
            isError={isError}
            isFetching={isFetching}
            parsedError={parsedError}
            refetch={refetch}
            requestedData="marine predictions"
            noData={data !== undefined && predictions.length === 0}
          />
        ) : (
          <>
            <PredictionsDirectoryTable
              predictions={visiblePredictions}
              onSelectPrediction={handleSelectPrediction}
            />
            {isPlaceholderData && <p role="status">Loading the selected page...</p>}
            <PredictionsDirectoryPagination
              currentPage={currentPage}
              totalPages={Math.ceil((data?.count ?? 0) / PAGE_SIZE)}
              totalItems={data?.count ?? 0}
              pageSize={PAGE_SIZE}
              canGoPrevious={Boolean(data?.previous) && !isPlaceholderData}
              canGoNext={Boolean(data?.next) && !isPlaceholderData}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default PredictionsDirectoryPage;
