import './PredictedWaterFlow.scss';

interface PredictedWaterFlowProps {
  currentStep: number;
  totalSteps: number;
  startTime: string;
  isPlaying: boolean;
  onStepChange: (step: number) => void;
  onPlayPause: () => void;
}

const flowVectors = [
  [80, 260, 140, 262],
  [160, 258, 228, 255],
  [250, 252, 320, 248],
  [340, 244, 412, 242],
  [432, 240, 505, 242],
  [525, 244, 600, 250],
  [620, 253, 695, 256],
  [715, 258, 790, 257],
  [810, 255, 880, 250],
  [100, 225, 155, 220],
  [180, 214, 242, 204],
  [264, 196, 330, 190],
  [355, 184, 425, 182],
  [450, 182, 520, 188],
  [540, 194, 610, 204],
  [630, 210, 700, 216],
  [720, 218, 790, 214],
  [90, 295, 148, 298],
  [170, 300, 235, 306],
  [255, 310, 325, 315],
  [348, 316, 420, 312],
  [442, 308, 512, 304],
  [535, 300, 605, 300],
  [628, 300, 700, 302],
  [722, 302, 795, 298],
];

const secondaryVectors = [
  [110, 165, 160, 155],
  [180, 150, 230, 142],
  [250, 138, 305, 135],
  [330, 134, 385, 137],
  [410, 140, 465, 148],
  [490, 152, 545, 160],
  [570, 165, 625, 174],
  [650, 180, 710, 182],
  [730, 180, 790, 172],
  [810, 165, 865, 155],
  [100, 355, 150, 362],
  [170, 365, 225, 372],
  [248, 375, 305, 378],
  [330, 378, 388, 372],
  [415, 365, 475, 355],
  [500, 350, 560, 348],
  [585, 348, 648, 355],
  [670, 360, 735, 365],
  [755, 368, 820, 360],
];

const formatForecastTime = (startTime: string, step: number) => {
  const date = new Date(startTime);
  date.setUTCHours(date.getUTCHours() + step);

  const formatted = date.toISOString().slice(0, 16).replace('T', ' ');

  return `+${step}h (${formatted} UTC)`;
};

