import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Shell from './layouts/Shell'

function Placeholder() {
  return <p>Page content renders here</p>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shell />}>
          <Route index element={<Placeholder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}