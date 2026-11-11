import './PredictionForecastWindow.scss';

interface PredictionForecastWindowProps {
  startTime: string;
  timeSteps: number;
  interval: string;
  createdAt: string;
}

const PredictionForecastWindow = ({
  startTime,
  timeSteps,
  interval,
  createdAt,
}: PredictionForecastWindowProps) => {
  const details = [
    { label: 'Start Time', value: startTime },
    { label: 'Time Steps', value: String(timeSteps) },
    { label: 'Interval', value: interval },
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
