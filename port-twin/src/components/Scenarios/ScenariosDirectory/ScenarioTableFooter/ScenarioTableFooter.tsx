import './ScenarioTableFooter.scss';

interface ScenarioTableFooterProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

const ScenarioTableFooter = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  canGoPrevious,
  canGoNext,
}: ScenarioTableFooterProps) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <footer className="scenario-table-footer">
      <div className="scenario-table-footer__summary">
        <span>
          Showing{' '}
          <strong>
            {startItem}–{endItem}
          </strong>{' '}
          of <strong>{totalItems}</strong> scenarios
        </span>
      </div>

      <nav className="scenario-table-footer__controls" aria-label="Scenario table pagination">
        <button
          type="button"
          className="scenario-table-footer__button"
          disabled={!canGoPrevious}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="m15 18-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Previous</span>
        </button>

        <span className="scenario-table-footer__page">
          Page <strong>{totalPages === 0 ? 0 : currentPage}</strong> of{' '}
          <strong>{totalPages}</strong>
        </span>

        <button
          type="button"
          className="scenario-table-footer__button"
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

export default ScenarioTableFooter;
