export type DataProvenance = 'measured' | 'historical' | 'ai-estimate' | 'simulated';
export type ProvenanceContext = 'prediction' | 'simulation';

const sourceProvenance: Record<string, DataProvenance> = {
  observed: 'measured',
  measured: 'measured',
  live: 'measured',
  ais: 'measured',
  telemetry: 'measured',
  external: 'historical',
  historical: 'historical',
  replay: 'historical',
  replayed: 'historical',
  archive: 'historical',
  ai_prediction: 'ai-estimate',
  ai_estimate: 'ai-estimate',
  model: 'ai-estimate',
  fno: 'ai-estimate',
  demo: 'simulated',
  simulated: 'simulated',
  simulation: 'simulated',
  synthetic: 'simulated',
};

const readSource = (value: unknown): DataProvenance | null => {
  if (typeof value !== 'string') return null;
  return sourceProvenance[value.trim().toLowerCase().replace(/[\s-]+/g, '_')] ?? null;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const getDataProvenance = (
  value: unknown,
  context?: ProvenanceContext,
): DataProvenance | null => {
  if (!isRecord(value)) return readSource(value);

  if (
    value.is_demo === true ||
    value.is_synthetic === true ||
    value.synthetic === true ||
    value.demo === true
  ) {
    return 'simulated';
  }
  if (value.is_replay === true || value.replayed === true) return 'historical';

  const explicitProvenance = readSource(value.provenance);
  if (explicitProvenance === 'simulated') return explicitProvenance;
  if (context === 'simulation') return 'simulated';
  if (explicitProvenance) return explicitProvenance;

  const sources = [
    value.source,
    value.data_source,
    value.dataSource,
    value.data_provenance,
    value.dataProvenance,
    value.source_type,
    value.prediction_mode,
    value.mode,
    value.origin,
  ].map(readSource);

  if (sources.includes('simulated')) return 'simulated';
  if (context === 'prediction') return 'ai-estimate';

  return sources.find((source) => source !== null) ?? null;
};
