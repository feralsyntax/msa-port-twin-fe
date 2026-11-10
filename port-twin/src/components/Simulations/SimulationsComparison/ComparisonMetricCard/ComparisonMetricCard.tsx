import './ComparisonMetricCard.scss';

export interface ComparisonMetricCardProps {
  label: string;
  icon: string;
  delta: string;
  direction: 'up' | 'down' | 'neutral';
  tone: 'coral' | 'amber' | 'moss';
  runAValue: string;
  runBValue: string;
}

const ComparisonMetricCard = ({
  label,
  icon,
  delta,
  direction,
  tone,
  runAValue,
  runBValue,
}: ComparisonMetricCardProps) => {
  const directionSymbol = {
    up: '▲',
    down: '▼',
    neutral: '—',
  };

  return (
    <article className="comparison-metric-card">
      <div className="comparison-metric-card__heading">
        <span>{label}</span>
        <span className="material-symbols-outlined" aria-hidden="true">
          {icon}
        </span>
      </div>

      <div className={`comparison-metric-card__delta comparison-metric-card__delta--${tone}`}>
        {direction !== 'neutral' && (
          <span className="comparison-metric-card__direction">{directionSymbol[direction]}</span>
        )}
        <span>{delta}</span>
      </div>

      <div className="comparison-metric-card__values">
        <span>
          Run A: <strong>{runAValue}</strong>
        </span>
        <span>
          Run B: <strong className={`comparison-metric-card__run-b--${tone}`}>{runBValue}</strong>
        </span>
      </div>
    </article>
  );
};

export default ComparisonMetricCard;
