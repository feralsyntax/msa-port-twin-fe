import './Dashboard.scss';

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

      {/* Content area — next sections will go here */}
      <div className="dashboard__content">
        {/* Section 2 will start here */}
      </div>
    </div>
  )
}