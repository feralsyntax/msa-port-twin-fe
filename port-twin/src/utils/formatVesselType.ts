import type { VesselTypeEnum } from '../api/models';

const vesselTypeLabels: Record<VesselTypeEnum, string> = {
  container: 'Container Ship',
  bulk_carrier: 'Bulk Carrier',
  general_cargo: 'General Cargo',
  tanker: 'Tanker / Liquid Bulk',
  passenger: 'Passenger Ship',
  other: 'Other',
  unknown: 'Unknown',
};

export const formatVesselType = (type: VesselTypeEnum): string => {
  return vesselTypeLabels[type] ?? type;
};
