import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shell from './layouts/Shell';
import Dashboard from './pages/Dashboard/Dashboard';
import PlaceholderPage from './pages/PlaceholderPage';
import MapPage from './pages/Map/Map';
import LandingPage from './pages/Landing/Landing';
import VesselsDirectoryPage from './pages/Vessels/VesselDirectory/VesselDirectory';
import VesselDetailsPage from './pages/Vessels/VesselDetails/VesselDetails';
import AddVesselPage from './pages/Vessels/AddVessel/AddVessel';
import BerthDirectoryPage from './pages/Berths/BerthDirectory/BerthDirectory';
import BerthDetailsPage from './pages/Berths/BerthDetails/BerthDetails';
import AddBerthPage from './pages/Berths/AddBerth/AddBerth';
import AddScenarioPage from './pages/Scenarios/AddScenario/AddScenario';
import ScenariosDirectoryPage from './pages/Scenarios/ScenariosDirectory/ScenariosDirectory';
import ScenarioDetailsPage from './pages/Scenarios/ScenarioDetails/ScenarioDetails';
import AddSimulationPage from './pages/Simulations/AddSimulation/AddSimulation';
import SimulationsDirectoryPage from './pages/Simulations/SimulationsDirectory/SimulationsDirectory';
import SimulationDetailsPage from './pages/Simulations/SimulationDetails/SimulationDetails';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing page (future) */}
        <Route path="/" element={<LandingPage />} />

        {/* Authenticated app shell */}
        <Route path="/app" element={<Shell />}>
          <Route index element={<Dashboard />} />
          <Route path="vessels" element={<VesselsDirectoryPage />} />
          <Route path="vessels/:vesselId" element={<VesselDetailsPage />} />
          <Route path="vessels/new" element={<AddVesselPage />} />
          <Route path="berths" element={<BerthDirectoryPage />} />
          <Route path="berths/new" element={<AddBerthPage />} />
          <Route path="berths/:berthId" element={<BerthDetailsPage />} />
          <Route path="scenarios" element={<ScenariosDirectoryPage />} />
          <Route path="scenarios/new" element={<AddScenarioPage />} />
          <Route path="scenarios/:scenarioId" element={<ScenarioDetailsPage />} />

          <Route path="simulations" element={<SimulationsDirectoryPage />} />
          <Route path="simulations/new" element={<AddSimulationPage />} />
          <Route path="simulations/:simulationId" element={<SimulationDetailsPage />} />
          <Route path="predictions" element={<PlaceholderPage title="Marine Predictions" />} />
          <Route path="map" element={<MapPage />} />
          <Route path="about" element={<PlaceholderPage title="About" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
