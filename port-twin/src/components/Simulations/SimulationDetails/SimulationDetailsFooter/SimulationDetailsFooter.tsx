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
    </footer>
  );
};

export default SimulationDetailsFooter;
