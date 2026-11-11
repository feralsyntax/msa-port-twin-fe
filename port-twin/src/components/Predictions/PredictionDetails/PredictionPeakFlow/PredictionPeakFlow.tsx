import './PredictionPeakFlow.scss';

interface PredictionPeakFlowProps {
  value: string;
  phase: string;
  verified: boolean;
}

const PredictionPeakFlow = ({ value, phase, verified }: PredictionPeakFlowProps) => {
  return (
    <section className="prediction-peak-flow">
      <div className="prediction-peak-flow__content">
        <span className="material-symbols-outlined" aria-hidden="true">
          speed
        </span>

        <div>
          <span className="prediction-peak-flow__label">Peak Channel Flow</span>
          <p>
            {value}
            <span> ({phase})</span>
          </p>
        </div>
      </div>

      {verified && <span className="prediction-peak-flow__verified">Verified</span>}
    </section>
  );
};

export default PredictionPeakFlow;
