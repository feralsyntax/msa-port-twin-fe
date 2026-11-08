import './ScenarioSelector.scss';

export interface SimulationScenario {
  id: string;
  name: string;
  expectedArrivals: number;
  averageServiceTime: number;
  simulationHorizon: number;
  availableBerths: string[];
}

interface ScenarioSelectorProps {
  scenarios: SimulationScenario[];
  selectedScenario: string;
  onScenarioChange: (scenarioId: string) => void;
}

const ScenarioSelector = ({
  scenarios,
  selectedScenario,
  onScenarioChange,
}: ScenarioSelectorProps) => {
  return (
    <section className="scenario-selector">
      <div className="scenario-selector__heading">
        <span className="material-symbols-outlined">hub</span>
        <h2>Select Scenario</h2>
      </div>

      <div className="scenario-selector__field">
        <label htmlFor="scenario-selector">
          Scenario Baseline <span>*</span>
        </label>

        <div className="scenario-selector__select-wrapper">
          <select
            id="scenario-selector"
            value={selectedScenario}
            onChange={(event) => onScenarioChange(event.target.value)}
          >
            {scenarios.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>
                {scenario.name}
              </option>
            ))}
          </select>

          <span className="material-symbols-outlined">expand_more</span>
        </div>
      </div>
    </section>
  );
};

export default ScenarioSelector;
