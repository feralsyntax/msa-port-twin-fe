import './ScenarioTableFooter.scss';

interface ScenarioTableFooterProps {
  displayedCount: number;
  pageCount: number;
  totalCount: number;
  page: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const ScenarioTableFooter = ({
  displayedCount,
  pageCount,
  totalCount,
  page,
  hasPreviousPage,
  hasNextPage,
  onPreviousPage,
  onNextPage,
}: ScenarioTableFooterProps) => {
  return (
    <footer className="scenario-table-footer">
      <span className="scenario-table-footer__count">
        SHOWING {displayedCount} OF {pageCount} ON THIS PAGE
        {' · '}
        {totalCount} TOTAL SCENARIOS
      </span>

      <div className="scenario-table-footer__pagination">
        <span className="scenario-table-footer__page">PAGE {page}</span>

        <button
          type="button"
          className="scenario-table-footer__button"
          onClick={onPreviousPage}
          disabled={!hasPreviousPage}
          aria-label="Previous page"
        >
          Previous
        </button>

        <button
          type="button"
          className="scenario-table-footer__button"
          onClick={onNextPage}
          disabled={!hasNextPage}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </footer>
  );
};

export default ScenarioTableFooter;