const PredictedWaterFlow = ({
  currentStep,
  totalSteps,
  startTime,
  isPlaying,
  onStepChange,
  onPlayPause,
}: PredictedWaterFlowProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <section className="predicted-water-flow">
      <div className="predicted-water-flow__header">
        <div className="predicted-water-flow__title">
          <span className="material-symbols-outlined" aria-hidden="true">
            waves
          </span>
          <h2>Predicted Water Flow</h2>
          <span className="predicted-water-flow__location">· KILINDINI HARBOUR / MOMBASA PORT</span>
        </div>
      </div>

      <div
        className="predicted-water-flow__canvas"
        role="img"
        aria-label="Illustrative hydrodynamic flow field showing current vectors through Kilindini Harbour"
      >
        <svg
          className="predicted-water-flow__svg"
          viewBox="0 0 960 540"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker
              id="prediction-flow-arrow"
              markerWidth="4"
              markerHeight="4"
              refX="4"
              refY="3"
              orient="auto"
              viewBox="0 0 6 6"
            >
              <path d="M 0 1 L 5 3 L 0 5 z" fill="#00d2c8" />
            </marker>
            <pattern id="prediction-grid-dots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.75" fill="#1e2e3f" />
            </pattern>
          </defs>

          <rect width="960" height="540" fill="url(#prediction-grid-dots)" />

          <g stroke="#1e2e3f" strokeDasharray="3 6" strokeWidth="0.75">
            {[135, 270, 405].map((y) => (
              <line key={`h-${y}`} x1="0" x2="960" y1={y} y2={y} />
            ))}
            {[240, 480, 720].map((x) => (
              <line key={`v-${x}`} x1={x} x2={x} y1="0" y2="540" />
            ))}
          </g>

          <path
            d="M 0,90 Q 180,120 320,80 T 560,110 T 820,40 L 960,60 L 960,0 L 0,0 Z"
            fill="#14283b"
            fillOpacity="0.45"
            stroke="#2c4257"
          />
          <path
            d="M 0,440 Q 220,390 410,420 T 700,470 T 960,430 L 960,540 L 0,540 Z"
            fill="#14283b"
            fillOpacity="0.45"
            stroke="#2c4257"
          />

          <g fill="none" stroke="#00d2c8" strokeOpacity="0.14" strokeWidth="1">
            <path d="M 20,130 Q 210,170 360,140 T 600,160 T 940,90" strokeDasharray="4 4" />
            <path d="M 10,210 Q 250,230 460,200 T 750,220 T 950,170" />
            <path d="M 20,330 Q 260,310 490,320 T 760,330 T 950,300" strokeDasharray="8 4" />
            <path d="M 30,390 Q 280,360 490,380 T 790,410 T 940,380" />
          </g>

          <path
            d="M 0,270 Q 240,255 480,265 T 960,250"
            fill="none"
            stroke="#00d2c8"
            strokeDasharray="1 4"
            strokeOpacity="0.22"
            strokeWidth="1.2"
          />

          <g markerEnd="url(#prediction-flow-arrow)" stroke="#00d2c8" strokeWidth="1.3">
            {flowVectors.map(([x1, y1, x2, y2], index) => (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                strokeOpacity={index < 9 ? 0.9 : 0.8}
              />
            ))}
          </g>

          <g
            markerEnd="url(#prediction-flow-arrow)"
            stroke="#00d2c8"
            strokeWidth="1.1"
            strokeOpacity="0.45"
          >
            {secondaryVectors.map(([x1, y1, x2, y2], index) => (
              <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} />
            ))}
            <path d="M 450,205 C 470,185 490,195 480,215" fill="none" strokeDasharray="2 3" />
            <path d="M 475,215 C 465,225 445,220 448,205" fill="none" strokeDasharray="2 3" />
          </g>

          <g>
            <circle cx="280" cy="250" r="3" fill="#00d2c8" />
            <circle cx="280" cy="250" r="9" stroke="#00d2c8" strokeDasharray="2 2" opacity="0.6" />
            <text x="294" y="246" fill="#9cb0c2" fontSize="9" fontFamily="monospace">
              WP-ALPHA [BERTH 01]
            </text>

            <circle cx="680" cy="256" r="3" fill="#00d2c8" />
            <circle cx="680" cy="256" r="9" stroke="#00d2c8" strokeDasharray="2 2" opacity="0.6" />
            <text x="694" y="252" fill="#9cb0c2" fontSize="9" fontFamily="monospace">
              WP-BRAVO [OUTER ANCHORAGE]
            </text>
          </g>
        </svg>

        <div className="predicted-water-flow__coordinate-hud">
          <div>
            <span>LAT -04°03'24" | LON 039°39'48"</span>
            <small>SCALE 1:25000 · BTM: KPA_2023</small>
          </div>
          <span className="material-symbols-outlined" aria-hidden="true">
            explore
          </span>
        </div>

        <div className="predicted-water-flow__legend">
          <div className="predicted-water-flow__legend-heading">
            <span>FLOW MAGNITUDE</span>
            <span>0.0 — 2.4 m/s</span>
          </div>
          <div className="predicted-water-flow__scale">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="predicted-water-flow__scale-labels">
            <span>0.0</span>
            <span>0.8</span>
            <span>1.6</span>
            <span>2.4</span>
          </div>
        </div>
      </div>

      <div className="predicted-water-flow__timeline">
        <div className="predicted-water-flow__timeline-heading">
          <div>
            <span>
              Forecast Step {currentStep} / {totalSteps}
            </span>
            <span className="predicted-water-flow__time-offset">
              +{currentStep}h ({formatForecastTime(startTime, currentStep).split('(')[1]}
            </span>
          </div>

          <button
            type="button"
            onClick={onPlayPause}
            aria-label={isPlaying ? 'Pause forecast timeline' : 'Play forecast timeline'}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
            {isPlaying ? 'PAUSE' : 'PLAY'}
          </button>
        </div>

        <div className="predicted-water-flow__scrubber">
          <button
            type="button"
            aria-label="Previous forecast step"
            disabled={currentStep === 0}
            onClick={() => onStepChange(currentStep - 1)}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <input
            type="range"
            min={0}
            max={totalSteps}
            value={currentStep}
            aria-label="Forecast timeline step"
            style={{ '--progress': `${progress}%` } as React.CSSProperties}
            onChange={(event) => onStepChange(Number(event.target.value))}
          />

          <button
            type="button"
            aria-label="Next forecast step"
            disabled={currentStep === totalSteps}
            onClick={() => onStepChange(currentStep + 1)}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        <div className="predicted-water-flow__timeline-labels">
          {[0, 4, 8, 12, 16, 20, 24].map((step) => (
            <span key={step} className={currentStep === step ? 'is-active' : ''}>
              T+{step}
            </span>
          ))}
        </div>

        <div className="predicted-water-flow__ticks">
          {Array.from({ length: totalSteps + 1 }, (_, index) => (
            <span key={index} className={index % 4 === 0 ? 'is-major' : ''} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PredictedWaterFlow;
