import './SimulationDetailsFooter.scss';

const SimulationDetailsFooter = () => {
  return (
    <footer className="sim-details-footer">
      <div className="sim-details-footer__left">
        <span className="sim-details-footer__pip" />
        <span>TWIN RUN: SHA-256 e8f3...a91c verified</span>
      </div>
      <div className="sim-details-footer__right">
        Kilindini Port Twin Engine · Port Operations Center
      </div>
    </footer>
  );
};

export default SimulationDetailsFooter;
