import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shell from './layouts/Shell';
import Dashboard from './pages/Dashboard/Dashboard';
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
import SimulationsComparisonPage from './pages/Simulations/SimulationsComparison/SimulationsComparison';
import AddPredictionPage from './pages/Predictions/AddPrediction/AddPrediction';
import PredictionsDirectoryPage from './pages/Predictions/PredictionsDirectory/PredictionsDirectory';
import PredictionDetailsPage from './pages/Predictions/PredictionDetails/PredictionDetails';
import AboutPage from './pages/About/About';
import NotFoundPage from './pages/404/404';
import { appRoutePaths, routes } from './utils/routes';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing page (future) */}
        <Route path={routes.home()} element={<LandingPage />} />

        {/* Authenticated app shell */}
        <Route path={routes.app()} element={<Shell />}>
          <Route index element={<Dashboard />} />
          <Route path={appRoutePaths.vessels} element={<VesselsDirectoryPage />} />
          <Route path={appRoutePaths.vesselNew} element={<AddVesselPage />} />
          <Route path={appRoutePaths.vesselDetails} element={<VesselDetailsPage />} />
          <Route path={appRoutePaths.berths} element={<BerthDirectoryPage />} />
          <Route path={appRoutePaths.berthNew} element={<AddBerthPage />} />
          <Route path={appRoutePaths.berthDetails} element={<BerthDetailsPage />} />
          <Route path={appRoutePaths.scenarios} element={<ScenariosDirectoryPage />} />
          <Route path={appRoutePaths.scenarioNew} element={<AddScenarioPage />} />
          <Route path={appRoutePaths.scenarioDetails} element={<ScenarioDetailsPage />} />

          <Route path={appRoutePaths.simulations} element={<SimulationsDirectoryPage />} />
          <Route path={appRoutePaths.simulationNew} element={<AddSimulationPage />} />
          <Route path={appRoutePaths.compare} element={<SimulationsComparisonPage />} />
          <Route path={appRoutePaths.simulationDetails} element={<SimulationDetailsPage />} />
          <Route path={appRoutePaths.predictions} element={<PredictionsDirectoryPage />} />
          <Route path={appRoutePaths.predictionNew} element={<AddPredictionPage />} />
          <Route path={appRoutePaths.predictionDetails} element={<PredictionDetailsPage />} />
          <Route path={appRoutePaths.map} element={<MapPage />} />
          <Route path={appRoutePaths.about} element={<AboutPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
