import { NavLink, Outlet, useLocation } from 'react-router-dom';
import './Shell.scss';
import TopBar from '../components/Common/TopBar/TopBar';
import { routes } from '../utils/routes';

const primaryNav = [
  {
    to: routes.dashboard(),
    label: 'Dashboard',
    end: true,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="7" height="7" rx="0.5" />
        <rect x="14" y="3" width="7" height="7" rx="0.5" />
        <rect x="14" y="14" width="7" height="7" rx="0.5" />
        <rect x="3" y="14" width="7" height="7" rx="0.5" />
      </svg>
    ),
  },
  {
    to: routes.vessels(),
    label: 'Vessels',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 19c2 0 3-1 5-1s3 1 5 1 3-1 5-1 3 1 5 1" />
        <path d="M4 14l2-8h12l2 8" />
        <path d="M12 6V2" />
      </svg>
    ),
  },
  {
    to: routes.berths(),
    label: 'Berths',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 21V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16" />
        <path d="M3 11h18" />
        <path d="M8 21v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
      </svg>
    ),
  },
  {
    to: routes.scenarios(),
    label: 'Scenarios',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="4" r="2" />
        <path d="M12 6v3M5 9h14M5 9v5M12 9v5M19 9v5" />
        <circle cx="5" cy="16" r="2" />
        <circle cx="12" cy="16" r="2" />
        <circle cx="19" cy="16" r="2" />
      </svg>
    ),
  },
  {
    to: routes.predictions(),
    label: 'Marine Predictions',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    to: routes.simulations(),
    label: 'Simulations',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  {
    to: routes.map(),
    label: 'Marine Map',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    ),
  },
];

export default function Shell() {
  const { pathname } = useLocation();
  const isDashboard = pathname === routes.dashboard() || pathname === `${routes.dashboard()}/`;
  const isMap = pathname === routes.map();
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
              to={routes.about()}
              className={({ isActive }) =>
                `shell__nav-item shell__nav-item--secondary${
                  isActive ? ' shell__nav-item--active' : ''
                }`
              }
            >
              <span className="shell__nav-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
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

      <div className="shell__main">
        {(isDashboard || isMap) && (
          <TopBar
            title={isDashboard ? 'Port Operations Dashboard' : 'Marine Map'}
            showSearch={isDashboard}
            searchPlaceholder="Filter telemetry, vessel, berth..."
            sector={
              <>
                <span className="shell__sector-label">SECTOR</span>
                <span className="shell__sector-value">MOMBASA-KILINDINI // 04°03'S 39°38'E</span>
              </>
            }
            action={
              isDashboard ? (
                <button type="button" className="shell__action shell__action--live">
                  <span>New Simulation</span>
                </button>
              ) : (
                <button type="button" className="shell__action shell__action--live">
                  <span>REFRESH DATA</span>
                </button>
              )
            }
          />
        )}

        <section
          className={`shell__content${isMap ? ' shell__content--bleed' : ''}`}
          aria-label="Main content"
        >
          <Outlet />
        </section>
      </div>
    </div>
  );
}
