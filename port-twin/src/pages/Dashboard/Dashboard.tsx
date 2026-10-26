import './Dashboard.scss'

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

const upcomingArrivals = [
  { id: 'v1', name: 'MV KWALE STAR', eta: '14:20', berth: 'Berth 3', status: 'Assigned' },
  { id: 'v2', name: 'CMA CGM MAASAI', eta: '15:45', berth: 'Berth 1', status: 'Pending' },
  { id: 'v3', name: 'PACIFIC JADE', eta: '16:10', berth: '—', status: 'Anchored' },
  { id: 'v4', name: 'NYALI TUG', eta: '16:40', berth: 'Berth 4', status: 'Assigned' },
]

const recentScenarios = [
  { id: 's1', name: 'Berth 2 Closure + 3 Arrivals', time: '11:42', result: 'Queue +1.2 h' },
  { id: 's2', name: 'High Tide Window Optimisation', time: '09:15', result: 'Wait −0.6 h' },
  { id: 's3', name: 'Channel Restriction Scenario', time: 'Yesterday', result: 'Infeasible' },
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

        {/* Section 3 — Main Operational Grid */}
        <section className="dashboard__grid" aria-label="Operational overview">
          {/* Left column: Map preview + Congestion */}
          <div className="dashboard__col">
            <article className="panel">
              <header className="panel__header">
                <h2 className="panel__title">Port Overview</h2>
                <span className="panel__badge panel__badge--signal">LIVE</span>
              </header>
              <div className="panel__body panel__body--map">
                <div className="map-preview">
                  <div className="map-preview__placeholder">
                    <span className="map-preview__label">KILINDINI HARBOUR</span>
                    <span className="map-preview__coords">04°03'S 39°38'E</span>
                  </div>
                </div>
              </div>
            </article>

            <article className="panel">
              <header className="panel__header">
                <h2 className="panel__title">Congestion Status</h2>
              </header>
              <div className="panel__body">
                <div className="congestion-row">
                  <span className="congestion-row__label">Channel</span>
                  <div className="congestion-bar">
                    <div className="congestion-bar__fill congestion-bar__fill--moderate" style={{ width: '62%' }} />
                  </div>
                  <span className="congestion-row__value">Moderate</span>
                </div>
                <div className="congestion-row">
                  <span className="congestion-row__label">Anchorage</span>
                  <div className="congestion-bar">
                    <div className="congestion-bar__fill congestion-bar__fill--low" style={{ width: '28%' }} />
                  </div>
                  <span className="congestion-row__value">Low</span>
                </div>
                <div className="congestion-row">
                  <span className="congestion-row__label">Berth queue</span>
                  <div className="congestion-bar">
                    <div className="congestion-bar__fill congestion-bar__fill--high" style={{ width: '78%' }} />
                  </div>
                  <span className="congestion-row__value">Elevated</span>
                </div>
              </div>
            </article>
          </div>

          {/* Right column: Arrivals + Recent scenarios */}
          <div className="dashboard__col">
            <article className="panel">
              <header className="panel__header">
                <h2 className="panel__title">Upcoming Arrivals</h2>
                <span className="panel__meta">Next 6 h</span>
              </header>
              <div className="panel__body panel__body--list">
                <ul className="arrival-list">
                  {upcomingArrivals.map((v) => (
                    <li key={v.id} className="arrival-list__item">
                      <div className="arrival-list__main">
                        <span className="arrival-list__name">{v.name}</span>
                        <span className="arrival-list__eta">{v.eta}</span>
                      </div>
                      <div className="arrival-list__meta">
                        <span className="arrival-list__berth">{v.berth}</span>
                        <span className={`arrival-list__status arrival-list__status--${v.status.toLowerCase()}`}>
                          {v.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <article className="panel">
              <header className="panel__header">
                <h2 className="panel__title">Recent Scenarios</h2>
                <button type="button" className="panel__action">
                  View all
                </button>
              </header>
              <div className="panel__body panel__body--list">
                <ul className="scenario-list">
                  {recentScenarios.map((s) => (
                    <li key={s.id} className="scenario-list__item">
                      <div className="scenario-list__main">
                        <span className="scenario-list__name">{s.name}</span>
                        <span className="scenario-list__time">{s.time}</span>
                      </div>
                      <span className="scenario-list__result">{s.result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  )
}