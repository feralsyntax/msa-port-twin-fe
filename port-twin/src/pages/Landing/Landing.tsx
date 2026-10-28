import { Link } from 'react-router-dom';
import './Landing.scss';
import { useEffect } from 'react';

export default function LandingPage() {
   useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const root = document.getElementById('root')

    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      htmlHeight: html.style.height,
      bodyHeight: body.style.height,
      rootOverflow: root?.style.overflow ?? '',
      rootHeight: root?.style.height ?? '',
      rootMinHeight: root?.style.minHeight ?? '',
    }

    html.style.overflow = 'auto'
    body.style.overflow = 'auto'
    html.style.height = 'auto'
    body.style.height = 'auto'

    if (root) {
      root.style.overflow = 'visible'
      root.style.height = 'auto'
      root.style.minHeight = '100%'
    }

    return () => {
      html.style.overflow = prev.htmlOverflow
      body.style.overflow = prev.bodyOverflow
      html.style.height = prev.htmlHeight
      body.style.height = prev.bodyHeight
      if (root) {
        root.style.overflow = prev.rootOverflow
        root.style.height = prev.rootHeight
        root.style.minHeight = prev.rootMinHeight
      }
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
            fairway  with every number labelled measured, model, or simulated.
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





            <section className="landing__band" id="problem">
        <div className="landing__band-inner">
          <p className="landing__section-eyebrow">The problem</p>
          <h2 className="landing__section-title">
            Congestion, uncertain channel conditions, and opaque schedule trade-offs
          </h2>
          <div className="landing__problem-grid">
            <article className="landing__card">
              <h3 className="landing__card-title">Vessel queue pressure</h3>
              <p className="landing__card-body">
                Arrivals stack outside Kilindini while berth slots and pilot windows
                stay hard to negotiate in one operational picture.
              </p>
            </article>
            <article className="landing__card">
              <h3 className="landing__card-title">Hydrodynamic uncertainty</h3>
              <p className="landing__card-body">
                Depth, current, and tide affect safe transit windows. Operators need
                model-backed channel insight, not only static charts.
              </p>
            </article>
            <article className="landing__card">
              <h3 className="landing__card-title">Schedule opacity</h3>
              <p className="landing__card-body">
                Baseline versus optimised berth plans are difficult to compare when
                data provenance  measured, model, or simulated  is unclear.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="landing__band landing__band--muted" id="capabilities">
        <div className="landing__band-inner">
          <p className="landing__section-eyebrow">Capabilities</p>
          <h2 className="landing__section-title">
            One instrument for flow, queue, and berth decisions
          </h2>
          <div className="landing__cap-grid">
            <article className="landing__cap">
              <span className="landing__cap-tag">MODEL</span>
              <h3 className="landing__card-title">Marine predictions</h3>
              <p className="landing__card-body">
                Fourier Neural Operatorstyle channel flow fields for water level and
                current context on the approach and harbour.
              </p>
            </article>
            <article className="landing__cap">
              <span className="landing__cap-tag landing__cap-tag--measured">MEASURED</span>
              <h3 className="landing__card-title">Operations dashboard</h3>
              <p className="landing__card-body">
                Live-style KPIs for vessels in port, active berths, waiting time, and
                capacity utilisation with explicit provenance chips.
              </p>
            </article>
            <article className="landing__cap">
              <span className="landing__cap-tag landing__cap-tag--sim">SIMULATED</span>
              <h3 className="landing__card-title">Scenario lab</h3>
              <p className="landing__card-body">
                Queue and berth scenarios you can run, compare, and keep in history
                before changing the real schedule.
              </p>
            </article>
            <article className="landing__cap">
              <span className="landing__cap-tag landing__cap-tag--measured">MEASURED</span>
              <h3 className="landing__card-title">Marine map</h3>
              <p className="landing__card-body">
                Cartographic instrument view of Kilindini — vessels, berths, flow
                overlays, and layer controls in one dense canvas.
              </p>
            </article>
          </div>
        </div>
      </section>
          <section className="landing__band" id="how">
        <div className="landing__band-inner">
          <p className="landing__section-eyebrow">How it works</p>
          <h2 className="landing__section-title">
            From harbour state to scenario decision in one path
          </h2>
          <ol className="landing__steps">
            <li className="landing__step">
              <span className="landing__step-index">01</span>
              <div>
                <h3 className="landing__card-title">Observe the port</h3>
                <p className="landing__card-body">
                  Dashboard and marine map show vessels, berths, and queue pressure
                  with measured versus estimated labels.
                </p>
              </div>
            </li>
            <li className="landing__step">
              <span className="landing__step-index">02</span>
              <div>
                <h3 className="landing__card-title">Read the channel</h3>
                <p className="landing__card-body">
                  Marine predictions supply model flow context so transit windows
                  are not guessed from a static chart alone.
                </p>
              </div>
            </li>
            <li className="landing__step">
              <span className="landing__step-index">03</span>
              <div>
                <h3 className="landing__card-title">Run a scenario</h3>
                <p className="landing__card-body">
                  Simulations test queue and berth alternatives; results stay
                  comparable and archived for review.
                </p>
              </div>
            </li>
            <li className="landing__step">
              <span className="landing__step-index">04</span>
              <div>
                <h3 className="landing__card-title">Decide with provenance</h3>
                <p className="landing__card-body">
                  Every figure stays tagged measured, model, historical, or
                  simulated so judges and operators know what they are looking at.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="landing__band landing__band--muted" id="cloud">
        <div className="landing__band-inner landing__cloud">
          <div>
            <p className="landing__section-eyebrow">Platform</p>
            <h2 className="landing__section-title">Built for Huawei Cloud delivery</h2>
            <p className="landing__card-body landing__cloud-copy">
              Training and inference targets ModelArts; application services sit on
              ECS with RDS/PostGIS for spatial state and OBS for artefacts. The
              frontend is the operational instrument over that stack.
            </p>
          </div>
          <ul className="landing__cloud-list">
            <li>ModelArts — FNO marine modelling</li>
            <li>ECS — API and orchestration</li>
            <li>RDS + PostGIS — port and vessel state</li>
            <li>OBS — model and scenario artefacts</li>
          </ul>
        </div>
      </section>

      <section className="landing__cta-band">
        <div className="landing__band-inner landing__cta">
          <h2 className="landing__section-title">Open the operations instrument</h2>
          <p className="landing__card-body">
            Enter the demo shell: dashboard, marine map, and scenario placeholders
            aligned to the Maritime Instrument design system.
          </p>
          <Link to="/app" className="landing__btn landing__btn--primary">
            Launch demo
          </Link>
        </div>
      </section>

      <footer className="landing__footer">
        <div className="landing__band-inner landing__footer-inner">
          <span className="landing__footer-brand">MSA PORTTWIN</span>
          <span className="landing__footer-meta">
            Huawei competition · Port of Mombasa digital twin · Demo build
          </span>
        </div>
      </footer>

      
    </div>
  )
}