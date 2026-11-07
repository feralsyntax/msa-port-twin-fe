import './BerthSpecCards.scss';

interface BerthSpecCardsProps {
  maxLoaM: number;
  maxDraftM: number;
  currentVessel: string;
  isAvailable: boolean;
}

const BerthSpecCards = ({
  maxLoaM,
  maxDraftM,
  currentVessel,
  isAvailable,
}: BerthSpecCardsProps) => {
  const vesselLabel = !currentVessel || currentVessel === '—' ? 'None' : currentVessel;

  return (
    <section className="berth-spec-cards" aria-label="Berth specifications">
      <article className="berth-spec-card">
        <div className="berth-spec-card__top">
          <span className="berth-spec-card__label">MAX vessel length</span>
          <span className="berth-spec-card__param">PARAM_01</span>
        </div>
        <div className="berth-spec-card__value">
          {maxLoaM.toFixed(2)} <span>m</span>
        </div>
        <div className="berth-spec-card__meta">
          <span className="berth-spec-card__meta-dot" />
          MEASURED · MLWS clearance validated
        </div>
      </article>

      <article className="berth-spec-card">
        <div className="berth-spec-card__top">
          <span className="berth-spec-card__label">MAX DRAFT</span>
          <span className="berth-spec-card__param">PARAM_02</span>
        </div>
        <div className="berth-spec-card__value">
          {maxDraftM.toFixed(2)} <span>m</span>
        </div>
        <div className="berth-spec-card__meta">
          <span className="berth-spec-card__meta-dot" />
          MEASURED · Hydrographic chart datum
        </div>
      </article>

      <article className="berth-spec-card">
        <div className="berth-spec-card__top">
          <span className="berth-spec-card__label">CURRENT VESSEL</span>
          <span className="berth-spec-card__badge">
            <span className="berth-spec-card__badge-dot" />
            MEASURED
          </span>
        </div>
        <div className="berth-spec-card__value">{vesselLabel}</div>
        <div
          className={`berth-spec-card__meta${isAvailable ? ' berth-spec-card__meta--ready' : ''}`}
        >
          <span className="berth-spec-card__meta-dot" />
          {isAvailable ? 'READY FOR DOCKING ALLOCATION' : 'VESSEL CURRENTLY ALLOCATED'}
        </div>
      </article>
    </section>
  );
};

export default BerthSpecCards;
