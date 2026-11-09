import './SimulationsDirectoryPagination.scss';

interface SimulationsDirectoryPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const SimulationsDirectoryPagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: SimulationsDirectoryPaginationProps) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <footer className="simulations-directory-pagination">
      <div className="simulations-directory-pagination__summary">
        Showing <strong>{startItem}–{endItem}</strong> of{' '}
        <strong>{totalItems}</strong> simulations
      </div>

      <div className="simulations-directory-pagination__controls">
        <button
          type="button"
          className="simulations-directory-pagination__button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M12.5 15L7.5 10L12.5 5" />
          </svg>
        </button>

        <span className="simulations-directory-pagination__page">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>

        <button
          type="button"
          className="simulations-directory-pagination__button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M7.5 15L12.5 10L7.5 5" />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default SimulationsDirectoryPagination;