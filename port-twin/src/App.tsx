import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shell from './layouts/Shell';
import Dashboard from './pages/Dashboard/Dashboard';
import PlaceholderPage from './pages/PlaceholderPage';
import MapPage from './pages/Map/Map';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing page (future) */}
        <Route path="/" element={<PlaceholderPage title="Landing" />} />

        {/* Authenticated app shell */}
        <Route path="/app" element={<Shell />}>
          <Route index element={<Dashboard />} />
          <Route path="vessels" element={<PlaceholderPage title="Vessels" />} />
          <Route path="berths" element={<PlaceholderPage title="Berths" />} />
          <Route path="predictions" element={<PlaceholderPage title="Marine Predictions" />} />
          <Route path="simulations" element={<PlaceholderPage title="Simulations" />} />
          <Route path="map" element={<MapPage/>}/>
          <Route path="about" element={<PlaceholderPage title="About" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}