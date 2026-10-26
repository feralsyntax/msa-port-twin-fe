import { NavLink, Outlet } from 'react-router-dom'
import './Shell.scss'

const primaryNav = [
  {
    to: '/',
    label: 'Dashboard',
    end: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="0.5" />
        <rect x="14" y="3" width="7" height="7" rx="0.5" />
        <rect x="14" y="14" width="7" height="7" rx="0.5" />
        <rect x="3" y="14" width="7" height="7" rx="0.5" />
      </svg>
    ),
  },
  {
    to: '/vessels',
    label: 'Vessels',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 19c2 0 3-1 5-1s3 1 5 1 3-1 5-1 3 1 5 1" />
        <path d="M4 14l2-8h12l2 8" />
        <path d="M12 6V2" />
      </svg>
    ),
  },
  {
    to: '/berths',
    label: 'Berths',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16" />
        <path d="M3 11h18" />
        <path d="M8 21v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
      </svg>
    ),
  },
  {
    to: '/predictions',
    label: 'Marine Predictions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    to: '/simulations',
    label: 'Simulations',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  {
    to: '/map',
    label: 'Marine Map',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    ),
  },
]

export default function Shell() {
  return (
    <div className="shell">
      <aside className="shell__rail" aria-label="Primary navigation">
        <div className="shell__rail-top">
          <div className="shell__brand">
            <svg
              className="shell__brand-glyph"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" stroke="#1E2E3F" strokeWidth="1.2" />
              <polygon
                points="12,3 14,10 21,12 14,14 12,21 10,14 3,12 10,10"
                fill="#00D2C8"
                fillOpacity="0.25"
                stroke="#00D2C8"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="12" r="1.5" fill="#E6F0F5" />
            </svg>
            <span className="shell__brand-wordmark">MSA PORTTWIN</span>
          </div>

          <nav className="shell__nav" aria-label="Primary Navigation">
            {primaryNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `shell__nav-item${isActive ? ' shell__nav-item--active' : ''}`
                }
              >
                <span className="shell__nav-icon">{item.icon}</span>
                <span className="shell__nav-label">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="shell__divider" />

          <div className="shell__secondary">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `shell__nav-item shell__nav-item--secondary${isActive ? ' shell__nav-item--active' : ''}`
              }
            >
              <span className="shell__nav-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </span>
              <span className="shell__nav-label">About</span>
            </NavLink>
          </div>
        </div>

                <div className="shell__status">
          <div className="shell__status-row">
            <div className="shell__status-live">
              <span className="shell__status-dot" aria-hidden="true">
                <span className="shell__status-dot-pulse" />
                <span className="shell__status-dot-core" />
              </span>
              <span className="shell__status-label">LIVE</span>
            </div>
            <span className="shell__status-version">v1.4.0-TWIN</span>
          </div>
        </div>
      </aside>

      <      <div className="shell__main">
        <header className="shell__topbar">
          <div className="shell__topbar-left">
            <div
              className="shell__title-placeholder"
              aria-label="Page title placeholder"
            />
          </div>

          <div className="shell__topbar-right">
            <div className="shell__search" role="search">
              <div className="shell__search-field">
                <svg
                  className="shell__search-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span className="shell__search-placeholder">Search...</span>
              </div>
              <kbd className="shell__search-kbd">⌘K</kbd>
            </div>

            <button
              type="button"
              className="shell__action"
              aria-label="Primary action"
            >
              <span className="shell__action-placeholder" />
            </button>
          </div>
        </header>

        <section className="shell__content" aria-label="Main content">
          <Outlet />
        </section>
      </div>
    </div>
  )
}