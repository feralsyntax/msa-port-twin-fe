import { useState } from "react";

import TopBar from "../../../components/Berths/BerthDirectory/TopBar/TopBar";
import BerthFilters, {
  type BerthFilterStatus,
} from "../../../components/Berths/BerthDirectory/BerthFilters/BerthFilters";
import BerthTable from "../../../components/Berths/BerthDirectory/BerthTable/BerthTable";
import BerthPagination from "../../../components/Berths/BerthDirectory/BerthPagination/BerthPagination";


import "./BerthDirectory.scss";
import { useGetBerths } from "../../../hooks/berths/useGetBerths";

const PAGE_SIZE = 20;

const BerthDirectoryPage = () => {
  const [activeFilter, setActiveFilter] = useState<BerthFilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isPending, isError, isPlaceholderData, refetch } =
    useGetBerths(currentPage);

  const berths = data?.results ?? [];
  const totalItems = data?.count ?? 0;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const handleFilterChange = (filter: BerthFilterStatus) => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || isPlaceholderData) return;

    setCurrentPage(page);
  };

  return (
    <div className='berths-page'>
      <TopBar />

      <main className='berths-page__content'>
        <BerthFilters
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          counts={{
            all: totalItems,
            occupied: 0,
            available: 0,
          }}
        />

        <div className='berths-page__table'>
          {isPending ? (
            <div className='berths-page__state'>Loading berths...</div>
          ) : isError ? (
            <div className='berths-page__state' role='alert'>
              <p>Unable to load berths.</p>
              <button type='button' onClick={() => refetch()}>
                Try again
              </button>
            </div>
          ) : (
            <>
              <BerthTable berths={berths} />

              <BerthPagination
                currentPage={totalItems === 0 ? 0 : currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={PAGE_SIZE}
                onPageChange={handlePageChange}
                canGoPrevious={currentPage > 1 && !isPlaceholderData}
                canGoNext={currentPage < totalPages && !isPlaceholderData}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default BerthDirectoryPage;
