import { useState } from 'react';
import TopBar from '../../../components/Vessels/VesselDirectory/TopBar/TopBar';
import VesselFilters from '../../../components/Vessels/VesselDirectory/VesselFilters/VesselFilters';
import VesselTable from '../../../components/Vessels/VesselDirectory/VesselTable/VesselTable';
import VesselPagination from '../../../components/Vessels/VesselDirectory/VesselPagination/VesselPagination';
import './VesselDirectory.scss';
import { useGetVessels } from '../../../hooks/vessels/useGetVessels';
import { parseApiError } from '../../../utils/apiError';
import './VesselDirectory.scss';

const PAGE_SIZE = 20;

const VesselsDirectoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isPending, isError,error, isPlaceholderData, refetch, isFetching } = useGetVessels(currentPage);

  const vessels = data?.results ?? [];

  const totalItems = data?.count ?? 0;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE) || 0;

  const canGoPrevious = Boolean(data?.previous);
  const canGoNext = Boolean(data?.next);

  const parsedError = isError ? parseApiError(Error) : null;

  const handlePageChange = (page: number) => {
    if (isPlaceholderData) return;
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  return (
    <div className="vessels-page">
      <TopBar />

      <main className="vessels-page__content">
        {isPending ? (
          <p role="status">Loading vessels...</p>
        ) : isError && parsedError ? (
          <div className="vessels-page__error" role="alert">
            <p className="vessels-page__error-title">Failed to load vessels</p>
            <p className="vessels-page__error-message">{parsedError.message}</p>
            {(parsedError.status || parsedError.code) && (
              <p className="vessels-page__error-meta">
                {parsedError.status != null && (
                  <span>HTTP {parsedError.status}</span>
                )}
                {parsedError.status != null && parsedError.code && ' · '}
                {parsedError.code && <span>{parsedError.code}</span>}
              </p>
            )}
            <button
              type="button"
              className="vessels-page__error-retry"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              {isFetching ? 'Retrying…' : 'Try again'}
            </button>
          </div>
        ) : (
          <>
            <VesselFilters
              activeFilter="all"
              onFilterChange={() => {}}
              searchQuery=""
              onSearchChange={() => {}}
              counts={{
                all: totalItems,
                inPort: 0,
                approaching: 0,
              }}
            />

            <div className="vessels-page__table">
              <VesselTable vessels={vessels} />

              <VesselPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={PAGE_SIZE}
                onPageChange={handlePageChange}
                canGoPrevious={canGoPrevious}
                canGoNext={canGoNext}
              />
            </div>

            {isPlaceholderData && (
              <p role="status">Loading the selected page...</p>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default VesselsDirectoryPage;
