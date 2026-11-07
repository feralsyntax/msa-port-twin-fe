import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import './SimulationParameters.scss';
import type { ScenarioCreateUpdateRequest } from '../../../../api/models';

interface SimulationParametersProps {
  register: UseFormRegister<ScenarioCreateUpdateRequest>;
  errors: FieldErrors<ScenarioCreateUpdateRequest>;
}

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

const SimulationParameters = ({ register, errors }: SimulationParametersProps) => {
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
        <div className="simulation-parameters__row">
          <div className="simulation-parameters__field">
            <label htmlFor="expected-arrivals">Expected Arrivals</label>

            <div className="simulation-parameters__input-wrapper">
              <input
                id="expected-arrivals"
                type="number"
                min={1}
                max={120}
                {...register('parameters.expected_vessel_arrivals', {
                  required: 'Expected arrivals is required.',
                  valueAsNumber: true,
                  min: { value: 1, message: 'At least one arrival is required.' },
                  max: { value: 120, message: 'Maximum 120 arrivals allowed.' },
                })}
              />

              <span>VESSELS</span>
            </div>

            <small>Poisson distribution parameter λ = 14</small>
            {errors.parameters?.expected_vessel_arrivals && (
              <small className="form-error">
                {errors.parameters.expected_vessel_arrivals.message}
              </small>
            )}
          </div>

          <div className="simulation-parameters__field">
            <label htmlFor="arrival-interval">Arrival Interval (Hours)</label>

            <div className="simulation-parameters__input-wrapper">
              <input
                id="arrival-interval"
                type="number"
                min={0.5}
                step={0.1}
                {...register('parameters.arrival_interval_hours', {
                  required: 'Arrival interval is required.',
                  valueAsNumber: true,
                  min: { value: 0.5, message: 'Minimum interval is 0.5 hours.' },
                })}
              />

              <span>HRS</span>
            </div>

            <small>Mean spacing between approach corridors</small>
            {errors.parameters?.arrival_interval_hours && (
              <small className="form-error">
                {errors.parameters.arrival_interval_hours.message}
              </small>
            )}
          </div>
        </div>

        <div className="simulation-parameters__row">
          <div className="simulation-parameters__field">
            <label htmlFor="service-time">Avg Service Time (Hours)</label>

            <div className="simulation-parameters__input-wrapper">
              <input
                id="service-time"
                type="number"
                min={1}
                step={0.5}
                {...register('parameters.average_service_time_hours', {
                  required: 'Average service time is required.',
                  valueAsNumber: true,
                  min: { value: 1, message: 'Minimum service time is 1 hour.' },
                })}
              />

              <span>HRS</span>
            </div>

            <small>Crane handling + stevedore dispatch window</small>
            {errors.parameters?.average_service_time_hours && (
              <small className="form-error">
                {errors.parameters.average_service_time_hours.message}
              </small>
            )}
          </div>

          <div className="simulation-parameters__field">
            <label htmlFor="simulation-horizon">Simulation Horizon (Hours)</label>

            <div className="simulation-parameters__input-wrapper">
              <input
                id="simulation-horizon"
                type="number"
                min={6}
                max={168}
                step={1}
                {...register('parameters.simulation_hours', {
                  required: 'Simulation horizon is required.',
                  valueAsNumber: true,
                  min: { value: 6, message: 'Minimum simulation horizon is 6 hours.' },
                  max: { value: 168, message: 'Maximum simulation horizon is 168 hours.' },
                })}
              />

              <span>HRS</span>
            </div>

            <small>2-day rolling window hydrographic forecast</small>
            {errors.parameters?.simulation_hours && (
              <small className="form-error">{errors.parameters.simulation_hours.message}</small>
            )}
          </div>
        </div>

        <div className="simulation-parameters__berths">
          <div className="simulation-parameters__berths-heading">
            <label htmlFor="available-berths">Available Berths</label>

            <span>2 / 4 BERTHS OPERATIONAL</span>
          </div>

          <select
            id="available-berths"
            {...register('parameters.available_berths', {
              valueAsNumber: true,
              required: 'Available berths is required.',
              min: { value: 1, message: 'At least one berth is required.' },
              max: { value: 4, message: 'Maximum four berths are available.' },
            })}
          >
            <option value={1}>1 Berth — Berth 1 (Active)</option>
            <option value={2}>2 Berths — Berth 1 (Active) &amp; Berth 2 (Active)</option>
            <option value={3}>3 Berths — Berth 1, 2 &amp; 3 (Active)</option>
            <option value={4}>4 Berths — Full Basin Capacity (All Active)</option>
          </select>

          {errors.parameters?.available_berths && (
            <small className="form-error">{errors.parameters.available_berths.message}</small>
          )}

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
