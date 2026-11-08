import './SimulationsDirectoryPagination.scss';

interface SimulationsDirectoryPaginationProps {
  displayedCount: number;
  totalCount: number;
  pageSize?: number;
}

const SimulationsDirectoryPagination = ({
  displayedCount,
  totalCount,
  pageSize = 6,
}: SimulationsDirectoryPaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const firstRecord = totalCount > 0 ? 1 : 0;
  const lastRecord = Math.min(displayedCount, pageSize);

  return (
    <footer className="simulations-directory-pagination">
      <div className="simulations-directory-pagination__metadata">
        <span>
          Showing{' '}
          <strong>
            {firstRecord}–{lastRecord}
          </strong>{' '}
          of <strong>{totalCount}</strong> simulations
        </span>

        <span className="simulations-directory-pagination__divider">|</span>

        <span className="simulations-directory-pagination__engine">
          ◇ DISCRETE EVENT QUEUE ENGINE · MONTE CARLO BATCH
        </span>
      </div>

      <div className="simulations-directory-pagination__controls">
        <span>
          Page <strong>1</strong> of <strong>{totalPages}</strong>
        </span>

        <div className="simulations-directory-pagination__navigation">
          <span className="simulations-directory-pagination__disabled">Previous</span>

          <span className="simulations-directory-pagination__separator">/</span>

          <span
            className={
              totalPages > 1 ? 'simulations-directory-pagination__next' : 'simulations-directory-pagination__disabled'
            }
          >
            Next
          </span>
        </div>
      </div>
    </footer>
  );
};

export default SimulationsDirectoryPagination;
