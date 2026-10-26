import './Dashboard.scss'
//Dummy 
const kpiCards = [
  {
    id: 'vessels',
    label: 'Monitored Vessels',
    value: '48',
    sub: '12 in channel',
    tone: 'signal' as const,
  },
  {
    id: 'waiting',
    label: 'Vessels Waiting',
    value: '6',
    sub: 'Avg queue 2.4 h',
    tone: 'amber' as const,
  },
  {
    id: 'wait-time',
    label: 'Avg Waiting Time',
    value: '1.8 h',
    sub: '−0.4 h vs baseline',
    tone: 'moss' as const,
  },
  {
    id: 'berth-util',
    label: 'Berth Utilization',
    value: '87%',
    sub: '11 of 14 berths',
    tone: 'signal' as const,
  },
]

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* Top Operational Header */}
      <header className="dashboard__header">
        <div className="dashboard__header-left">
          <h1 className="dashboard__title">Port Operations Dashboard</h1>
          <div className="dashboard__sector">
            <span className="dashboard__sector-label">SECTOR</span>
            <span className="dashboard__sector-value">
              MOMBASA-KILINDINI // 04°03'S 39°38'E
            </span>
          </div>
        </div>

        <div className="dashboard__header-right">
          <div className="dashboard__search">
            <svg
              className="dashboard__search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              className="dashboard__search-input"
              placeholder="Filter telemetry, vessel, berth..."
            />
            <kbd className="dashboard__search-kbd">⌘K</kbd>
          </div>

          <button type="button" className="dashboard__primary-btn">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
            <span>New Simulation</span>
          </button>
        </div>
      </header>

      {/* Content area */}
      <div className="dashboard__content">
        {/* Section 2 — KPI Cards */}
        <section className="dashboard__kpi-row" aria-label="Key performance indicators">
          {kpiCards.map((card) => (
            <article key={card.id} className="kpi-card">
              <div className="kpi-card__label">{card.label}</div>
              <div className={`kpi-card__value kpi-card__value--${card.tone}`}>
                {card.value}
              </div>
              <div className="kpi-card__sub">{card.sub}</div>
            </article>
          ))}
        </section>

        {/* Section 3 will go here */}
      </div>
    </div>
  )
}