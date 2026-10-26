import { Outlet } from 'react-router-dom'
import './Shell.scss'

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

          {/* Nav items added in next section */}
          <nav className="shell__nav" aria-label="Primary Navigation" />
        </div>

        {/* Status footer added in a later section */}
        <div className="shell__status" />
      </aside>

      <div className="shell__main">
        {/* Top bar added in a later section */}
        <header className="shell__topbar" />

        <section className="shell__content" aria-label="Main content">
          <Outlet />
        </section>
      </div>
    </div>
  )
}