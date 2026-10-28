import './Map.scss';

export default function MapPage() {
  return (
    <div className="map-page">
      <div className="map-page__canvas" id="marine-canvas-container">
        {/* Cartographic SVG layer — next section */}
        <div className="map-page__placeholder">
          <span className="map-page__placeholder-label">MARINE MAP CANVAS</span>
          <span className="map-page__placeholder-hint">
            Kilindini Harbour instrument layer
          </span>
        </div>
      </div>
    </div>
  )
}