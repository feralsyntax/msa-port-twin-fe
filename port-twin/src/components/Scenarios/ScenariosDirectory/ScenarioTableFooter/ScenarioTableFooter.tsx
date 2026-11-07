import './ScenarioTableFooter.scss';

interface ScenarioTableFooterProps {
  displayedCount: number;
  totalCount: number;
}

const ScenarioTableFooter = ({ displayedCount, totalCount }: ScenarioTableFooterProps) => {
  return (
    <footer className="scenario-table-footer">
      <span className="scenario-table-footer__count">
        SHOWING {displayedCount} OF {totalCount} SCENARIOS
      </span>
    </footer>
  );
};

export default ScenarioTableFooter;
