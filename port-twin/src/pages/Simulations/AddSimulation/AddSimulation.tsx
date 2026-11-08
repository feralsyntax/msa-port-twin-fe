import { useState } from 'react';

import './AddSimulation.scss';

import OperationalModeNotice from '../../../components/Simulations/AddSimulation/OperationalModeNotice/OperationalModeNotice';
import ScenarioSelector from '../../../components/Simulations/AddSimulation/ScenarioSelector/ScenarioSelector';
import LockedParameters from '../../../components/Simulations/AddSimulation/LockedParameters/LockedParameters';

import type { SimulationScenario } from '../../../components/Simulations/AddSimulation/ScenarioSelector/ScenarioSelector';
import AddSimulationActions from '../../../components/Simulations/AddSimulation/AddSimulationActions/AddSimulationActions';
import AddSimulationHeader from '../../../components/Simulations/AddSimulation/AddSimulationHeader/AddSimulationHeader';
import AddSimulationTopBar from '../../../components/Simulations/AddSimulation/AddSimulationTopBar/AddSimulationTopBar';

// Temporary demonstration data for Phase 1.
const dummyScenarios: SimulationScenario[] = [
  {
    id: 'baseline',
    name: 'Baseline Operations — Q4 Peak Freight Route',
    expectedArrivals: 14,
    averageServiceTime: 8.0,
    simulationHorizon: 48,
    availableBerths: ['Berth 1', 'Berth 3'],
  },
  {
    id: 'storm',
    name: 'Severe Berth Surge — Gale Advisory (40kt Gusts)',
    expectedArrivals: 21,
    averageServiceTime: 11.4,
    simulationHorizon: 72,
    availableBerths: ['Berth 1'],
  },
  {
    id: 'dredge',
    name: 'North Channel Restricted Depth Maintenance',
    expectedArrivals: 9,
    averageServiceTime: 6.5,
    simulationHorizon: 36,
    availableBerths: ['Berth 2', 'Berth 3'],
  },
  {
    id: 'tanker',
    name: 'Ultra-Large Crude Carrier (VLCC) Tandem Ingress',
    expectedArrivals: 6,
    averageServiceTime: 18.2,
    simulationHorizon: 96,
    availableBerths: ['Deep-water Terminal A'],
  },
];

const AddSimulationPage = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState('baseline');
  const [queued, setQueued] = useState(false);

  const selectedScenario =
    dummyScenarios.find((scenario) => scenario.id === selectedScenarioId) ?? dummyScenarios[0];

  const handleRunSimulation = () => {
    if (queued) return;
    setQueued(true);
  };

  return (
    <div className="add-simulation-page">
      <AddSimulationTopBar />

      <div className="add-simulation-page__content">
        <div className="add-simulation-page__container">
          <OperationalModeNotice />

          <AddSimulationHeader />

          <ScenarioSelector
            scenarios={dummyScenarios}
            selectedScenario={selectedScenarioId}
            onScenarioChange={setSelectedScenarioId}
          />

          <LockedParameters scenario={selectedScenario} />

          <AddSimulationActions onRun={handleRunSimulation} disabled={queued} queued={queued} />
        </div>
      </div>
    </div>
  );
};

export default AddSimulationPage;
