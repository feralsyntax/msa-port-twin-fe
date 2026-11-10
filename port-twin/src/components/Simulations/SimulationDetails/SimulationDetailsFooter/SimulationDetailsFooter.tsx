import './SimulationDetailsFooter.scss';

interface SimulationDetailsFooterProps {
  simulationId: string;
}

const SimulationDetailsFooter = ({ simulationId }: SimulationDetailsFooterProps) => {
  return (
    <footer className="sim-details-footer">
      <div className="sim-details-footer__left">
        <span className="sim-details-footer__pip" />
        <span>RUN ID: {simulationId}</span>
      </div>

      <div className="sim-details-footer__right">MSA Port Twin Engine · Port Operations Center</div>
    </footer>
  );
};

export default SimulationDetailsFooter;
