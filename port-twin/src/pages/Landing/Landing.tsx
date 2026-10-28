import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Landing.scss';

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
          <svg className="landing__brand-glyph" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
          <a href="#systems">Architecture</a>
          <a href="#trust">Data trust</a>
          <a href="#demo">Demo</a>
          <Link to="/app" className="landing__nav-cta">
            Open dashboard
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="landing__hero">
        <div className="landing__hero-copy">
          <p className="landing__eyebrow">
            <span className="landing__live-pip" />
            Port of Mombasa · Digital twin · Huawei Cloud
          </p>
          <h1 className="landing__title">Navigate the future of port operations.</h1>
          <p className="landing__lead">
            An AI-powered hydrodynamic and vessel-queueing twin for the Port of
            Mombasa. Simulate conditions, predict congestion, and optimise berth
            scheduling — with every value labelled measured, model, or simulated.
          </p>
          <div className="landing__actions">
            <Link to="/app" className="landing__btn landing__btn--primary">
              Open dashboard
            </Link>
            <a href="#systems" className="landing__btn landing__btn--ghost">
              View architecture
            </a>
          </div>
          <div className="landing__stat-row">
            <div className="landing__stat">
              <span className="landing__stat-label">Status</span>
              <strong>Live twin</strong>
            </div>
            <div className="landing__stat">
              <span className="landing__stat-label">AIS</span>
              <strong>Vessel feeds</strong>
            </div>
            <div className="landing__stat">
              <span className="landing__stat-label">FNO</span>
              <strong>Channel model</strong>
            </div>
          </div>
        </div>

        <div className="landing__hero-visual" aria-hidden="true">
          <div className="landing__screen">
            <div className="landing__screen-bar">
              <span className="landing__screen-dots">
                <i /><i /><i />
              </span>
              <span className="landing__screen-title">KILINDINI · OPERATIONS VIEW</span>
              <span className="landing__screen-live">LIVE</span>
            </div>
            <div className="landing__screen-body">
              <div className="landing__screen-kpis">
                <div><span>IN PORT</span><strong>14</strong></div>
                <div><span>WAIT</span><strong>3.2h</strong></div>
                <div><span>UTIL</span><strong>78%</strong></div>
              </div>
              <div className="landing__screen-map">
                <div className="landing__screen-channel" />
                <div className="landing__screen-vessel landing__screen-vessel--a" />
                <div className="landing__screen-vessel landing__screen-vessel--b" />
                <div className="landing__screen-vessel landing__screen-vessel--c" />
                <span className="landing__screen-map-tag">RADAR ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three systems */}
      <section className="landing__band" id="systems">
        <div className="landing__band-inner">
          <div className="landing__band-head">
            <div>
              <p className="landing__section-eyebrow">System architecture</p>
              <h2 className="landing__section-title">Three systems. One view.</h2>
            </div>
            <p className="landing__band-aside">
              A coupled operational model linking hydrodynamics, vessel queueing,
              and berth allocation under one instrument.
            </p>
          </div>

          <div className="landing__systems">
            <article className="landing__system">
              <span className="landing__pill landing__pill--model">MODEL</span>
              <h3 className="landing__card-title">Marine-Condition Modelling</h3>
              <p className="landing__card-body">
                Fourier Neural Operator (FNO) estimates channel state. Tide, current,
                and depth context feed safe transit windows on the approach.
              </p>
              <span className="landing__system-meta">Grid · channel flow · ModelArts</span>
            </article>
            <article className="landing__system">
              <span className="landing__pill landing__pill--sim">SIMULATED</span>
              <h3 className="landing__card-title">Vessel Queue Simulation</h3>
              <p className="landing__card-body">
                Arrival pressure, anchorage, and waiting times under changing
                throughput so congestion is visible before it compounds.
              </p>
              <span className="landing__system-meta">Queue horizon · wait metrics</span>
            </article>
            <article className="landing__system">
              <span className="landing__pill landing__pill--measured">MEASURED</span>
              <h3 className="landing__card-title">Schedule Optimisation</h3>
              <p className="landing__card-body">
                Compare baseline and optimised berth plans. Scenario history keeps
                decisions reviewable with clear provenance.
              </p>
              <span className="landing__system-meta">Berths · scenarios · history</span>
            </article>
          </div>
        </div>
      </section>

      {/* Data trust */}
      <section className="landing__band landing__band--muted" id="trust">
        <div className="landing__band-inner">
          <div className="landing__band-head">
            <div>
              <p className="landing__section-eyebrow">The trust layer</p>
              <h2 className="landing__section-title">Data you can trust.</h2>
            </div>
            <p className="landing__band-aside">
              Every readout is tagged so operators and judges always know whether
              a number is measured, modelled, historical, or simulated.
            </p>
          </div>

          <div className="landing__trust-grid">
            <article className="landing__trust-card">
              <span className="landing__pill landing__pill--measured">MEASURED</span>
              <h3 className="landing__card-title">Live AIS &amp; berths</h3>
              <p className="landing__card-body">
                Observed vessel presence and berth occupancy when feeds are
                connected — labelled measured in the UI.
              </p>
            </article>
            <article className="landing__trust-card">
              <span className="landing__pill landing__pill--model">MODEL</span>
              <h3 className="landing__card-title">Channel predictions</h3>
              <p className="landing__card-body">
                FNO-derived flow and water-level context for the fairway, never
                mixed silently with sensor values.
              </p>
            </article>
            <article className="landing__trust-card">
              <span className="landing__pill landing__pill--sim">SIMULATED</span>
              <h3 className="landing__card-title">Scenario outputs</h3>
              <p className="landing__card-body">
                Queue and schedule runs stay marked simulated so demo figures are
                not mistaken for live port state.
              </p>
            </article>
            <article className="landing__trust-card landing__trust-card--note">
              <h3 className="landing__card-title">Competition transparency</h3>
              <p className="landing__card-body">
                This build ships with labelled demo data. Backend ModelArts, ECS,
                and PostGIS services replace placeholders as they come online.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing__cta-band" id="demo">
        <div className="landing__band-inner landing__cta">
          <div>
            <p className="landing__section-eyebrow">Ready to inspect</p>
            <h2 className="landing__section-title">Enter the operations instrument</h2>
            <p className="landing__card-body">
              Dashboard, marine map, and scenario placeholders — same design system
              as the control-room shell.
            </p>
          </div>
          <Link to="/app" className="landing__btn landing__btn--primary">
            Launch dashboard
          </Link>
        </div>
      </section>

      <footer className="landing__footer">
        <div className="landing__band-inner landing__footer-inner">
          <span className="landing__footer-brand">MSA PORTTWIN</span>
          <span className="landing__footer-meta">
            Huawei competition · Port of Mombasa · Demo build
          </span>
        </div>
      </footer>
    </div>
  )
}