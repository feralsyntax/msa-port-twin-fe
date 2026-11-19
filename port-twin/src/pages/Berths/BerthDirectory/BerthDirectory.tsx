import { useMemo, useState } from 'react';

import TopBar from '../../../components/Berths/BerthDirectory/TopBar/TopBar';
import BerthFilters, {
  type BerthFilterStatus,
} from '../../../components/Berths/BerthDirectory/BerthFilters/BerthFilters';
import BerthTable from '../../../components/Berths/BerthDirectory/BerthTable/BerthTable';
import BerthPagination from '../../../components/Berths/BerthDirectory/BerthPagination/BerthPagination';
import { useGetBerths } from '../../../hooks/berths/useGetBerths';
import { parseApiError } from '../../../utils/apiError';
import ServerErrors from '../../../components/errors/ServerErrors';
import './BerthDirectory.scss';

const PAGE_SIZE = 20;

const BerthDirectoryPage = () => {
  const [activeFilter, setActiveFilter] = useState<BerthFilterStatus>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isPending, isError, error, isPlaceholderData, refetch, isFetching } =
    useGetBerths(currentPage);

  const berths = useMemo(() => data?.results ?? [], [data?.results]);
  const totalItems = data?.count ?? 0;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE) || 0;

  const parsedError = isError ? parseApiError(error) : null;

  // Counts from loaded page data (no hard-coded DEMO_COUNTS)
  const counts = useMemo(() => {
    const occupied = berths.filter((b) => b.is_occupied).length;
    const available = berths.filter((b) => !b.is_occupied).length;
    return {
      all: totalItems,
      occupied,
      available,
    };
  }, [berths, totalItems]);

  const filteredBerths = useMemo(() => {
    if (activeFilter === 'occupied') {
      return berths.filter((b) => b.is_occupied);
    }
    if (activeFilter === 'available') {
      return berths.filter((b) => !b.is_occupied);
    }
    return berths;
  }, [activeFilter, berths]);

  const handleFilterChange = (filter: BerthFilterStatus) => {
    setActiveFilter(filter);
  };

  const handlePageChange = (page: number) => {
    if (isPlaceholderData) return;
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const showBlockingState = isPending || isError || parsedError != null || !berths.length;

  return (
    <div className="berths-page">
      <TopBar />

      <main className="berths-page__content">
        {showBlockingState ? (
          <ServerErrors
            isPending={isPending}
            isError={isError}
            isFetching={isFetching}
            parsedError={parsedError}
            refetch={refetch}
            requestedData="berths"
            noData={!isPending && !isError && berths.length === 0}
          />
        ) : (
          <>
            <BerthFilters
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
              counts={counts}
            />

            <div className="berths-page__table">
              <BerthTable berths={filteredBerths} />

              <BerthPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={PAGE_SIZE}
                onPageChange={handlePageChange}
                canGoPrevious={Boolean(data?.previous) && !isPlaceholderData}
                canGoNext={Boolean(data?.next) && !isPlaceholderData}
              />
            </div>

            {isPlaceholderData && <p role="status">Loading the selected page...</p>}
          </>
        )}
      </main>
    </div>
  );
};

export default BerthDirectoryPage;
