import { useCallback, useRef, useState } from 'react';
import './Map.scss';

type Point = { x: number; y: number }

type LayerKey = 'vessels' | 'flow' | 'berths' | 'tracks'

const layerConfig: {
  key: LayerKey
  label: string
  provenance: 'MEASURED' | 'MODEL' | 'HISTORICAL'
  defaultOn: boolean
}[] = [
  { key: 'vessels', label: 'Vessels', provenance: 'MEASURED', defaultOn: true },
  { key: 'flow', label: 'Flow field', provenance: 'MODEL', defaultOn: true },
  { key: 'berths', label: 'Berth occupancy', provenance: 'MEASURED', defaultOn: true },
  { key: 'tracks', label: 'Vessel tracks', provenance: 'HISTORICAL', defaultOn: false },
]

export default function MapPage() {
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const dragOrigin = useRef<Point | null>(null)
  const offsetOrigin = useRef<Point>({ x: 0, y: 0 })
  const [inspectorOpen, setInspectorOpen] = useState(true)

  const [layers, setLayers] = useState<Record<LayerKey, boolean>>(() =>
    Object.fromEntries(
      layerConfig.map((l) => [l.key, l.defaultOn]),
    ) as Record<LayerKey, boolean>,
  )

  const activeCount = Object.values(layers).filter(Boolean).length

  const toggleLayer = (key: LayerKey) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return
      event.currentTarget.setPointerCapture(event.pointerId)
      dragOrigin.current = { x: event.clientX, y: event.clientY }
      offsetOrigin.current = { ...offset }
      setIsPanning(true)
    },
    [offset],
  )

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!dragOrigin.current) return
      const dx = event.clientX - dragOrigin.current.x
      const dy = event.clientY - dragOrigin.current.y
      setOffset({
        x: offsetOrigin.current.x + dx,
        y: offsetOrigin.current.y + dy,
      })
    },
    [],
  )

  const endPan = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (dragOrigin.current) {
      dragOrigin.current = null
      setIsPanning(false)
      try {
        event.currentTarget.releasePointerCapture(event.pointerId)
      } catch {
        // already released
      }
    }
  }, [])

  return (
    <div className="map-page">
      <div
        className={`map-page__canvas${isPanning ? ' map-page__canvas--panning' : ''}`}
        id="marine-canvas-container"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPan}
        onPointerCancel={endPan}
      >
        <svg
          className="map-page__svg"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Kilindini Harbour cartographic layer"
        >
          <g transform={`translate(${offset.x} ${offset.y})`}>
            <defs>
              <pattern
                id="carto-grid"
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
                id="flow-arrow"
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

            <rect width="2000" height="1200" fill="url(#carto-grid)" />

            <g opacity="0.18" stroke="#00D2C8" strokeWidth="0.75">
              <line x1="38%" y1="52%" x2="0%" y2="20%" />
              <line x1="38%" y1="52%" x2="0%" y2="52%" />
              <line x1="38%" y1="52%" x2="15%" y2="0%" />
              <line x1="38%" y1="52%" x2="38%" y2="0%" />
              <line x1="38%" y1="52%" x2="70%" y2="0%" />
              <line x1="38%" y1="52%" x2="100%" y2="25%" />
              <line x1="38%" y1="52%" x2="100%" y2="52%" />
              <line x1="38%" y1="52%" x2="100%" y2="80%" />
              <line x1="38%" y1="52%" x2="80%" y2="100%" />
              <line x1="38%" y1="52%" x2="38%" y2="100%" />
              <line x1="38%" y1="52%" x2="10%" y2="100%" />
              <circle cx="38%" cy="52%" r="140" fill="none" strokeDasharray="3 5" />
              <circle cx="38%" cy="52%" r="280" fill="none" strokeDasharray="1 8" />
            </g>

            <g fill="none" stroke="#1E2E3F" strokeWidth="1.2" strokeDasharray="3 3">
              <path d="M -20,240 C 260,260 380,310 520,400 S 760,540 1100,560 1480,590 1920,600" />
              <path
                d="M -20,310 C 280,330 420,380 580,470 S 840,610 1180,630 1560,660 1920,670"
                stroke="#2C4257"
              />
              <path d="M 120,480 C 380,510 540,560 700,650 S 980,780 1300,790 1700,810 1920,820" />
            </g>

            <path
              d="M -20,-20 L 420,-20 L 410,120 C 390,180 340,210 260,240 L 160,280 C 90,310 50,380 30,460 L -20,490 Z"
              fill="#1A211E"
              stroke="#1E2E3F"
              strokeWidth="1.2"
            />
            <path
              d="M -20,680 C 120,670 210,640 280,600 C 360,550 410,500 480,480 L 640,460 C 740,460 840,490 920,530 C 1020,580 1120,620 1280,620 L 1420,610 L 1600,640 C 1740,670 1850,710 1960,740 L 1960,1100 L -20,1100 Z"
              fill="#1A211E"
              stroke="#1E2E3F"
              strokeWidth="1.2"
            />

            <g fill="#5F7688" fontFamily="'JetBrains Mono', monospace" fontSize="10">
              <text x="280" y="295">14.2m</text>
              <text x="360" y="345">15.8m</text>
              <text x="490" y="390">16.4m</text>
              <text x="640" y="440">17.1m</text>
              <text x="790" y="490">18.6m</text>
              <text x="960" y="530">19.2m</text>
              <text x="420" y="270" fill="#2C4257">9.6m</text>
              <text x="560" y="310" fill="#2C4257">11.2m</text>
            </g>

            {layers.berths && (
              <g className="map-page__berths">
                <g transform="rotate(-26, 235, 195)">
                  <rect x="235" y="195" width="70" height="20" rx="1" fill="#0C1C2A" stroke="#00D2C8" strokeWidth="1.2" />
                  <text x="242" y="210" fill="#00D2C8" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="600">BERTH 1</text>
                </g>
                <g transform="rotate(-26, 180, 222)">
                  <rect x="180" y="222" width="70" height="20" rx="1" fill="#0C1C2A" stroke="#00D2C8" strokeWidth="1.2" />
                  <text x="187" y="237" fill="#00D2C8" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="600">BERTH 2</text>
                </g>
                <g transform="rotate(-26, 125, 249)">
                  <rect x="125" y="249" width="70" height="20" rx="1" fill="#0C1C2A" stroke="#00D2C8" strokeWidth="1.5" />
                  <text x="132" y="264" fill="#00D2C8" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="600">BERTH 3</text>
                </g>
                <g transform="rotate(-26, 70, 276)">
                  <rect x="70" y="276" width="70" height="20" rx="1" fill="#0C1C2A" stroke="#00D2C8" strokeWidth="1.2" />
                  <text x="77" y="291" fill="#00D2C8" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="600">BERTH 4</text>
                </g>
              </g>
            )}

            {layers.flow && (
              <g
                stroke="#00D2C8"
                strokeOpacity="0.65"
                strokeWidth="1.2"
                strokeDasharray="2 3"
                markerEnd="url(#flow-arrow)"
              >
                <line x1="360" y1="360" x2="400" y2="378" />
                <line x1="440" y1="395" x2="480" y2="413" />
                <line x1="520" y1="430" x2="560" y2="448" />
                <line x1="600" y1="465" x2="640" y2="483" />
                <line x1="480" y1="360" x2="520" y2="378" />
                <line x1="560" y1="395" x2="600" y2="413" />
                <line x1="640" y1="430" x2="680" y2="448" />
                <line x1="720" y1="465" x2="760" y2="483" />
                <line x1="680" y1="370" x2="720" y2="388" />
                <line x1="760" y1="405" x2="800" y2="423" />
                <line x1="840" y1="440" x2="880" y2="458" />
              </g>
            )}

            {layers.vessels && (
              <g className="map-page__vessels">
                <g transform="translate(340, 310)">
                  <polygon points="0,-6 6,0 0,6 -6,0" fill="#E6F0F5" stroke="#06121B" strokeWidth="1" />
                  <text x="10" y="3" fill="#9CB0C2" fontFamily="'JetBrains Mono', monospace" fontSize="9">NYALI TUG (1.2 kn)</text>
                </g>
                <g transform="translate(860, 420)">
                  <polygon points="0,-7 7,0 0,7 -7,0" fill="#E6F0F5" stroke="#06121B" strokeWidth="1" />
                  <text x="12" y="3" fill="#9CB0C2" fontFamily="'JetBrains Mono', monospace" fontSize="9">CMA CGM MAASAI (16.8 kn)</text>
                </g>
                <g transform="translate(1120, 490)">
                  <polygon points="0,-6 6,0 0,6 -6,0" fill="#E6F0F5" stroke="#06121B" strokeWidth="1" />
                  <text x="10" y="3" fill="#5F7688" fontFamily="'JetBrains Mono', monospace" fontSize="9">PACIFIC JADE [ANC]</text>
                </g>
                <g
                  transform="translate(560, 420)"
                  className="map-page__vessel--active"
                  style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => setInspectorOpen((open) => !open)}
                >
                  <circle cx="0" cy="0" r="14" fill="none" stroke="#00D2C8" strokeWidth="1.2" opacity="0.8">
                    <animate attributeName="r" values="6;26" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.9;0" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="0" cy="0" r="8" fill="#00D2C8" fillOpacity="0.25" stroke="#00D2C8" strokeWidth="1.5" />
                  <polygon points="0,-7 7,0 0,7 -7,0" fill="#00D2C8" stroke="#06121B" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="2" fill="#E6F0F5" />
                  <line x1="0" y1="0" x2="22" y2="-20" stroke="#00D2C8" strokeWidth="1.5" strokeDasharray="2 2" />
                  <text x="14" y="-28" fill="#00D2C8" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="600">MV KWALE STAR</text>
                </g>
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Layers HUD — does not trigger pan */}
      <aside
        className="map-layers"
        aria-label="Map layers"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="map-layers__header">
          <span className="map-layers__title">LAYERS</span>
          <span className="map-layers__count">{activeCount} ACTIVE</span>
        </div>

        <ul className="map-layers__list">
          {layerConfig.map((layer) => (
            <li key={layer.key}>
              <label className="map-layers__row">
                <span className="map-layers__left">
                  <input
                    type="checkbox"
                    className="map-layers__checkbox"
                    checked={layers[layer.key]}
                    onChange={() => toggleLayer(layer.key)}
                  />
                  <span className="map-layers__label">{layer.label}</span>
                </span>
                <span
                  className={`map-layers__prov map-layers__prov--${layer.provenance.toLowerCase()}`}
                >
                  <span className="map-layers__prov-dot" />
                  {layer.provenance}
                </span>
              </label>
            </li>
          ))}
        </ul>

        <div className="map-layers__footer">
          <span>PROJECTION</span>
          <span className="map-layers__footer-value">UTM 37S / WGS84</span>
        </div>
      </aside>
            {inspectorOpen && (
        <aside
          className="map-inspector"
          aria-label="Selected vessel"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="map-inspector__header">
            <div className="map-inspector__title-row">
              <span className="map-inspector__name">MV KWALE STAR</span>
              <span className="map-inspector__prov">
                <span className="map-inspector__prov-dot" />
                MEASURED
              </span>
            </div>
            <span className="map-inspector__type">CONTAINER</span>
          </div>

          <div className="map-inspector__grid">
            <div className="map-inspector__cell">
              <span className="map-inspector__cell-label">SPEED</span>
              <span className="map-inspector__cell-value map-inspector__cell-value--signal">
                14.2 kn
              </span>
            </div>
            <div className="map-inspector__cell">
              <span className="map-inspector__cell-label">COURSE</span>
              <span className="map-inspector__cell-value">042° TRUE</span>
            </div>
            <div className="map-inspector__cell">
              <span className="map-inspector__cell-label">ETA</span>
              <span className="map-inspector__cell-value">14:20 UTC</span>
            </div>
            <div className="map-inspector__cell">
              <span className="map-inspector__cell-label">MAX DRAFT</span>
              <span className="map-inspector__cell-value">11.4 m</span>
            </div>
          </div>

          <div className="map-inspector__berth">
            <span className="map-inspector__berth-label">Berth 3</span>
            <span className="map-inspector__berth-status">ASSIGNED</span>
          </div>
        </aside>
      )}
    </div>
  )
}