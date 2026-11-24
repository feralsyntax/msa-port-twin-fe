import type {
  MarinePrediction as ApiMarinePrediction,
  MarinePredictionStatusEnum,
} from '../../../../api/models';

export type MarinePrediction = ApiMarinePrediction;

export type PredictionStatus = MarinePredictionStatusEnum;

export type PredictionFilter = 'all' | PredictionStatus;
