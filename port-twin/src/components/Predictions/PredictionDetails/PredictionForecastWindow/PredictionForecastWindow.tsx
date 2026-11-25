import './PredictionForecastWindow.scss';

interface PredictionForecastWindowProps {
  startTime: string;
  timeSteps: string;
  interval: string;
  horizon: string;
  modelVersion: string;
  contractVersion: string;
  predictionMode: string;
  modelStatus: string;
  createdAt: string;
}

const PredictionForecastWindow = ({
  startTime,
  timeSteps,
  interval,
  horizon,
  modelVersion,
  contractVersion,
  predictionMode,
  modelStatus,
  createdAt,
}: PredictionForecastWindowProps) => {
  const details = [
    { label: 'Start Time', value: startTime },
    { label: 'Time Steps', value: timeSteps },
    { label: 'Interval', value: interval },
    { label: 'Horizon', value: horizon },
    { label: 'Model Version', value: modelVersion },
    { label: 'Contract Version', value: contractVersion },
    { label: 'Prediction Mode', value: predictionMode },
    { label: 'Model Status', value: modelStatus },
    { label: 'Created', value: createdAt },
  ];

  return (
    <section className="prediction-forecast-window">
      <h3>Forecast Window</h3>

      <dl>
        {details.map((detail, index) => (
          <div
            className={`prediction-forecast-window__row ${
              index === details.length - 1 ? 'is-last' : ''
            }`}
            key={detail.label}
          >
            <dt>{detail.label}</dt>
            <dd>{detail.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default PredictionForecastWindow;
