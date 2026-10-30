import "./LastKnownPositionPanel.scss";

export interface VesselPositionData {
  latitude: string;
  longitude: string;
  speed: number;
  heading: number;
  sector: string;
  provenance: string;
  lastUpdate: string;
}

interface LastKnownPositionPanelProps {
  position: VesselPositionData;
}

const LastKnownPositionPanel = ({ position }: LastKnownPositionPanelProps) => {
  return (
    <article className='last-known-position'>
      <div className='last-known-position__main'>
        <div className='last-known-position__header'>
          <h2>Last Known Position</h2>

          <div className='last-known-position__feed'>
            <span />
            AIS FEED
          </div>
        </div>

        {/* Static hydrographic track visualization */}
        <div className='last-known-position__chart'>
          <svg
            className='last-known-position__svg'
            viewBox='0 0 360 202'
            preserveAspectRatio='none'
            fill='none'
            aria-label='Illustrative vessel track over bathymetric depth contours'
            role='img'
          >
            {/* Grid */}
            {[60, 120, 180, 240, 300].map((x) => (
              <line
                key={`vertical-${x}`}
                x1={x}
                x2={x}
                y1='0'
                y2='202'
                stroke='#1E2E3F'
                strokeDasharray='2 3'
                strokeWidth='0.5'
              />
            ))}

            {[50, 100, 150].map((y) => (
              <line
                key={`horizontal-${y}`}
                x1='0'
                x2='360'
                y1={y}
                y2={y}
                stroke='#1E2E3F'
                strokeDasharray='2 3'
                strokeWidth='0.5'
              />
            ))}

            {/* Bathymetric contours */}
            <g stroke='#1E2E3F' strokeWidth='1'>
              <path d='M0 35 Q90 40 180 20 T360 45' />
              <path d='M0 80 Q110 95 210 70 T360 110' />
              <path d='M0 140 Q130 160 240 135 T360 170' />
            </g>

            {/* Depth readings */}
            <g fill='#5F7688' fontFamily='monospace' fontSize='8'>
              <text x='35' y='32'>
                12.8m
              </text>
              <text x='145' y='65'>
                16.4m
              </text>
              <text x='280' y='85'>
                21.0m
              </text>
              <text x='85' y='130'>
                18.2m
              </text>
              <text x='210' y='165'>
                14.6m
              </text>
            </g>

            {/* Harbour channel markers */}
            <path
              d='M30 180 C90 150 140 110 240 75 L330 45'
              stroke='#1E2E3F'
              strokeDasharray='4 4'
              strokeWidth='1.2'
            />

            {/* Vessel track */}
            <path
              d='M340 160 C260 130 190 90 140 68'
              stroke='#00D2C8'
              strokeDasharray='2 3'
              strokeLinecap='round'
              strokeWidth='1.8'
            />

            {/* Heading vector */}
            <line
              x1='140'
              y1='68'
              x2='116'
              y2='58'
              stroke='#00D2C8'
              strokeWidth='1.5'
            />

            {/* Vessel position marker */}
            <polygon points='140,63 145,68 140,73 135,68' fill='#00D2C8' />
          </svg>

          <div className='last-known-position__telemetry-badge'>
            HDG <span>{position.heading}°T</span>
            <span>·</span>
            SPD <strong>{position.speed.toFixed(1)} kn</strong>
          </div>

          <span className='last-known-position__sector'>
            SECTOR {position.sector}
          </span>
        </div>
      </div>

      {/* Position metadata */}
      <div className='last-known-position__metadata'>
        <div className='last-known-position__coordinates'>
          <span>Coordinates</span>

          <div className='last-known-position__coordinate-value'>
            <strong>
              {position.latitude}, {position.longitude}
            </strong>

            <span className='last-known-position__provenance'>
              <span />
              {position.provenance}
            </span>
          </div>
        </div>

        <div className='last-known-position__metrics'>
          <div>
            <span>Speed</span>
            <strong>{position.speed.toFixed(1)} kn</strong>
          </div>

          <div>
            <span>Heading</span>
            <strong>{position.heading}°</strong>
          </div>
        </div>

        <div className='last-known-position__update'>
          <span>Last Update</span>
          <strong>{position.lastUpdate}</strong>
        </div>
      </div>
    </article>
  );
};

export default LastKnownPositionPanel;
