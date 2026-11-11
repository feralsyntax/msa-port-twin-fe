import './PredictionTargetGrid.scss';

interface PredictionTargetGridProps {
  bounds: string;
  resolution: string;
  crs: string;
  spatialResolution: string;
}

const PredictionTargetGrid = ({
  bounds,
  resolution,
  crs,
  spatialResolution,
}: PredictionTargetGridProps) => {
  const details = [
    { label: 'Bounds', value: bounds },
    { label: 'Resolution', value: resolution },
    { label: 'CRS', value: crs },
    { label: 'Spatial Res', value: spatialResolution },
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
