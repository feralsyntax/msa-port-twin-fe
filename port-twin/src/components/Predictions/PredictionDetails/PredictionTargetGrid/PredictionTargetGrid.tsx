import './PredictionTargetGrid.scss';

interface PredictionTargetGridProps {
  area: string;
  gridSize: string;
  crs: string;
}

const PredictionTargetGrid = ({ area, gridSize, crs }: PredictionTargetGridProps) => {
  const details = [
    { label: 'Area (W, S, E, N)', value: area },
    { label: 'Grid Size', value: gridSize },
    { label: 'CRS', value: crs },
  ];

  return (
    <section className="prediction-target-grid">
      <h3>Target Grid</h3>

      <dl>
        {details.map((detail, index) => (
          <div
            className={`prediction-target-grid__row ${
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

export default PredictionTargetGrid;
