import './RunComparisonCard.scss';

export interface RunComparisonCardProps {
  label: string;
  name: string;
  id: string;
  badge: string;
  badgeTone: 'reference' | 'stress';
}

const RunComparisonCard = ({ label, name, id, badge, badgeTone }: RunComparisonCardProps) => {
  return (
    <article className="run-comparison-card">
      <div className="run-comparison-card__identity">
        <div className="run-comparison-card__details">
          <span className="run-comparison-card__label">{label}</span>
          <h2>{name}</h2>
          <span className="run-comparison-card__id">{id}</span>
        </div>

        <span className={`run-comparison-card__badge run-comparison-card__badge--${badgeTone}`}>
          {badge}
        </span>
      </div>
    </article>
  );
};

export default RunComparisonCard;
