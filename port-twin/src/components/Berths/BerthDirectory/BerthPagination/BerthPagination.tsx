import './BerthPagination.scss';

interface BerthPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

const BerthPagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  canGoPrevious,
  canGoNext,
}: BerthPaginationProps) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <footer className="berth-pagination">
      <div className="berth-pagination__summary">
        <span>
          Showing{' '}
          <strong>
            {startItem}–{endItem}
          </strong>{' '}
          of <strong>{totalItems}</strong> berths
        </span>
      </div>

      <nav className="berth-pagination__controls" aria-label="Berth table pagination">
        <button
          type="button"
          className="berth-pagination__button"
          disabled={!canGoPrevious}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="m15 18-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Previous</span>
        </button>

        <span className="berth-pagination__page">
          Page <strong>{totalPages === 0 ? 0 : currentPage}</strong> of{' '}
          <strong>{totalPages}</strong>
        </span>

        <button
          type="button"
          className="berth-pagination__button"
          disabled={!canGoNext}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          <span>Next</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="m9 18 6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </nav>
    </footer>
  );
};

export default BerthPagination;
