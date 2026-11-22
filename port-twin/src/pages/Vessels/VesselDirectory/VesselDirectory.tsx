import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../../components/Common/TopBar/TopBar';
import VesselFilters from '../../../components/Vessels/VesselDirectory/VesselFilters/VesselFilters';
import VesselTable from '../../../components/Vessels/VesselDirectory/VesselTable/VesselTable';
import VesselPagination from '../../../components/Vessels/VesselDirectory/VesselPagination/VesselPagination';
import './VesselDirectory.scss';
import { useGetVessels } from '../../../hooks/vessels/useGetVessels';
import { parseApiError } from '../../../utils/apiError';
import './VesselDirectory.scss';
import ServerErrors from '../../../components/errors/ServerErrors';

const PAGE_SIZE = 20;

const VesselsDirectoryPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isPending, isError, error, isPlaceholderData, refetch, isFetching } =
    useGetVessels(currentPage);

  const vessels = data?.results ?? [];

  const totalItems = data?.count ?? 0;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE) || 0;

  const canGoPrevious = Boolean(data?.previous);
  const canGoNext = Boolean(data?.next);

  const parsedError = isError ? parseApiError(error) : null;

  const handlePageChange = (page: number) => {
    if (isPlaceholderData) return;
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  return (
    <div className="vessels-page">
      <TopBar
        title="Vessels"
        showSearch={false}
        action={
          <button
            type="button"
            className="app-topbar__action"
            onClick={() => navigate('/app/vessels/new')}
          >
            <span className="material-symbols-outlined">add</span>
            <span>Add Vessel</span>
          </button>
        }
      />

      <main className="vessels-page__content">
        {isPending || isError || parsedError || isFetching || !vessels.length ? (
          <ServerErrors
            isPending={isPending}
            isError={isError}
            isFetching={isFetching}
            parsedError={parsedError}
            refetch={refetch}
            requestedData="vessels"
            noData={!vessels.length}
          />
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

            {isPlaceholderData && <p role="status">Loading the selected page...</p>}
          </>
        )}
      </main>
    </div>
  );
};

export default VesselsDirectoryPage;
