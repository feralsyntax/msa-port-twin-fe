import './PredictionsDirectoryPagination.scss';

interface PredictionsDirectoryPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const PredictionsDirectoryPagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: PredictionsDirectoryPaginationProps) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <footer className="predictions-directory-pagination">
      <div className="predictions-directory-pagination__summary">
        Showing{' '}
        <strong>
          {startItem}–{endItem}
        </strong>{' '}
        of <strong>{totalItems}</strong> predictions
      </div>

      <div className="predictions-directory-pagination__controls">
        <span className="predictions-directory-pagination__page">
          Page <strong>{currentPage}</strong> of {totalPages}
        </span>

        <div className="predictions-directory-pagination__buttons">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>

          <span className="predictions-directory-pagination__divider">|</span>

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </footer>
  );
};

export default PredictionsDirectoryPagination;
