import { useState } from "react";
import TopBar from "../../../components/Vessels/VesselDirectory/TopBar/TopBar";
import VesselFilters from "../../../components/Vessels/VesselDirectory/VesselFilters/VesselFilters";
import VesselTable from "../../../components/Vessels/VesselDirectory/VesselTable/VesselTable";
import VesselPagination from "../../../components/Vessels/VesselDirectory/VesselPagination/VesselPagination";
import "./VesselDirectory.scss";
import { useGetVessels } from "../../../hooks/vessels/useGetVessels";

const PAGE_SIZE = 20;

const VesselsDirectoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isPending, isError, isPlaceholderData, refetch } =
    useGetVessels(currentPage);

  const vessels = data?.results ?? [];

  const totalItems = data?.count ?? 0;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const canGoPrevious = Boolean(data?.previous);
  const canGoNext = Boolean(data?.next);

  const handlePageChange = (page: number) => {
    if (isPlaceholderData) return;
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  return (
    <div className='vessels-page'>
      <TopBar />

      <main className='vessels-page__content'>
        {isPending ? (
          <p role='status'>Loading vessels...</p>
        ) : isError ? (
          <div role='alert'>
            <p>Failed to load vessels.</p>
            <button type='button' onClick={() => refetch()}>
              Try again
            </button>
          </div>
        ) : (
          <>
            <VesselFilters
              activeFilter='all'
              onFilterChange={() => {}}
              searchQuery=''
              onSearchChange={() => {}}
              counts={{
                all: totalItems,
                inPort: 0,
                approaching: 0,
              }}
            />

            <div className='vessels-page__table'>
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
              <p role='status'>Loading the selected page...</p>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default VesselsDirectoryPage;
