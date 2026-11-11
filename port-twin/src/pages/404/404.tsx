import { useLocation, useNavigate } from 'react-router-dom';
import './404.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleStepBack = () => {
    if (location.key !== 'default' && window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate('/app/dashboard');
  };

  return (
    <main className="not-found-page">
      {/* Background Depth Contours and Radar Grid */}
      <div className="not-found-page__background" aria-hidden="true">
        <svg
          className="not-found-page__radar"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 600 600"
        >
          <circle
            className="not-found-page__signal-ring"
            cx="300"
            cy="300"
            r="80"
            strokeDasharray="2 4"
            strokeWidth="0.75"
          />
          <circle cx="300" cy="300" r="140" strokeWidth="0.75" />
          <circle cx="300" cy="300" r="200" strokeDasharray="4 6" strokeWidth="0.75" />
          <circle cx="300" cy="300" r="260" strokeWidth="0.75" />

          {/* Rhumb Lines */}
          <line strokeDasharray="3 3" strokeWidth="0.5" x1="300" x2="300" y1="20" y2="580" />
          <line strokeDasharray="3 3" strokeWidth="0.5" x1="20" x2="580" y1="300" y2="300" />
          <line strokeDasharray="1 5" strokeWidth="0.5" x1="102" x2="498" y1="102" y2="498" />
          <line strokeDasharray="1 5" strokeWidth="0.5" x1="102" x2="498" y1="498" y2="102" />

          {/* Depth Soundings */}
          <g
            fill="#5F7688"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="8"
            letterSpacing="1"
            stroke="none"
          >
            <text x="306" y="150">
              D-48m
            </text>
            <text x="445" y="304">
              D-112m
            </text>
            <text x="306" y="510">
              D-240m
            </text>
            <text x="80" y="304">
              NULL_DEPTH
            </text>
          </g>
        </svg>
      </div>

      {/* Main Diagnostics Content */}
      <div className="not-found-page__content">
        {/* Navigational Compass */}
        <div className="not-found-page__compass">
          <div className="not-found-page__compass-halo">
            <div className="not-found-page__compass-inner" />
          </div>

          <svg
            className="not-found-page__compass-rose"
            fill="none"
            viewBox="0 0 64 64"
            aria-hidden="true"
          >
            {/* Crosshairs */}
            <line
              stroke="#00D2C8"
              strokeOpacity="0.4"
              strokeWidth="0.8"
              x1="32"
              x2="32"
              y1="6"
              y2="58"
            />
            <line
              stroke="#00D2C8"
              strokeOpacity="0.4"
              strokeWidth="0.8"
              x1="6"
              x2="58"
              y1="32"
              y2="32"
            />

            <circle
              cx="32"
              cy="32"
              r="18"
              stroke="#00D2C8"
              strokeDasharray="1 3"
              strokeOpacity="0.6"
              strokeWidth="0.8"
            />

            {/* North Needle */}
            <polygon
              fill="#00D2C8"
              points="32,8 35,28 32,25 29,28"
              stroke="#00D2C8"
              strokeWidth="0.5"
            />

            {/* South Needle */}
            <polygon
              fill="#FF5C6C"
              fillOpacity="0.8"
              points="32,56 35,36 32,39 29,36"
              stroke="#FF5C6C"
              strokeWidth="0.5"
            />

            {/* East Needle */}
            <polygon
              fill="#00D2C8"
              fillOpacity="0.25"
              points="56,32 36,35 39,32 36,29"
              stroke="#00D2C8"
              strokeWidth="0.5"
            />

            {/* West Needle */}
            <polygon
              fill="#00D2C8"
              fillOpacity="0.25"
              points="8,32 28,35 25,32 28,29"
              stroke="#00D2C8"
              strokeWidth="0.5"
            />

            {/* Center Pivot */}
            <circle cx="32" cy="32" fill="#06121B" r="2.5" stroke="#00D2C8" strokeWidth="1.2" />
            <circle cx="32" cy="32" fill="#E6F0F5" r="0.8" />
          </svg>

          <span className="not-found-page__deviation">Δ+44.8°</span>
        </div>

        {/* Error Status */}
        <div className="not-found-page__status">
          <span className="not-found-page__status-dot" />
          <span>SIGNAL DISCONNECT // ERROR_404_NULL_ROUTE</span>
        </div>

        {/* Error Heading */}
        <div className="not-found-page__error-code">404</div>

        <h1 className="not-found-page__heading">Route Not Found</h1>

        <p className="not-found-page__description">
          The requested coordinates are off the chart. The page you are looking for does not exist
          or has been moved.
        </p>

        {/* Resolver Telemetry Panel */}
        <section className="not-found-page__telemetry">
          <div className="not-found-page__telemetry-header">
            <span>RESOLVER TELEMETRY</span>
            <span className="not-found-page__telemetry-status">SECTOR_UNRESOLVED</span>
          </div>

          <div className="not-found-page__coordinates">
            <div>
              <span className="not-found-page__coordinate-label">VECTOR_LAT:</span>
              <span className="not-found-page__coordinate-value">00°00'00.0"N</span>
            </div>

            <div>
              <span className="not-found-page__coordinate-label">VECTOR_LON:</span>
              <span className="not-found-page__coordinate-value">00°00'00.0"E</span>
            </div>

            <div className="not-found-page__projection">
              <span>DATUM_PROJECTION:</span>
              <span>EPSG:4326 UNRESOLVED</span>
            </div>
          </div>
        </section>

        {/* Navigation Actions */}
        <div className="not-found-page__actions">
          <button
            type="button"
            className="not-found-page__dashboard-button"
            onClick={() => navigate('/app/dashboard')}
          >
            <span className="material-symbols-outlined">grid_view</span>
            <span>Return to Dashboard</span>
          </button>

          <button type="button" className="not-found-page__back-button" onClick={handleStepBack}>
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Step Back</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
