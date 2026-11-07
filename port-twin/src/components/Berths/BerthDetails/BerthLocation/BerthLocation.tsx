import './BerthLocation.scss';

interface BerthLocationProps {
  berthLabel?: string;
  coordinates?: string;
  quayLabel?: string;
}

const BerthLocation = ({
  berthLabel = 'BERTH 3',
  coordinates = '04°03′ S, 39°41′ E',
  quayLabel = 'KILINDINI HARBOUR QUAY 3',
}: BerthLocationProps) => {
  return (
    <section className="berth-location" aria-label="Berth location">
      <div className="berth-location__header">
        <h2 className="berth-location__title">Berth Location</h2>
        <span className="berth-location__meta">SURFACE VECTOR V1.2</span>
      </div>

      <div className="berth-location__viewport">
        <svg
          className="berth-location__svg"
          viewBox="0 0 400 225"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <pattern id="berth-chart-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#1E2E3F"
                strokeWidth="0.5"
                strokeDasharray="1 3"
              />
            </pattern>
          </defs>

          <rect width="400" height="225" fill="url(#berth-chart-grid)" />

          <path
            d="M 0,0 L 210,0 Q 185,50 170,95 L 145,115 L 115,160 Q 80,185 0,210 Z"
            fill="#1A211E"
            stroke="#1E2E3F"
            strokeWidth="1"
          />

          <path
            d="M 185,0 Q 170,60 155,100 Q 130,135 110,170 Q 75,195 0,225"
            fill="none"
            stroke="#1E2E3F"
            strokeWidth="1"
          />
          <path
            d="M 230,0 Q 210,70 190,120 Q 165,160 140,225"
            fill="none"
            stroke="#00D2C8"
            strokeOpacity="0.18"
            strokeWidth="1"
          />
          <text x="220" y="30" fill="#5F7688" fontFamily="JetBrains Mono, monospace" fontSize="8">
            -15m
          </text>
          <path
            d="M 275,0 Q 250,80 230,140 Q 205,190 190,225"
            fill="none"
            stroke="#00D2C8"
            strokeOpacity="0.12"
            strokeWidth="0.8"
          />
          <text x="268" y="55" fill="#5F7688" fontFamily="JetBrains Mono, monospace" fontSize="8">
            -20m
          </text>
          <path
            d="M 330,0 Q 300,90 280,150 Q 260,200 245,225"
            fill="none"
            stroke="#1E2E3F"
            strokeWidth="0.8"
          />

          <text x="210" y="85" fill="#5F7688" fontFamily="JetBrains Mono, monospace" fontSize="7">
            14.8
          </text>
          <circle cx="206" cy="83" r="0.75" fill="#5F7688" />
          <text x="290" y="110" fill="#5F7688" fontFamily="JetBrains Mono, monospace" fontSize="7">
            18.2
          </text>
          <circle cx="286" cy="108" r="0.75" fill="#5F7688" />
          <text x="325" y="175" fill="#5F7688" fontFamily="JetBrains Mono, monospace" fontSize="7">
            22.4
          </text>
          <circle cx="321" cy="173" r="0.75" fill="#5F7688" />
          <text x="160" y="205" fill="#5F7688" fontFamily="JetBrains Mono, monospace" fontSize="7">
            16.1
          </text>
          <circle cx="156" cy="203" r="0.75" fill="#5F7688" />

          <line x1="170" y1="95" x2="115" y2="160" stroke="#2C4257" strokeWidth="2" />

          <g transform="translate(162, 98) rotate(-40)">
            <rect
              width="28"
              height="7"
              rx="0.5"
              fill="#0C1C2A"
              stroke="#00D2C8"
              strokeOpacity="0.45"
              strokeWidth="0.75"
            />
            <text
              x="14"
              y="5.5"
              textAnchor="middle"
              fill="#5F7688"
              fontFamily="JetBrains Mono, monospace"
              fontSize="5"
            >
              B1
            </text>
          </g>

          <g transform="translate(144, 114) rotate(-40)">
            <rect
              width="28"
              height="7"
              rx="0.5"
              fill="#0C1C2A"
              stroke="#00D2C8"
              strokeOpacity="0.45"
              strokeWidth="0.75"
            />
            <text
              x="14"
              y="5.5"
              textAnchor="middle"
              fill="#5F7688"
              fontFamily="JetBrains Mono, monospace"
              fontSize="5"
            >
              B2
            </text>
          </g>

          <g transform="translate(126, 130) rotate(-40)">
            <rect
              width="32"
              height="9"
              rx="0.5"
              fill="#00D2C8"
              fillOpacity="0.22"
              stroke="#00D2C8"
              strokeWidth="2"
            />
            <rect
              width="32"
              height="9"
              fill="none"
              stroke="#00D2C8"
              strokeWidth="0.5"
              strokeDasharray="2 1"
            />
            <text
              x="16"
              y="6.5"
              textAnchor="middle"
              fill="#00D2C8"
              fontFamily="JetBrains Mono, monospace"
              fontSize="6"
              fontWeight="bold"
            >
              B3
            </text>
          </g>

          <g transform="translate(108, 146) rotate(-40)">
            <rect
              width="28"
              height="7"
              rx="0.5"
              fill="#0C1C2A"
              stroke="#00D2C8"
              strokeOpacity="0.45"
              strokeWidth="0.75"
            />
            <text
              x="14"
              y="5.5"
              textAnchor="middle"
              fill="#5F7688"
              fontFamily="JetBrains Mono, monospace"
              fontSize="5"
            >
              B4
            </text>
          </g>

          <line
            x1="145"
            y1="145"
            x2="195"
            y2="155"
            stroke="#00D2C8"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <circle cx="145" cy="145" r="2" fill="#00D2C8" />
          <rect
            x="195"
            y="146"
            width="70"
            height="17"
            rx="1"
            fill="#0C1C2A"
            stroke="#00D2C8"
            strokeWidth="1"
          />
          <text
            x="200"
            y="158"
            fill="#00D2C8"
            fontFamily="JetBrains Mono, monospace"
            fontSize="9"
            fontWeight="bold"
          >
            {berthLabel}
          </text>
          <text x="252" y="158" fill="#5DB580" fontFamily="JetBrains Mono, monospace" fontSize="7">
            AVAIL
          </text>

          <text
            x="260"
            y="195"
            fill="#1E2E3F"
            fontFamily="Space Grotesk, sans-serif"
            fontSize="10"
            fontWeight="600"
            letterSpacing="2"
          >
            KILINDINI HARBOUR
          </text>
        </svg>

        <div className="berth-location__compass" aria-hidden="true">
          <span>N</span>
        </div>

        <div className="berth-location__stamp">BATHYMETRY V14-E</div>
      </div>

      <div className="berth-location__footer">
        <div className="berth-location__coords">
          <span className="berth-location__coord">{coordinates}</span>
          <span className="berth-location__dot">·</span>
          <span className="berth-location__quay">{quayLabel}</span>
        </div>
        <span className="berth-location__locked">GEO-LOCKED</span>
      </div>
    </section>
  );
};

export default BerthLocation;
