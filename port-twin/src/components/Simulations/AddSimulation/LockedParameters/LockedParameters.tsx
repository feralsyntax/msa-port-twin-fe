import type { ScenarioParameters } from '../../../../api/models';
import './LockedParameters.scss';


interface LockedParametersProps {
  parameters: ScenarioParameters;
}

const LockedParameters = ({ parameters }: LockedParametersProps) => {
  const parameterCards = [
    {
      label: 'Expected Arrivals',
      value: parameters.expected_vessel_arrivals,
      unit: 'vessels',
    },
    {
      label: 'Avg Service Time',
      value: parameters.average_service_time_hours.toFixed(1),
      unit: 'h / turn',
    },
    {
      label: 'Simulation Horizon',
      value: parameters.simulation_hours,
      unit: 'hours',
    },
    {
      label: 'Available Berths',
      value: parameters.available_berths ?? '—',
      unit: 'berths',
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
        {parameterCards.map((parameter) => (
          <div className="locked-parameters__card" key={parameter.label}>
            <div className="locked-parameters__card-header">
              <span className="locked-parameters__label">{parameter.label}</span>

              <span className="locked-parameters__status">◇ Configured</span>
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
      </div>
    </section>
  );
};

export default LockedParameters;
