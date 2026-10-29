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
        <div className="landing__nav-left">
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
          <span className="landing__nav-sector">SECTOR 04°03'S 39°38'E</span>
        </div>

        <nav className="landing__nav-links" aria-label="Landing">
          <a href="#architecture">ARCHITECTURE</a>
          <a href="#provenance">PROVENANCE</a>
          <a href="#specifications">SPECIFICATIONS</a>
          <Link to="/app" className="landing__nav-cta">
            ENTER DASHBOARD
          </Link>
        </nav>
      </header>

      <section className="landing__hero">
        <div className="landing__hero-grid">
          <div className="landing__hero-copy">
            <div className="landing__badges">
              <span className="landing__badge landing__badge--live">
                <span className="landing__badge-pip" />
                MARITIME DIGITAL TWIN
              </span>
              <span className="landing__badge">PORT OF MOMBASA</span>
            </div>

            <h1 className="landing__title">
              Navigate the future of
              <br />
              port operations.
            </h1>

            <p className="landing__lead">
              An AI-powered hydrodynamic and vessel queueing twin for the Port of
              Mombasa. Simulate conditions, predict congestion, and optimize berth
              scheduling.
            </p>

            <div className="landing__actions">
              <Link to="/app" className="landing__btn landing__btn--primary">
                ENTER DASHBOARD →
              </Link>
              <a href="#provenance" className="landing__btn landing__btn--ghost">
                INSPECT PROVENANCE SPEC
              </a>
            </div>

            <div className="landing__metrics">
              <div className="landing__metric">
                <span className="landing__metric-label">LATENCY</span>
                <strong className="landing__metric-value">
                  42ms <span>· REALTIME</span>
                </strong>
              </div>
              <div className="landing__metric">
                <span className="landing__metric-label">TELEMETRY INGEST</span>
                <strong className="landing__metric-value">AIS / SENSOR 100%</strong>
              </div>
              <div className="landing__metric">
                <span className="landing__metric-label">HYDRODYNAMIC FNO</span>
                <strong className="landing__metric-value">2D SHALLOW-WATER</strong>
              </div>
            </div>
          </div>

                    <aside className="landing__hero-panel" aria-label="Map surface preview">
            <div className="landing__panel-bar">
              <span className="landing__panel-bar-left">
                <span className="landing__panel-pip" />
                KILINDINI_TWIN // MAP_SURFACE
              </span>
              <span className="landing__panel-bar-right">
                <span>PROJECTION: UTM 37S</span>
                <span className="landing__panel-time">14:22 UTC</span>
              </span>
            </div>

            <div className="landing__panel-map">
              <svg
                className="landing__panel-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 900 520"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="landing-carto-grid"
                    width="60"
                    height="60"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 60 0 L 0 0 0 60"
                      fill="none"
                      stroke="#1E2E3F"
                      strokeWidth="0.5"
                      strokeDasharray="2 4"
                      strokeOpacity="0.6"
                    />
                  </pattern>
                  <marker
                    id="landing-flow-arrow"
                    viewBox="0 0 6 6"
                    refX="5"
                    refY="3"
                    markerWidth="4"
                    markerHeight="4"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 5 3 L 0 5 z" fill="#00D2C8" fillOpacity="0.7" />
                  </marker>
                </defs>

                <rect width="900" height="520" fill="#06121B" />
                <rect width="900" height="520" fill="url(#landing-carto-grid)" />

                <g opacity="0.18" stroke="#00D2C8" strokeWidth="0.75">
                  <line x1="342" y1="270" x2="0" y2="104" />
                  <line x1="342" y1="270" x2="0" y2="270" />
                  <line x1="342" y1="270" x2="135" y2="0" />
                  <line x1="342" y1="270" x2="342" y2="0" />
                  <line x1="342" y1="270" x2="630" y2="0" />
                  <line x1="342" y1="270" x2="900" y2="130" />
                  <line x1="342" y1="270" x2="900" y2="270" />
                  <line x1="342" y1="270" x2="900" y2="416" />
                  <line x1="342" y1="270" x2="720" y2="520" />
                  <line x1="342" y1="270" x2="342" y2="520" />
                  <circle cx="342" cy="270" r="90" fill="none" strokeDasharray="3 5" />
                  <circle cx="342" cy="270" r="170" fill="none" strokeDasharray="1 8" />
                </g>

                <g fill="none" stroke="#1E2E3F" strokeWidth="1.2" strokeDasharray="3 3">
                  <path d="M -20,180 C 180,190 280,220 380,280 S 560,360 720,370 860,390 980,400" />
                  <path
                    d="M -20,230 C 200,240 300,280 420,330 S 620,410 780,420 900,440 980,450"
                    stroke="#2C4257"
                  />
                </g>

                <path
                  d="M -20,-20 L 300,-20 L 290,90 C 275,130 240,155 185,175 L 110,205 C 60,230 30,280 15,340 L -20,360 Z"
                  fill="#1A211E"
                  stroke="#1E2E3F"
                  strokeWidth="1.2"
                />
                <path
                  d="M -20,400 C 90,392 150,370 200,340 C 260,300 300,270 350,255 L 470,245 C 540,245 610,265 670,295 C 740,335 810,360 900,360 L 980,375 L 980,560 L -20,560 Z"
                  fill="#1A211E"
                  stroke="#1E2E3F"
                  strokeWidth="1.2"
                />

                <g fill="#5F7688" fontFamily="'JetBrains Mono', monospace" fontSize="9">
                  <text x="210" y="210">14.2m</text>
                  <text x="290" y="250">15.8m</text>
                  <text x="390" y="285">16.4m</text>
                  <text x="500" y="320">17.1m</text>
                  <text x="320" y="190" fill="#2C4257">9.6m</text>
                </g>

                <g>
                  <g transform="rotate(-26, 190, 160)">
                    <rect x="190" y="160" width="56" height="16" rx="1" fill="#0C1C2A" stroke="#00D2C8" strokeWidth="1.2" />
                    <text x="196" y="172" fill="#00D2C8" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="600">BERTH 1</text>
                  </g>
                  <g transform="rotate(-26, 150, 185)">
                    <rect x="150" y="185" width="56" height="16" rx="1" fill="#0C1C2A" stroke="#00D2C8" strokeWidth="1.2" />
                    <text x="156" y="197" fill="#00D2C8" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="600">BERTH 2</text>
                  </g>
                  <g transform="rotate(-26, 110, 210)">
                    <rect x="110" y="210" width="56" height="16" rx="1" fill="#0C1C2A" stroke="#00D2C8" strokeWidth="1.5" />
                    <text x="116" y="222" fill="#00D2C8" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="600">BERTH 3</text>
                  </g>
                </g>

                <g
                  stroke="#00D2C8"
                  strokeOpacity="0.65"
                  strokeWidth="1.2"
                  strokeDasharray="2 3"
                  markerEnd="url(#landing-flow-arrow)"
                >
                  <line x1="280" y1="250" x2="320" y2="265" />
                  <line x1="340" y1="275" x2="380" y2="290" />
                  <line x1="400" y1="300" x2="440" y2="315" />
                  <line x1="360" y1="240" x2="400" y2="255" />
                  <line x1="420" y1="270" x2="460" y2="285" />
                  <line x1="480" y1="300" x2="520" y2="315" />
                </g>

                <g>
                  <g transform="translate(260, 220)">
                    <polygon points="0,-5 5,0 0,5 -5,0" fill="#E6F0F5" stroke="#06121B" strokeWidth="1" />
                  </g>
                  <g transform="translate(520, 300)">
                    <polygon points="0,-5 5,0 0,5 -5,0" fill="#E6F0F5" stroke="#06121B" strokeWidth="1" />
                  </g>
                  <g transform="translate(640, 340)">
                    <polygon points="0,-5 5,0 0,5 -5,0" fill="#E6F0F5" stroke="#06121B" strokeWidth="1" opacity="0.85" />
                  </g>

                  {/* Active MV KWALE STAR */}
                  <g transform="translate(400, 290)">
                    <circle cx="0" cy="0" r="10" fill="none" stroke="#00D2C8" strokeWidth="1.2" opacity="0.7" />
                    <circle cx="0" cy="0" r="6" fill="#00D2C8" fillOpacity="0.25" stroke="#00D2C8" strokeWidth="1.2" />
                    <polygon points="0,-6 6,0 0,6 -6,0" fill="#00D2C8" stroke="#06121B" strokeWidth="1.2" />
                    <circle cx="0" cy="0" r="1.5" fill="#E6F0F5" />
                    <line x1="0" y1="0" x2="16" y2="-14" stroke="#00D2C8" strokeWidth="1.2" strokeDasharray="2 2" />
                  </g>
                </g>

                {/* Callout */}
                <g transform="translate(470, 200)">
                  <rect width="128" height="36" rx="2" fill="#0C1C2A" fillOpacity="0.95" stroke="#00D2C8" strokeWidth="1" />
                  <text x="10" y="15" fill="#E6F0F5" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="600">MV KWALE STAR</text>
                  <text x="10" y="28" fill="#00D2C8" fontFamily="'JetBrains Mono', monospace" fontSize="8">BERTH 3 ASSIGNED</text>
                </g>

                {/* Compass */}
                <g transform="translate(840, 36)">
                  <circle cx="0" cy="0" r="16" fill="#0C1C2A" stroke="#1E2E3F" strokeWidth="1" />
                  <text x="0" y="4" textAnchor="middle" fill="#00D2C8" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="700">N</text>
                </g>
              </svg>

              <div className="landing__panel-footer">
                <span>SURFACE 01 // HYDRODYNAMIC_TWIN</span>
                <span className="landing__panel-footer-live">
                  <span className="landing__panel-pip" />
                  FNO NEURAL SOLVER
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>










            <section className="landing__band" id="architecture">
        <div className="landing__band-inner">
          <div className="landing__band-head">
            <div>
              <p className="landing__section-eyebrow">SYSTEM ARCHITECTURE</p>
              <h2 className="landing__section-title">Three systems. One view.</h2>
            </div>
            <p className="landing__band-aside">
              A coupled operational model bringing hydrodynamics, vessel queuing,
              and berth allocation into one instrument.
            </p>
          </div>

          <div className="landing__pillars">
            <article className="landing__pillar">
              <div className="landing__pillar-top">
                <span className="landing__pillar-index">PILLAR 01</span>
                <span className="landing__pill landing__pill--model">MODEL</span>
              </div>
              <h3 className="landing__pillar-title">Marine-Condition Modelling</h3>
              <p className="landing__pillar-body">
                Fourier Neural Operator (FNO) networks estimate water-flow patterns
                based on 2D shallow-water equations in real time.
              </p>
              <dl className="landing__pillar-meta">
                <div>
                  <dt>Resolution:</dt>
                  <dd>5m bathymetric mesh</dd>
                </div>
                <div>
                  <dt>Update interval:</dt>
                  <dd>10-minute cadence</dd>
                </div>
              </dl>
            </article>

            <article className="landing__pillar">
              <div className="landing__pillar-top">
                <span className="landing__pillar-index">PILLAR 02</span>
                <span className="landing__pill landing__pill--sim">SIMULATED</span>
              </div>
              <h3 className="landing__pillar-title">Vessel Queue Simulation</h3>
              <p className="landing__pillar-body">
                Simulate arrivals, channel occupancy, and waiting times under
                changing operational scenarios, seasonal surges, and weather
                disruptions.
              </p>
              <dl className="landing__pillar-meta">
                <div>
                  <dt>Queue horizon:</dt>
                  <dd>12h – 72h predictive</dd>
                </div>
                <div>
                  <dt>Disruption bounds:</dt>
                  <dd className="landing__pillar-meta-accent">Monte Carlo variance</dd>
                </div>
              </dl>
            </article>

            <article className="landing__pillar">
              <div className="landing__pillar-top">
                <span className="landing__pillar-index">PILLAR 03</span>
                <span className="landing__pill landing__pill--opt">OPTIMIZED</span>
              </div>
              <h3 className="landing__pillar-title">Schedule Optimization</h3>
              <p className="landing__pillar-body">
                Compare baseline and optimized berth schedules to minimize
                congestion, reduce dwell times, and coordinate tugboat assist
                assets.
              </p>
              <dl className="landing__pillar-meta">
                <div>
                  <dt>Avg Dwell Reduction:</dt>
                  <dd className="landing__pillar-meta-good">-18.4% target</dd>
                </div>
                <div>
                  <dt>Berth turnaround:</dt>
                  <dd>4 designated quays</dd>
                </div>
              </dl>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}