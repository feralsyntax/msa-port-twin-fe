import './SimulationsDirectoryPagination.scss';

interface SimulationsDirectoryPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

const SimulationsDirectoryPagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  canGoPrevious,
  canGoNext,
}: SimulationsDirectoryPaginationProps) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <footer className="simulations-directory-pagination">
      <div className="simulations-directory-pagination__summary">
        <span>
          Showing{' '}
          <strong>
            {startItem}–{endItem}
          </strong>{' '}
          of <strong>{totalItems}</strong> simulations
        </span>
      </div>

      <nav
        className="simulations-directory-pagination__controls"
        aria-label="Simulations table pagination"
      >
        <button
          type="button"
          className="simulations-directory-pagination__button"
          disabled={!canGoPrevious}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="m15 18-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Previous</span>
        </button>

        <span className="simulations-directory-pagination__page">
          Page <strong>{totalPages === 0 ? 0 : currentPage}</strong> of{' '}
          <strong>{totalPages}</strong>
        </span>

        <button
          type="button"
          className="simulations-directory-pagination__button"
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

export default SimulationsDirectoryPagination;
