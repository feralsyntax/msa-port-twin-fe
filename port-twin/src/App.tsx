import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Shell from './layouts/Shell'
import PlaceholderPage from './pages/PlaceholderPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shell />}>
          <Route index element={<PlaceholderPage title="Dashboard" />} />
          <Route path="vessels" element={<PlaceholderPage title="Vessels" />} />
          <Route path="berths" element={<PlaceholderPage title="Berths" />} />
          <Route
            path="predictions"
            element={<PlaceholderPage title="Marine Predictions" />}
          />
          <Route
            path="simulations"
            element={<PlaceholderPage title="Simulations" />}
          />
          <Route path="map" element={<PlaceholderPage title="Marine Map" />} />
          <Route path="about" element={<PlaceholderPage title="About" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}