import "./VesselPagination.scss";

interface VesselPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  aisStreamHealth?: number;
}

const VesselPagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  aisStreamHealth = 100,
}: VesselPaginationProps) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(currentPage * pageSize, totalItems);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <footer className='vessel-pagination'>
      <div className='vessel-pagination__summary'>
        <span>
          Showing{" "}
          <strong>
            {startItem}–{endItem}
          </strong>{" "}
          of <strong>{totalItems}</strong> vessels
        </span>

        <span className='vessel-pagination__stream'>
          <span className='vessel-pagination__stream-dot' />
          AIS STREAM: {aisStreamHealth}%
        </span>
      </div>

      <nav
        className='vessel-pagination__controls'
        aria-label='Vessel table pagination'
      >
        <button
          type='button'
          className='vessel-pagination__button'
          disabled={!canGoPrevious}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label='Previous page'
        >
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor'>
            <path
              d='m15 18-6-6 6-6'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span>Previous</span>
        </button>

        <span className='vessel-pagination__page'>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>

        <button
          type='button'
          className='vessel-pagination__button'
          disabled={!canGoNext}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label='Next page'
        >
          <span>Next</span>
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor'>
            <path
              d='m9 18 6-6-6-6'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </nav>
    </footer>
  );
};

export default VesselPagination;
