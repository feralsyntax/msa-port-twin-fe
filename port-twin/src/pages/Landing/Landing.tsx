import { Link } from 'react-router-dom';
import './Landing.scss';
import { useEffect } from 'react';

export default function LandingPage() {
    useEffect(() => {
        const prev = document.body.style.overflow
        document.body.style.overflow = 'auto'
        return () => {
            document.body.style.overflow = prev
        }
    }, [])
  return (
    <div className="landing">
      <header className="landing__nav">
        <div className="landing__brand">
          <svg
            className="landing__brand-glyph"
            viewBox="0 0 24 24"
            fill="none"
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
          <span className="landing__brand-wordmark">MSA PORTTWIN</span>
        </div>

        <nav className="landing__nav-links" aria-label="Landing">
          <a href="#problem">Problem</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#how">How it works</a>
          <Link to="/app" className="landing__nav-cta">
            Open demo
          </Link>
        </nav>
      </header>

      <section className="landing__hero">
        <div className="landing__hero-copy">
          <p className="landing__eyebrow">
            Port of Mombasa · Digital twin · Huawei Cloud
          </p>
          <h1 className="landing__title">
            Maritime instrument for channel flow, vessel queue, and berth decisions
          </h1>
          <p className="landing__lead">
            MSA PortTwin combines hydrodynamic modelling, queue simulation, and
            berth scheduling so operators can test scenarios before they hit the
            fairway — with every number labelled measured, model, or simulated.
          </p>
          <div className="landing__actions">
            <Link to="/app" className="landing__btn landing__btn--primary">
              Explore operations demo
            </Link>
            <a href="#how" className="landing__btn landing__btn--ghost">
              See how it works
            </a>
          </div>
          <p className="landing__disclaimer">
            Demo data is simulated for competition review. Live AIS and model
            endpoints wire in as backend services come online.
          </p>
        </div>

        <div className="landing__hero-panel" aria-hidden="true">
          <div className="landing__monitor">
            <div className="landing__monitor-bar">
              <span className="landing__monitor-dot" />
              <span className="landing__monitor-dot" />
              <span className="landing__monitor-dot" />
              <span className="landing__monitor-label">PORT OPERATIONS · LIVE</span>
            </div>
            <div className="landing__monitor-body">
              <div className="landing__monitor-kpi">
                <span>VESSELS IN PORT</span>
                <strong>14</strong>
              </div>
              <div className="landing__monitor-kpi">
                <span>AVG WAIT</span>
                <strong>3.2 h</strong>
              </div>
              <div className="landing__monitor-kpi">
                <span>UTILIZATION</span>
                <strong>78%</strong>
              </div>
              <div className="landing__monitor-map">
                <span className="landing__monitor-map-tag">KILINDINI · RADAR</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}