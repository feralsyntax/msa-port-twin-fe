import { useState } from 'react';
import './BerthSchedule.scss';

const hours = [
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
]

interface ScheduleRow {
  berth: string
  subtitle: string
  optimized: { label: string; left: string; width: string }
  baseline: { label: string; left: string; width: string }
}

const rows: ScheduleRow[] = [
  {
    berth: 'Berth 1',
    subtitle: 'Container quayside, LOA 310m',
    optimized: {
      label: 'OCEAN HARMONY 14:15–17:30',
      left: '18.75%',
      width: '27.08%',
    },
    baseline: {
      label: 'BASE: OCEAN HARMONY (15:15–19:45)',
      left: '27.08%',
      width: '37.5%',
    },
  },
  {
    berth: 'Berth 2',
    subtitle: 'Container quayside, LOA 280m',
    optimized: {
      label: 'EVER HORIZON 19:00–23:30',
      left: '58.33%',
      width: '37.5%',
    },
    baseline: {
      label: 'BASE: EVER HORIZON (18:30–23:00)',
      left: '54.16%',
      width: '37.5%',
    },
  },
  {
    berth: 'Berth 3',
    subtitle: 'Bulk / General cargo, LOA 220m',
    optimized: {
      label: 'MV KWALE STAR 16:10–21:40',
      left: '34.72%',
      width: '45.83%',
    },
    baseline: {
      label: 'BASE: MV KWALE STAR (17:30–23:00)',
      left: '45.83%',
      width: '45.83%',
    },
  },
  {
    berth: 'Berth 4',
    subtitle: 'Liquid bulk / Tanker, LOA 190m',
    optimized: {
      label: 'PACIFIC TRADER 17:00–22:00',
      left: '41.66%',
      width: '41.66%',
    },
    baseline: {
      label: 'BASE: PACIFIC TRADER (17:00–22:00)',
      left: '41.66%',
      width: '41.66%',
    },
  },
]

const BerthSchedule = () => {
  const [showBaseline, setShowBaseline] = useState(true)

  return (
    <section className="berth-schedule" aria-label="Berth schedule">
      <div className="berth-schedule__controls">
        <div>
          <h2 className="berth-schedule__title">Berth Schedule</h2>
          <p className="berth-schedule__subtitle">
            Temporal allocation comparison across Kilindini quayside berths
            (12:00 – 24:00 UTC)
          </p>
        </div>

        <div className="berth-schedule__legend-wrap">
          <div className="berth-schedule__legend">
            <div className="berth-schedule__legend-item">
              <span className="berth-schedule__swatch berth-schedule__swatch--opt" />
              <span>Optimized (Simulated)</span>
            </div>
            <div className="berth-schedule__legend-item">
              <span className="berth-schedule__swatch berth-schedule__swatch--base" />
              <span>Baseline (Historical)</span>
            </div>
          </div>

          <div className="berth-schedule__toggle-wrap">
            <label className="berth-schedule__toggle-label" htmlFor="baselineToggle">
              Show Baseline
            </label>
            <button
              id="baselineToggle"
              type="button"
              role="switch"
              aria-checked={showBaseline}
              className={`berth-schedule__toggle${
                showBaseline ? ' berth-schedule__toggle--on' : ''
              }`}
              onClick={() => setShowBaseline((prev) => !prev)}
            >
              <span className="berth-schedule__toggle-thumb" />
            </button>
          </div>
        </div>
      </div>

      <div className="berth-schedule__viewport">
        <div className="berth-schedule__chart">
          <div className="berth-schedule__axis">
            {hours.map((hour) => (
              <div key={hour} className="berth-schedule__hour">
                {hour}
              </div>
            ))}
          </div>

          {rows.map((row) => (
            <div key={row.berth} className="berth-schedule__row">
              <div className="berth-schedule__berth">
                <span className="berth-schedule__berth-name">{row.berth}</span>
                <span className="berth-schedule__berth-sub">{row.subtitle}</span>
              </div>

              <div className="berth-schedule__grid" aria-hidden="true">
                {hours.map((hour) => (
                  <div key={hour} />
                ))}
              </div>

              <div className="berth-schedule__track">
                {showBaseline && (
                  <div
                    className="berth-schedule__bar berth-schedule__bar--baseline"
                    style={{ left: row.baseline.left, width: row.baseline.width }}
                  >
                    <span>{row.baseline.label}</span>
                  </div>
                )}
                <div
                  className="berth-schedule__bar berth-schedule__bar--optimized"
                  style={{ left: row.optimized.left, width: row.optimized.width }}
                >
                  <span>{row.optimized.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="berth-schedule__footnote">
        <span>
          Gantt Resolution: 5 min steps // Port Area: Kilindini Channel South
        </span>
        <span>Tidal Window: High Water 17:42 UTC (3.6m)</span>
      </div>
    </section>
  )
}

export default BerthSchedule