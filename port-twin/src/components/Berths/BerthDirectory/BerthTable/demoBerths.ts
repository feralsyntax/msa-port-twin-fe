export type BerthStatus = 'occupied' | 'available' | 'reserved' | 'maintenance';

export interface Berth {
  id: string;
  name: string;
  terminal: string;
  status: BerthStatus;
  occupancy: number;
  currentVessel: string;
  maxDraftM: number;
  maxLoaM: number;
  lastMeasured: string;
}

export const demoBerths: Berth[] = [
  {
    id: '1',
    name: 'Berth 1',
    terminal: 'Kilindini Container',
    status: 'occupied',
    occupancy: 72,
    currentVessel: 'MSC KILINDINI',
    maxDraftM: 14.5,
    maxLoaM: 300,
    lastMeasured: '2m ago',
  },
  {
    id: '2',
    name: 'Berth 2',
    terminal: 'Kilindini Container',
    status: 'occupied',
    occupancy: 85,
    currentVessel: 'MAERSK TSAVO',
    maxDraftM: 14.5,
    maxLoaM: 300,
    lastMeasured: '4m ago',
  },
  {
    id: '3',
    name: 'Berth 3',
    terminal: 'Kilindini Container',
    status: 'occupied',
    occupancy: 58,
    currentVessel: 'MV KWALE STAR',
    maxDraftM: 13.2,
    maxLoaM: 280,
    lastMeasured: '1m ago',
  },
  {
    id: '4',
    name: 'Berth 4',
    terminal: 'Oil Terminal',
    status: 'reserved',
    occupancy: 100,
    currentVessel: 'MT OCEAN VOYAGER',
    maxDraftM: 15.0,
    maxLoaM: 250,
    lastMeasured: '6m ago',
  },
  {
    id: '5',
    name: 'Berth 5',
    terminal: 'General Cargo',
    status: 'available',
    occupancy: 0,
    currentVessel: '—',
    maxDraftM: 12.0,
    maxLoaM: 220,
    lastMeasured: '12m ago',
  },
  {
    id: '6',
    name: 'Berth 6',
    terminal: 'General Cargo',
    status: 'available',
    occupancy: 0,
    currentVessel: '—',
    maxDraftM: 11.5,
    maxLoaM: 200,
    lastMeasured: '18m ago',
  },
  {
    id: '7',
    name: 'Berth 7',
    terminal: 'Bulk Terminal',
    status: 'maintenance',
    occupancy: 0,
    currentVessel: '—',
    maxDraftM: 13.0,
    maxLoaM: 260,
    lastMeasured: '1h ago',
  },
  {
    id: '8',
    name: 'Berth 8',
    terminal: 'Ro-Ro Quay',
    status: 'occupied',
    occupancy: 64,
    currentVessel: 'ATLANTIC BREEZE',
    maxDraftM: 10.5,
    maxLoaM: 180,
    lastMeasured: '9m ago',
  },
];
