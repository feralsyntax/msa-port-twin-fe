import { useEffect, useMemo, useRef } from 'react';
import type { MarinePredictionResultData } from '../../../../utils/apiDataGuards';
import './PredictedWaterFlow.scss';

interface PredictedWaterFlowProps {
  result: MarinePredictionResultData;
  currentStep: number;
  totalSteps: number;
  startTime: string | undefined;
  stepIntervalHours: number | undefined;
  isPlaying: boolean;
  onStepChange: (step: number) => void;
  onPlayPause: () => void;
}

const formatHours = (hours: number) => Number(hours.toFixed(2));

const PredictedWaterFlow = ({
  result,
  currentStep,
  totalSteps,
  startTime,
  stepIntervalHours,
  isPlaying,
  onStepChange,
  onPlayPause,
}: PredictedWaterFlowProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const waterLevelFrame = result.water_level_m[currentStep];
  const currentUFrame = result.current_u_ms[currentStep];
  const currentVFrame = result.current_v_ms[currentStep];
  const frameStats = useMemo(() => {
    let minWaterLevel = Number.POSITIVE_INFINITY;
    let maxWaterLevel = Number.NEGATIVE_INFINITY;
    let maxCurrentSpeed = 0;

    waterLevelFrame.forEach((row, y) => {
      row.forEach((level, x) => {
        minWaterLevel = Math.min(minWaterLevel, level);
        maxWaterLevel = Math.max(maxWaterLevel, level);
        maxCurrentSpeed = Math.max(
          maxCurrentSpeed,
          Math.hypot(currentUFrame[y][x], currentVFrame[y][x]),
        );
      });
    });

    return { minWaterLevel, maxWaterLevel, maxCurrentSpeed };
  }, [currentUFrame, currentVFrame, waterLevelFrame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const rows = waterLevelFrame.length;
    const columns = waterLevelFrame[0].length;
    canvas.width = columns;
    canvas.height = rows;
    context.imageSmoothingEnabled = false;

    waterLevelFrame.forEach((row, y) => {
      row.forEach((level, x) => {
        const range = frameStats.maxWaterLevel - frameStats.minWaterLevel;
        const normalised = range === 0 ? 0.5 : (level - frameStats.minWaterLevel) / range;
        const hue = 215 - normalised * 210;
        context.fillStyle = `hsl(${hue} 78% 46%)`;
        context.fillRect(x, y, 1, 1);
      });
    });

    if (frameStats.maxCurrentSpeed === 0) return;

    const stride = Math.max(1, Math.ceil(Math.max(columns, rows) / 18));
    const arrowLength = stride * 0.8;
    const arrowHead = Math.max(0.18, stride * 0.16);
    context.strokeStyle = 'rgba(255, 255, 255, 0.92)';
    context.fillStyle = 'rgba(255, 255, 255, 0.92)';
    context.lineWidth = Math.max(0.08, stride * 0.035);

    for (let y = Math.floor(stride / 2); y < rows; y += stride) {
      for (let x = Math.floor(stride / 2); x < columns; x += stride) {
        const u = currentUFrame[y][x];
        const v = currentVFrame[y][x];
        const speed = Math.hypot(u, v);
        if (speed === 0) continue;

        const length = (speed / frameStats.maxCurrentSpeed) * arrowLength;
        const startX = x + 0.5;
        const startY = y + 0.5;
        const endX = startX + (u / speed) * length;
        const endY = startY - (v / speed) * length;
        const angle = Math.atan2(endY - startY, endX - startX);

        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.stroke();

        context.beginPath();
        context.moveTo(endX, endY);
        context.lineTo(
          endX - arrowHead * Math.cos(angle - Math.PI / 6),
          endY - arrowHead * Math.sin(angle - Math.PI / 6),
        );
        context.lineTo(
          endX - arrowHead * Math.cos(angle + Math.PI / 6),
          endY - arrowHead * Math.sin(angle + Math.PI / 6),
        );
        context.closePath();
        context.fill();
      }
    }
  }, [currentStep, currentUFrame, currentVFrame, frameStats, waterLevelFrame]);

  const progress = (currentStep / Math.max(totalSteps - 1, 1)) * 100;
  const stepOffsetHours =
    stepIntervalHours === undefined ? undefined : (currentStep + 1) * stepIntervalHours;
  const stepTime =
    startTime && stepOffsetHours !== undefined
      ? new Date(Date.parse(startTime) + stepOffsetHours * 60 * 60 * 1000)
      : null;
  const timeLabel =
    stepOffsetHours === undefined
      ? 'Time offset unavailable'
      : stepTime && Number.isFinite(stepTime.getTime())
        ? `T+${formatHours(stepOffsetHours)} h · ${stepTime.toISOString().slice(0, 16).replace('T', ' ')} UTC`
        : `T+${formatHours(stepOffsetHours)} h`;
  const labelCount = Math.min(totalSteps - 1, 5);
  const labelSteps = Array.from({ length: labelCount + 1 }, (_, index) =>
    labelCount === 0 ? 0 : Math.round((index * (totalSteps - 1)) / labelCount),
  );
  const tickStride = Math.max(1, Math.ceil(totalSteps / 6));

  return (
    <section className="predicted-water-flow">
      <div className="predicted-water-flow__header">
        <div className="predicted-water-flow__title">
          <span className="material-symbols-outlined" aria-hidden="true">
            waves
          </span>
          <h2>Predicted Water Flow</h2>
          <span className="predicted-water-flow__location">AI ESTIMATE · NOT OBSERVED DATA</span>
        </div>
      </div>

      <div
        className="predicted-water-flow__canvas"
        style={{ aspectRatio: `${waterLevelFrame[0].length} / ${waterLevelFrame.length}` }}
      >
        <canvas
          ref={canvasRef}
          className="predicted-water-flow__grid"
          width={waterLevelFrame[0].length}
          height={waterLevelFrame.length}
          role="img"
          aria-label={`AI-estimated water level in metres and current direction, forecast step ${currentStep + 1} of ${totalSteps}`}
        >
          Water-level grid with current vectors for this forecast step.
        </canvas>

        <div className="predicted-water-flow__legend">
          <div className="predicted-water-flow__legend-heading">
            <span>WATER LEVEL</span>
            <span>
              {frameStats.minWaterLevel.toFixed(2)} – {frameStats.maxWaterLevel.toFixed(2)} m
            </span>
          </div>
          <div className="predicted-water-flow__color-scale" />
          <div className="predicted-water-flow__legend-heading">
            <span>CURRENT SPEED · ARROW LENGTH</span>
            <span>0 – {frameStats.maxCurrentSpeed.toFixed(2)} m/s</span>
          </div>
        </div>
      </div>

      <div className="predicted-water-flow__timeline">
        <div className="predicted-water-flow__timeline-heading">
          <div>
            <span>Forecast Step {currentStep + 1} / {totalSteps}</span>
            <span className="predicted-water-flow__time-offset">{timeLabel}</span>
          </div>

          <button
            type="button"
            onClick={onPlayPause}
            disabled={totalSteps < 2}
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
            max={Math.max(totalSteps - 1, 0)}
            value={currentStep}
            aria-label="Forecast timeline step"
            style={{ '--progress': `${progress}%` } as React.CSSProperties}
            onChange={(event) => onStepChange(Number(event.target.value))}
          />

          <button
            type="button"
            aria-label="Next forecast step"
            disabled={currentStep === totalSteps - 1}
            onClick={() => onStepChange(currentStep + 1)}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        <div className="predicted-water-flow__timeline-labels">
          {labelSteps.map((step) => (
            <span key={step} className={currentStep === step ? 'is-active' : ''}>
              {stepIntervalHours === undefined
                ? `Step ${step + 1}`
                : `T+${formatHours((step + 1) * stepIntervalHours)}h`}
            </span>
          ))}
        </div>

        <div className="predicted-water-flow__ticks">
          {Array.from({ length: totalSteps }, (_, index) => (
            <span key={index} className={index % tickStride === 0 ? 'is-major' : ''} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PredictedWaterFlow;
