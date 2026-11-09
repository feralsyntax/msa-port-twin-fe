import './VesselQueueImpact.scss';

type DeltaTone = 'down' | 'up' | 'flat';

interface QueueRow {
  vessel: string;
  arrival: string;
  assignedBerth: string;
  waitOpt: string;
  waitBase: string;
  delta: string;
  tone: DeltaTone;
  alert?: boolean;
}

const rows: QueueRow[] = [
  {
    vessel: 'MV KWALE STAR',
    arrival: '14:00',
    assignedBerth: 'Berth 3',
    waitOpt: '2.1 h',
    waitBase: '3.5 h',
    delta: '(▼ -1.4 h)',
    tone: 'down',
  },
  {
    vessel: 'OCEAN HARMONY',
    arrival: '14:15',
    assignedBerth: 'Berth 1',
    waitOpt: '0.5 h',
    waitBase: '1.0 h',
    delta: '(▼ -0.5 h)',
    tone: 'down',
  },
  {
    vessel: 'EVER HORIZON',
    arrival: '14:30',
    assignedBerth: 'Berth 2',
    waitOpt: '4.5 h',
    waitBase: '4.0 h',
    delta: '(▲ +0.5 h)',
    tone: 'up',
    alert: true,
  },
  {
    vessel: 'PACIFIC TRADER',
    arrival: '15:00',
    assignedBerth: 'Berth 4',
    waitOpt: '2.0 h',
    waitBase: '2.0 h',
    delta: '(— 0.0 h)',
    tone: 'flat',
  },
];

const VesselQueueImpact = () => {
  return (
    <section className="queue-impact" aria-label="Vessel queue impact telemetry">
      <div className="queue-impact__header">
        <h3 className="queue-impact__title">Vessel Queue Impact Telemetry</h3>
        <span className="queue-impact__count">4 ARRIVALS MONITORED</span>
      </div>

      <div className="queue-impact__scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">VESSEL NAME</th>
              <th scope="col">ARRIVAL</th>
              <th scope="col">ASSIGNED BERTH</th>
              <th scope="col">WAIT TIME (OPT)</th>
              <th scope="col">WAIT TIME (BASE)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.vessel} className={row.alert ? 'queue-impact__row--alert' : undefined}>
                <td>
                  <div
                    className={`queue-impact__vessel${
                      row.alert ? ' queue-impact__vessel--alert' : ''
                    }`}
                  >
                    <span className="material-symbols-outlined">
                      {row.alert ? 'warning' : 'directions_boat'}
                    </span>
                    <span>{row.vessel}</span>
                  </div>
                </td>
                <td className="queue-impact__mono">{row.arrival}</td>
                <td>{row.assignedBerth}</td>
                <td className={`queue-impact__opt${row.alert ? ' queue-impact__opt--alert' : ''}`}>
                  {row.waitOpt}
                </td>
                <td className="queue-impact__base">
                  <span>{row.waitBase}</span>
                  <span className={`queue-impact__delta queue-impact__delta--${row.tone}`}>
                    {row.delta}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default VesselQueueImpact;
