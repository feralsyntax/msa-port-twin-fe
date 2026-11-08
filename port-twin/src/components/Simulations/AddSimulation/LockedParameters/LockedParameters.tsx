import './LockedParameters.scss';

import type { SimulationScenario } from '../ScenarioSelector/ScenarioSelector';

interface LockedParametersProps {
  scenario: SimulationScenario;
}

const LockedParameters = ({ scenario }: LockedParametersProps) => {
  const parameters = [
    {
      label: 'Expected Arrivals',
      value: scenario.expectedArrivals,
      unit: 'vessels',
      status: 'simulated',
    },
    {
      label: 'Avg Service Time',
      value: scenario.averageServiceTime.toFixed(1),
      unit: 'h / turn',
      status: 'simulated',
    },
    {
      label: 'Simulation Horizon',
      value: scenario.simulationHorizon,
      unit: 'hours',
      status: 'simulated',
    },
  ];

  return (
    <section className="locked-parameters">
      <div className="locked-parameters__heading">
        <div>
          <span className="material-symbols-outlined">lock</span>
          <h2>Locked Parameters</h2>
        </div>
      </div>

      <p className="locked-parameters__description">
        These parameters are defined in the scenario. To change them, edit the scenario
        configuration in the upstream repository.
      </p>

      <div className="locked-parameters__grid">
        {parameters.map((parameter) => (
          <div className="locked-parameters__card" key={parameter.label}>
            <div className="locked-parameters__card-header">
              <span className="locked-parameters__label">{parameter.label}</span>

              <span className="locked-parameters__status">◇ Simulated</span>
            </div>

            <div className="locked-parameters__value-row">
              <div className="locked-parameters__value">
                <span>{parameter.value}</span>
                <small>{parameter.unit}</small>
              </div>

              <span
                className="material-symbols-outlined locked-parameters__lock"
                title="Locked Parameter"
              >
                lock
              </span>
            </div>
          </div>
        ))}

        <div className="locked-parameters__card">
          <div className="locked-parameters__card-header">
            <span className="locked-parameters__label">Available Berths</span>

            <span className="locked-parameters__status locked-parameters__status--measured">
              ● Measured
            </span>
          </div>

          <div className="locked-parameters__value-row">
            <div className="locked-parameters__berths">
              {scenario.availableBerths.length > 0
                ? scenario.availableBerths.join(', ')
                : 'No berths available'}
            </div>

            <span
              className="material-symbols-outlined locked-parameters__lock"
              title="Locked Parameter"
            >
              lock
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LockedParameters;
