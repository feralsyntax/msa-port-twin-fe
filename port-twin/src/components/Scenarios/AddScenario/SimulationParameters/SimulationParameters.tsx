import './SimulationParameters.scss';

const berthStatuses = [
  {
    name: 'B-01 (Quay A)',
    status: 'Online',
    variant: 'online',
  },
  {
    name: 'B-02 (Quay B)',
    status: 'Online',
    variant: 'online',
  },
  {
    name: 'B-03 (Deep Draft)',
    status: 'Dredging',
    variant: 'dredging',
  },
  {
    name: 'B-04 (Feeder)',
    status: 'Offline',
    variant: 'offline',
  },
];

const SimulationParameters = () => {
  return (
    <section className="simulation-parameters">
      <div className="simulation-parameters__header">
        <div className="simulation-parameters__heading">
          <div className="simulation-parameters__title">
            <span className="material-symbols-outlined">scatter_plot</span>
            <h2>Simulation Parameters</h2>
          </div>

          <p>Define the vessel queueing dynamics and physical berth constraints.</p>
        </div>

        <span className="simulation-parameters__section-number">SEC:02</span>
      </div>

      <div className="simulation-parameters__fields">
        {/* Arrival Parameters */}
        <div className="simulation-parameters__row">
          <div className="simulation-parameters__field">
            <label htmlFor="expected-arrivals">Expected Arrivals</label>

            <div className="simulation-parameters__input-wrapper">
              <input
                id="expected-arrivals"
                name="expected_arrivals"
                type="number"
                min={1}
                max={120}
                defaultValue={14}
              />

              <span>VESSELS</span>
            </div>

            <small>Poisson distribution parameter λ = 14</small>
          </div>

          <div className="simulation-parameters__field">
            <label htmlFor="arrival-interval">Arrival Interval (Hours)</label>

            <div className="simulation-parameters__input-wrapper">
              <input
                id="arrival-interval"
                name="arrival_interval"
                type="number"
                min={0.5}
                step={0.1}
                defaultValue={3.5}
              />

              <span>HRS</span>
            </div>

            <small>Mean spacing between approach corridors</small>
          </div>
        </div>

        {/* Service and Horizon Parameters */}
        <div className="simulation-parameters__row">
          <div className="simulation-parameters__field">
            <label htmlFor="service-time">Avg Service Time (Hours)</label>

            <div className="simulation-parameters__input-wrapper">
              <input
                id="service-time"
                name="service_time"
                type="number"
                min={1}
                step={0.5}
                defaultValue={8}
              />

              <span>HRS</span>
            </div>

            <small>Crane handling + stevedore dispatch window</small>
          </div>

          <div className="simulation-parameters__field">
            <label htmlFor="simulation-horizon">Simulation Horizon (Hours)</label>

            <div className="simulation-parameters__input-wrapper">
              <input
                id="simulation-horizon"
                name="sim_horizon"
                type="number"
                min={6}
                max={168}
                step={1}
                defaultValue={48}
              />

              <span>HRS</span>
            </div>

            <small>2-day rolling window hydrographic forecast</small>
          </div>
        </div>

        {/* Available Berths */}
        <div className="simulation-parameters__berths">
          <div className="simulation-parameters__berths-heading">
            <label htmlFor="available-berths">Available Berths</label>

            <span>2 / 4 BERTHS OPERATIONAL</span>
          </div>

          <select id="available-berths" name="available_berths" defaultValue={2}>
            <option value={1}>1 Berth — Berth 1 (Active)</option>
            <option value={2}>2 Berths — Berth 1 (Active) &amp; Berth 2 (Active)</option>
            <option value={3}>3 Berths — Berth 1, 2 &amp; 3 (Active)</option>
            <option value={4}>4 Berths — Full Basin Capacity (All Active)</option>
          </select>

          <div className="simulation-parameters__berth-statuses">
            {berthStatuses.map((berth) => (
              <div
                className={`simulation-parameters__berth-status simulation-parameters__berth-status--${berth.variant}`}
                key={berth.name}
              >
                <span>{berth.name}</span>
                <span>{berth.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimulationParameters;
