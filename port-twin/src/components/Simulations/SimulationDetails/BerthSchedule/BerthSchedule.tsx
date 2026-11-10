import './BerthSchedule.scss';

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

interface BerthScheduleProps {
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

const BerthSchedule = ({ vesselResults }: BerthScheduleProps) => {
  if (!vesselResults?.vessels.length) {
    return (
      <section className="berth-schedule" aria-label="Berth schedule">
        <h2 className="berth-schedule__title">Berth Schedule</h2>
        <p>No vessel scheduling results are available.</p>
      </section>
    );
  }

  const assignedVessels = vesselResults.vessels.filter((vessel) => vessel.berth_id);

  const groupedVessels = new Map<string, VesselSimulationResult[]>();

  assignedVessels.forEach((vessel) => {
    const berthId = vessel.berth_id!;

    const existing = groupedVessels.get(berthId) ?? [];

    existing.push(vessel);

    groupedVessels.set(berthId, existing);
  });

  const rows = Array.from(groupedVessels.entries()).map(([berthId, vessels]) => ({
    berthId,
    vessels: [...vessels].sort(
      (a, b) => (a.service_start_hour ?? a.arrival_hour) - (b.service_start_hour ?? b.arrival_hour),
    ),
  }));

  const allHours = vesselResults.vessels.flatMap((vessel) => [
    vessel.arrival_hour,
    vessel.service_start_hour ?? vessel.arrival_hour,
    vessel.departure_hour ?? vessel.arrival_hour,
  ]);

  const maxHour = Math.max(12, Math.ceil(Math.max(...allHours) / 2) * 2);

  const hours = Array.from({ length: maxHour / 2 + 1 }, (_, index) => index * 2);

  const getBarPosition = (vessel: VesselSimulationResult) => {
    const start = vessel.service_start_hour ?? vessel.arrival_hour;

    const end = vessel.departure_hour ?? start + 0.5;

    const duration = Math.max(end - start, 0.25);

    return {
      left: `${(start / maxHour) * 100}%`,
      width: `${(duration / maxHour) * 100}%`,
    };
  };

  return (
    <section className="berth-schedule" aria-label="Berth schedule">
      <div className="berth-schedule__controls">
        <div>
          <h2 className="berth-schedule__title">Berth Schedule</h2>

          <p className="berth-schedule__subtitle">
            Simulated vessel service allocation across assigned berths
          </p>
        </div>

        <div className="berth-schedule__legend-wrap">
          <div className="berth-schedule__legend">
            <div className="berth-schedule__legend-item">
              <span className="berth-schedule__swatch berth-schedule__swatch--opt" />
              <span>Simulated service</span>
            </div>
          </div>
        </div>
      </div>

      <div className="berth-schedule__viewport">
        <div className="berth-schedule__chart">
          <div className="berth-schedule__axis">
            {hours.map((hour) => (
              <div key={hour} className="berth-schedule__hour">
                {formatHour(hour)}
              </div>
            ))}
          </div>

          {rows.map((row) => (
            <div key={row.berthId} className="berth-schedule__row">
              <div className="berth-schedule__berth">
                <span className="berth-schedule__berth-name">
                  Berth · {row.berthId.slice(0, 8)}
                </span>

                <span className="berth-schedule__berth-sub">
                  {row.vessels.length} assigned vessel
                  {row.vessels.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="berth-schedule__grid" aria-hidden="true">
                {hours.map((hour) => (
                  <div key={hour} />
                ))}
              </div>

              <div className="berth-schedule__track">
                {row.vessels.map((vessel) => {
                  const position = getBarPosition(vessel);

                  return (
                    <div
                      key={vessel.vessel_id}
                      className="berth-schedule__bar berth-schedule__bar--optimized"
                      style={position}
                      title={`${getArrivalLabel(vessel.vessel_id)}: ${formatHour(
                        vessel.service_start_hour ?? vessel.arrival_hour,
                      )} – ${
                        vessel.departure_hour !== null
                          ? formatHour(vessel.departure_hour)
                          : 'Departure pending'
                      }`}
                    >
                      <span>{getArrivalLabel(vessel.vessel_id)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="berth-schedule__footnote">
        <span>Timeline: Simulation-relative hours</span>

        <span>
          {assignedVessels.length} assigned ·{' '}
          {vesselResults.vessels.length - assignedVessels.length} unassigned
        </span>
      </div>
    </section>
  );
};

export default BerthSchedule;
