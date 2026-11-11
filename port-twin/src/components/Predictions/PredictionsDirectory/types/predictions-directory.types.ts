export type PredictionStatus = 'completed' | 'failed';

export type PredictionFilter = 'all' | PredictionStatus;

export interface MarinePrediction {
  id: string;
  gridExtent: string;
  resolution: string;
  status: PredictionStatus;
  createdAt: string;
}
