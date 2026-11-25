import type { MarineForecastInput, MarineGridInput, ScenarioParameters } from '../api/models';

export type UnrecognisedData =
  | { recognised: false; reason: 'unrecognised-format' }
  | { recognised: false; reason: 'missing-value' };

export type GuardedData<T> = { recognised: true; value: T } | UnrecognisedData;

export interface MarinePredictionResultData {
  water_level_m: number[][][];
  current_u_ms: number[][][];
  current_v_ms: number[][][];
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

const isNumericTensor3d = (value: unknown): value is number[][][] => {
  if (!Array.isArray(value) || value.length === 0) return false;

  const firstFrame = value[0];
  if (!Array.isArray(firstFrame) || firstFrame.length === 0) return false;

  const firstRow = firstFrame[0];
  if (!Array.isArray(firstRow) || firstRow.length === 0) return false;

  const rowCount = firstFrame.length;
  const columnCount = firstRow.length;

  return value.every(
    (frame) =>
      Array.isArray(frame) &&
      frame.length === rowCount &&
      frame.every(
        (row) =>
          Array.isArray(row) &&
          row.length === columnCount &&
          row.every(isFiniteNumber),
      ),
  );
};

const getTensorShape = (tensor: number[][][]) => ({
  steps: tensor.length,
  rows: tensor[0].length,
  columns: tensor[0][0].length,
});

export const guardMarinePredictionResult = (
  value: unknown,
): GuardedData<MarinePredictionResultData> => {
  if (!isObject(value)) {
    return {
      recognised: false,
      reason: value === null || value === undefined ? 'missing-value' : 'unrecognised-format',
    };
  }

  const { water_level_m, current_u_ms, current_v_ms } = value;
  if (
    !isNumericTensor3d(water_level_m) ||
    !isNumericTensor3d(current_u_ms) ||
    !isNumericTensor3d(current_v_ms)
  ) {
    return { recognised: false, reason: 'unrecognised-format' };
  }

  const waterShape = getTensorShape(water_level_m);
  const uShape = getTensorShape(current_u_ms);
  const vShape = getTensorShape(current_v_ms);
  if (
    waterShape.steps !== uShape.steps ||
    waterShape.steps !== vShape.steps ||
    waterShape.rows !== uShape.rows ||
    waterShape.rows !== vShape.rows ||
    waterShape.columns !== uShape.columns ||
    waterShape.columns !== vShape.columns
  ) {
    return { recognised: false, reason: 'unrecognised-format' };
  }

  return {
    recognised: true,
    value: { water_level_m, current_u_ms, current_v_ms },
  };
};

export const guardMarineGrid = (value: unknown): GuardedData<MarineGridInput> => {
  if (!isObject(value)) return { recognised: false, reason: 'missing-value' };

  if (
    isFiniteNumber(value.west) &&
    isFiniteNumber(value.south) &&
    isFiniteNumber(value.east) &&
    isFiniteNumber(value.north) &&
    isFiniteNumber(value.nx) &&
    isFiniteNumber(value.ny)
  ) {
    return {
      recognised: true,
      value: {
        west: value.west,
        south: value.south,
        east: value.east,
        north: value.north,
        nx: value.nx,
        ny: value.ny,
        ...(typeof value.crs === 'string' ? { crs: value.crs } : {}),
      },
    };
  }

  return { recognised: false, reason: 'unrecognised-format' };
};

export const guardMarineForecast = (value: unknown): GuardedData<MarineForecastInput> => {
  if (!isObject(value)) return { recognised: false, reason: 'missing-value' };
  if (typeof value.start_time !== 'string') {
    return { recognised: false, reason: 'unrecognised-format' };
  }
  return { recognised: true, value: { start_time: value.start_time } };
};

export const guardScenarioParameters = (value: unknown): GuardedData<ScenarioParameters> => {
  if (!isObject(value)) return { recognised: false, reason: 'missing-value' };

  if (
    isFiniteNumber(value.expected_vessel_arrivals) &&
    isFiniteNumber(value.arrival_interval_hours) &&
    isFiniteNumber(value.average_service_time_hours) &&
    isFiniteNumber(value.simulation_hours) &&
    (value.available_berths === undefined || isFiniteNumber(value.available_berths))
  ) {
    return {
      recognised: true,
      value: {
        simulation_hours: value.simulation_hours,
        expected_vessel_arrivals: value.expected_vessel_arrivals,
        arrival_interval_hours: value.arrival_interval_hours,
        average_service_time_hours: value.average_service_time_hours,
        ...(value.available_berths === undefined
          ? {}
          : { available_berths: value.available_berths }),
      },
    };
  }

  return { recognised: false, reason: 'unrecognised-format' };
};

export const guardObjectArray = (value: unknown): GuardedData<Record<string, unknown>[]> => {
  if (!Array.isArray(value)) return { recognised: false, reason: 'unrecognised-format' };
  if (!value.every(isObject)) return { recognised: false, reason: 'unrecognised-format' };
  return { recognised: true, value };
};

export const guardRecord = (value: unknown): GuardedData<Record<string, unknown>> => {
  if (!isObject(value)) return { recognised: false, reason: 'unrecognised-format' };
  return { recognised: true, value };
};
