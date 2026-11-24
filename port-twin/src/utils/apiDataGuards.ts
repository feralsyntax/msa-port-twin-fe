import type { MarineForecastInput, MarineGridInput, ScenarioParameters } from '../api/models';

export type UnrecognisedData =
  | { recognised: false; reason: 'unrecognised-format' }
  | { recognised: false; reason: 'missing-value' };

export type GuardedData<T> = { recognised: true; value: T } | UnrecognisedData;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

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
