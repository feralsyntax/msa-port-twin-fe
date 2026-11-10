import AddPredictionSectionHeader from '../AddPredictionSectionHeader/AddPredictionSectionHeader';
import './GridDefinition.scss';

interface GridDefinitionProps {
  westLon: string;
  eastLon: string;
  southLat: string;
  northLat: string;
  gridNx: string;
  gridNy: string;
  crs: string;
  onChange: (field: string, value: string) => void;
}

const GridDefinition = ({
  westLon,
  eastLon,
  southLat,
  northLat,
  gridNx,
  gridNy,
  crs,
  onChange,
}: GridDefinitionProps) => {
  return (
    <section className="grid-definition">
      <AddPredictionSectionHeader
        title="Grid Definition"
        description="Define the geographic extent and resolution of the model domain."
        section="SEC 01"
      />

      <div className="grid-definition__fields grid-definition__fields--two">
        <div className="grid-definition__field">
          <label htmlFor="west-lon">
            WEST LONGITUDE <span>*</span>
          </label>

          <div className="grid-definition__input-wrapper">
            <input
              id="west-lon"
              type="number"
              name="west_lon"
              step="any"
              min="-180"
              max="180"
              required
              value={westLon}
              onChange={(e) => onChange('westLon', e.target.value)}
              placeholder="e.g., 39.60"
            />
            <span>°E</span>
          </div>
        </div>

        <div className="grid-definition__field">
          <label htmlFor="east-lon">
            EAST LONGITUDE <span>*</span>
          </label>

          <div className="grid-definition__input-wrapper">
            <input
              id="east-lon"
              type="number"
              name="east_lon"
              step="any"
              min="-180"
              max="180"
              required
              value={eastLon}
              onChange={(e) => onChange('eastLon', e.target.value)}
              placeholder="e.g., 39.70"
            />
            <span>°E</span>
          </div>
        </div>
      </div>

      <div className="grid-definition__fields grid-definition__fields--two">
        <div className="grid-definition__field">
          <label htmlFor="south-lat">
            SOUTH LATITUDE <span>*</span>
          </label>

          <div className="grid-definition__input-wrapper">
            <input
              id="south-lat"
              type="number"
              name="south_lat"
              step="any"
              min="-90"
              max="90"
              required
              value={southLat}
              onChange={(e) => onChange('southLat', e.target.value)}
              placeholder="e.g., -4.10"
            />
            <span>°S</span>
          </div>
        </div>

        <div className="grid-definition__field">
          <label htmlFor="north-lat">
            NORTH LATITUDE <span>*</span>
          </label>

          <div className="grid-definition__input-wrapper">
            <input
              id="north-lat"
              type="number"
              name="north_lat"
              step="any"
              min="-90"
              max="90"
              required
              value={northLat}
              onChange={(e) => onChange('northLat', e.target.value)}
              placeholder="e.g., -4.00"
            />
            <span>°S</span>
          </div>
        </div>
      </div>

      <div className="grid-definition__fields grid-definition__fields--three">
        <div className="grid-definition__field">
          <label htmlFor="grid-nx">
            GRID CELLS X (NX) <span>*</span>
          </label>

          <input
            id="grid-nx"
            type="number"
            name="grid_nx"
            min="2"
            step="1"
            required
            value={gridNx}
            onChange={(e) => onChange('gridNx', e.target.value)}
            placeholder="e.g., 64"
          />
        </div>

        <div className="grid-definition__field">
          <label htmlFor="grid-ny">
            GRID CELLS Y (NY) <span>*</span>
          </label>

          <input
            id="grid-ny"
            type="number"
            name="grid_ny"
            min="2"
            step="1"
            required
            value={gridNy}
            onChange={(e) => onChange('gridNy', e.target.value)}
            placeholder="e.g., 64"
          />
        </div>

        <div className="grid-definition__field">
          <label htmlFor="crs-select">CRS</label>

          <select
            id="crs-select"
            name="crs"
            value={crs}
            onChange={(e) => onChange('crs', e.target.value)}
          >
            <option value="EPSG:4326">EPSG:4326</option>
            <option value="EPSG:3857">EPSG:3857</option>
            <option value="EPSG:32737">EPSG:32737 (UTM 37S)</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default GridDefinition;
