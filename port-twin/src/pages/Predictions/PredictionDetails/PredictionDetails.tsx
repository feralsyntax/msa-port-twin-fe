import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PredictedWaterFlow from '../../../components/Predictions/PredictionDetails/PredictedWaterFlow/PredictedWaterFlow';
import PredictionTargetGrid from '../../../components/Predictions/PredictionDetails/PredictionTargetGrid/PredictionTargetGrid';
import PredictionForecastWindow from '../../../components/Predictions/PredictionDetails/PredictionForecastWindow/PredictionForecastWindow';
import PredictionPeakFlow from '../../../components/Predictions/PredictionDetails/PredictionPeakFlow/PredictionPeakFlow';

import './PredictionDetails.scss';
import PredictionDetailsHeader from '../../../components/Predictions/PredictionDetails/PredictionDetailsHeader/PredictionDetailsHeader';

const TOTAL_STEPS = 24;
const START_TIME = '2024-05-12T14:00:00Z';

export const PredictionDetailsPage = () => {
  const { predictionId } = useParams<{ predictionId: string }>();

  const [currentStep, setCurrentStep] = useState(12);
  const [isPlaying, setIsPlaying] = useState(false);

  const displayId = predictionId || 'pred_a1b2c3d4';

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentStep((previousStep) => (previousStep >= TOTAL_STEPS ? 0 : previousStep + 1));
    }, 600);

    return () => window.clearInterval(interval);
  }, [isPlaying]);

  const handleStepChange = (step: number) => {
    setCurrentStep(Math.min(TOTAL_STEPS, Math.max(0, step)));
  };

  const handlePlayPause = () => {
    setIsPlaying((previousState) => !previousState);
  };

  return (
    <div className="prediction-details-page">
      <PredictionDetailsHeader predictionId={displayId} status={'completed'} />

      <main className="prediction-details-page__content">
        <div className="prediction-details-page__status-header">
          <div className="prediction-details-page__identity">
            <h1>{displayId}</h1>

            <span className="prediction-details-page__status">
              <span />
              Completed
            </span>
          </div>
        </div>

        <div className="prediction-details-page__grid">
          <div className="prediction-details-page__visualization">
            <PredictedWaterFlow
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              startTime={START_TIME}
              isPlaying={isPlaying}
              onStepChange={handleStepChange}
              onPlayPause={handlePlayPause}
            />
          </div>

          <aside className="prediction-details-page__metadata">
            <PredictionTargetGrid
              bounds="04°S, 39°E"
              resolution="1 km"
              crs="EPSG:4326"
              spatialResolution="256 × 256"
            />

            <PredictionForecastWindow
              startTime="2024-05-12 14:00"
              timeSteps={TOTAL_STEPS}
              interval="1h"
              createdAt="2024-05-12 14:08"
            />

            <PredictionPeakFlow value="2.18 m/s" phase="Ebb Phase" verified />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default PredictionDetailsPage;
