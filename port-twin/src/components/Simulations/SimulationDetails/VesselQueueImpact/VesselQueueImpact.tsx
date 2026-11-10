import './VesselQueueImpact.scss';

interface VesselSimulationResult {
  vessel_id: string;
  arrival_hour: number;
  berth_id: string | null;
  service_start_hour: number | null;
  departure_hour: number | null;
  waiting_hours: number | null;
  status: string;
  reason?: string | null;
}

interface VesselQueueImpactProps {
  vesselResults: {
    vessels: VesselSimulationResult[];
  } | null;
}

const getArrivalLabel = (vesselId: string) => {
  const match = vesselId.match(/-arrival-(\d+)$/i);

  return match ? `Arrival ${match[1]}` : vesselId.slice(0, 12);
};

const formatHour = (hour: number) => {
  const wholeHours = Math.floor(hour);
  const minutes = Math.round((hour - wholeHours) * 60);

  return `T+${wholeHours}:${String(minutes).padStart(2, '0')}`;
};

const formatWaitingTime = (hours: number | null) => {
  if (hours === null) return '—';

  return `${hours.toFixed(1)} h`;
};

const VesselQueueImpact = ({ vesselResults }: VesselQueueImpactProps) => {
  const vessels = vesselResults?.vessels ?? [];

  const sortedVessels = [...vessels].sort((a, b) => a.arrival_hour - b.arrival_hour);

  return (
    <section className="queue-impact" aria-label="Vessel queue impact telemetry">
      <div className="queue-impact__header">
        <h3 className="queue-impact__title">Vessel Queue Impact Telemetry</h3>

        <span className="queue-impact__count">{vessels.length} ARRIVALS MONITORED</span>
      </div>

      <div className="queue-impact__scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">VESSEL</th>
              <th scope="col">ARRIVAL</th>
              <th scope="col">ASSIGNED BERTH</th>
              <th scope="col">WAIT TIME</th>
              <th scope="col">STATUS</th>
            </tr>
          </thead>

          <tbody>
            {sortedVessels.length > 0 ? (
              sortedVessels.map((vessel) => (
                <tr key={vessel.vessel_id}>
                  <td>
                    <div className="queue-impact__vessel">
                      <span className="material-symbols-outlined">directions_boat</span>

                      <span>{getArrivalLabel(vessel.vessel_id)}</span>
                    </div>
                  </td>

                  <td className="queue-impact__mono">{formatHour(vessel.arrival_hour)}</td>

                  <td>
                    {vessel.berth_id ? `Berth · ${vessel.berth_id.slice(0, 8)}` : 'Unassigned'}
                  </td>

                  <td className="queue-impact__opt">{formatWaitingTime(vessel.waiting_hours)}</td>

                  <td>
                    <span
                      className={`queue-impact__status queue-impact__status--${vessel.status.toLowerCase()}`}
                      title={vessel.reason ?? undefined}
                    >
                      {vessel.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No vessel results are available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default VesselQueueImpact;
