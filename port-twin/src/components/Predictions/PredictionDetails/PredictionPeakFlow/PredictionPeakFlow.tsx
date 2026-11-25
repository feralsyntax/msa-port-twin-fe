import './PredictionPeakFlow.scss';

interface PredictionPeakFlowProps {
  value: string;
  stepLabel: string;
}

const PredictionPeakFlow = ({ value, stepLabel }: PredictionPeakFlowProps) => {
  return (
    <section className="prediction-peak-flow">
      <div className="prediction-peak-flow__content">
        <span className="material-symbols-outlined" aria-hidden="true">
          speed
        </span>

        <div>
          <span className="prediction-peak-flow__label">Peak Current Speed</span>
          <p>
            {value}
            <span> · {stepLabel}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PredictionPeakFlow;
