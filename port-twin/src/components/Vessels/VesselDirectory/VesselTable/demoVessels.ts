export type VesselStatus = "in-port" | "approaching" | "delayed" | "departed";

export interface Vessel {
  id: string;
  name: string;
  mmsi: string;
  type: string;
  status: VesselStatus;
  eta: string;
  berth: string;
  lastMeasured: string;
}
export const demoVessels: Vessel[] = [
  {
    id: "1",
    name: "MV KWALE STAR",
    mmsi: "636019283",
    type: "Container",
    status: "in-port",
    eta: "—",
    berth: "Berth 3",
    lastMeasured: "2m ago",
  },
  {
    id: "2",
    name: "OCEAN HARMONY",
    mmsi: "538009112",
    type: "Bulk Carrier",
    status: "approaching",
    eta: "15:30",
    berth: "—",
    lastMeasured: "5m ago",
  },
  {
    id: "3",
    name: "EVER HORIZON",
    mmsi: "352001234",
    type: "Container",
    status: "approaching",
    eta: "16:45",
    berth: "—",
    lastMeasured: "5m ago",
  },
  {
    id: "4",
    name: "PACIFIC TRADER",
    mmsi: "477123456",
    type: "Tanker",
    status: "in-port",
    eta: "—",
    berth: "Berth 1",
    lastMeasured: "12m ago",
  },
  {
    id: "5",
    name: "MV TANA",
    mmsi: "636098765",
    type: "General Cargo",
    status: "delayed",
    eta: "18:00",
    berth: "—",
    lastMeasured: "1h ago",
  },
  {
    id: "6",
    name: "MAERSK KENYA",
    mmsi: "219876543",
    type: "Container",
    status: "departed",
    eta: "—",
    berth: "—",
    lastMeasured: "3h ago",
  },
  {
    id: "7",
    name: "ATLANTIC BREEZE",
    mmsi: "311000111",
    type: "Ro-Ro",
    status: "in-port",
    eta: "—",
    berth: "Berth 4",
    lastMeasured: "15m ago",
  },
  {
    id: "8",
    name: "STELLA MARIS",
    mmsi: "636055555",
    type: "Tug",
    status: "in-port",
    eta: "—",
    berth: "Berth 2",
    lastMeasured: "1m ago",
  },
];
