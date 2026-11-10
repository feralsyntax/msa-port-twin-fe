import AddPredictionSectionHeader from '../AddPredictionSectionHeader/AddPredictionSectionHeader';
import './ForecastWindow.scss';

interface ForecastWindowProps {
  startTime: string;
  onChange: (value: string) => void;
}

const ForecastWindow = ({ startTime, onChange }: ForecastWindowProps) => {
  return (
    <section className="forecast-window">
      <AddPredictionSectionHeader
        title="Forecast Window"
        description="Specify the start time for the marine prediction."
        section="SEC 02"
      />

      <div className="forecast-window__field">
        <label htmlFor="start-time">
          START TIME <span>*</span>
        </label>

        <div className="forecast-window__input-wrapper">
          <input
            id="start-time"
            name="start_time"
            type="datetime-local"
            required
            value={startTime}
            onChange={(e) => onChange(e.target.value)}
          />

          <span>LOCAL TIME</span>
        </div>
      </div>

      <p className="forecast-window__note">Forecast duration: 6 hours · Output interval: 1 hour</p>
    </section>
  );
};

export default ForecastWindow;
