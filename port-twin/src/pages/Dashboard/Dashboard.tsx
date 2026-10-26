import './Dashboard.scss';

const kpiCards = [
  {
    id: 'vessels',
    label: 'Vessels in Port',
    value: '14',
    trend: '+2',
    trendUp: true,
    provenance: 'MEASURED',
  },
  {
    id: 'berths',
    label: 'Active Berths',
    value: '6',
    trend: '+1',
    trendUp: true,
    provenance: 'MEASURED',
  },
  {
    id: 'wait',
    label: 'Avg Waiting Time',
    value: '3.2 h',
    trend: '-0.4',
    trendUp: false,
    provenance: 'HISTORICAL',
  },
  {
    id: 'util',
    label: 'Port Capacity Utilization',
    value: '78%',
    trend: null,
    trendUp: null,
    provenance: 'MEASURED',
    progress: 78,
  },
]

const vesselQueue = [
  { name: 'MV KWALE STAR', wait: '2.1 h', berth: 'Berth 3', provenance: 'MEASURED' },
  { name: 'MSC KILINDINI', wait: '3.4 h', berth: 'Berth 1', provenance: 'MEASURED' },
  { name: 'MT OCEAN VOYAGER', wait: '4.8 h', berth: 'Berth 4', provenance: 'MEASURED' },
  { name: 'MAERSK TSAVO', wait: '5.2 h', berth: '—', provenance: 'ESTIMATED' },
  { name: 'CMA CGM MOMBASA', wait: '6.0 h', berth: '—', provenance: 'ESTIMATED' },
  { name: 'MV NYALI TRADER', wait: '7.5 h', berth: '—', provenance: 'ESTIMATED' },
]

const berthOccupancy = [
  { name: 'Berth 1', pct: 72, tone: 'signal' },
  { name: 'Berth 2', pct: 85, tone: 'signal' },
  { name: 'Berth 3', pct: 58, tone: 'signal' },
  { name: 'Berth 4', pct: 100, tone: 'amber' },
]

const recentSims = [
  { id: '0042', name: 'Scenario A', duration: '2 h', status: 'COMPLETED' },
  { id: '0041', name: 'Scenario B', duration: '1 h', status: 'COMPLETED' },
  { id: '0040', name: 'Scenario A', duration: '4 h', status: 'FAILED' },
  { id: '0039', name: 'Scenario C', duration: '1 h', status: 'COMPLETED' },
]

export default function Dashboard() {
  return (
    <div className="dashboard">
      <section className="dashboard__kpi-row" aria-label="Key performance indicators">
        {kpiCards.map((card) => (
          <article key={card.id} className="kpi-card">
            <div className="kpi-card__top">
              <span className="kpi-card__label">{card.label}</span>
              {card.trend && (
                <span
                  className={`kpi-card__trend ${
                    card.trendUp ? 'kpi-card__trend--up' : 'kpi-card__trend--down'
                  }`}
                >
                  {card.trendUp ? '▲' : '▼'} {card.trend}
                </span>
              )}
            </div>

            <div className="kpi-card__value-row">
              <span className="kpi-card__value">{card.value}</span>
              {card.progress !== undefined && (
                <div className="kpi-card__bar">
                  <div
                    className="kpi-card__bar-fill"
                    style={{ width: `${card.progress}%` }}
                  />
                </div>
              )}
            </div>

            <div className="kpi-card__provenance">
              <span className="kpi-card__dot" />
              {card.provenance}
            </div>
          </article>
        ))}
      </section>

      <section className="dashboard__main-grid">
        <article className="panel panel--queue">
          <header className="panel__header">
            <h2 className="panel__title">Vessel queue</h2>
            <button type="button" className="panel__link">
              View all →
            </button>
          </header>

          <div className="queue-table">
            <div className="queue-table__head">
              <span>Vessel</span>
              <span>Wait time</span>
              <span>Berth</span>
              <span>Provenance</span>
            </div>

            {vesselQueue.map((v) => (
              <div key={v.name} className="queue-table__row">
                <span className="queue-table__name">{v.name}</span>
                <span className="queue-table__wait">{v.wait}</span>
                <span className="queue-table__berth">{v.berth}</span>
                <span
                  className={`queue-table__prov queue-table__prov--${v.provenance.toLowerCase()}`}
                >
                  <span className="queue-table__dot" />
                  {v.provenance}
                </span>
              </div>
            ))}
          </div>

          <footer className="panel__footer">
            <span className="panel__footer-link">+ 3 more vessels</span>
            <span className="panel__footer-meta">QUEUE HORIZON: 12h</span>
          </footer>
        </article>

        <article className="panel panel--status">
          <header className="panel__header">
            <h2 className="panel__title">Port status</h2>
            <button type="button" className="panel__link">
              Open map →
            </button>
          </header>

          <div className="status-map">
            <div className="status-map__canvas">
              <span className="status-map__label">KILINDINI HARBOUR</span>
            </div>
          </div>

          <div className="berth-list">
            <div className="berth-list__title">Berth occupancy</div>
            {berthOccupancy.map((b) => (
              <div key={b.name} className="berth-row">
                <span className="berth-row__name">{b.name}</span>
                <div className="berth-row__track">
                  <div
                    className={`berth-row__fill berth-row__fill--${b.tone}`}
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
                <span className="berth-row__pct">{b.pct}%</span>
              </div>
            ))}
          </div>

          <footer className="panel__footer">
            <span className="panel__footer-meta">
              <span className="kpi-card__dot" /> MEASURED
            </span>
            <span className="panel__footer-meta">updated 14:22</span>
          </footer>
        </article>
      </section>

      <section className="dashboard__bottom-grid">
        <article className="panel panel--prediction">
          <header className="panel__header">
            <h2 className="panel__title">Latest marine prediction</h2>
            <button type="button" className="panel__link">
              New →
            </button>
          </header>
          <div className="prediction-canvas">
            <div className="prediction-canvas__placeholder">
              <span>Flow field visualization</span>
              <span className="prediction-canvas__hint">
                FNO output · current scenario
              </span>
            </div>
          </div>
        </article>

        <article className="panel panel--sims">
          <header className="panel__header">
            <h2 className="panel__title">Recent simulations</h2>
            <span className="panel__meta">ENSEMBLE 24h</span>
          </header>

          <div className="sim-list">
            {recentSims.map((s) => (
              <div key={s.id} className="sim-row">
                <div className="sim-row__left">
                  <span className="sim-row__id">Run {s.id}</span>
                  <span className="sim-row__name">{s.name}</span>
                </div>
                <div className="sim-row__right">
                  <span className="sim-row__duration">{s.duration}</span>
                  <span
                    className={`sim-row__status sim-row__status--${s.status.toLowerCase()}`}
                  >
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}