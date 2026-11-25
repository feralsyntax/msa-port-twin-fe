import AddPredictionSectionHeader from '../AddPredictionSectionHeader/AddPredictionSectionHeader';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { MarinePredictionRequest } from '../../../../api/models';
import './ForecastWindow.scss';

interface ForecastWindowProps {
  register: UseFormRegister<MarinePredictionRequest>;
  errors: FieldErrors<MarinePredictionRequest>;
}

const ForecastWindow = ({ register, errors }: ForecastWindowProps) => {
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
            type="datetime-local"
            aria-invalid={Boolean(errors.forecast?.start_time)}
            aria-describedby={
              errors.forecast?.start_time ? 'prediction-start-time-error' : undefined
            }
            {...register('forecast.start_time', {
              required: 'Forecast start time is required.',
              validate: (value) =>
                !Number.isNaN(new Date(value).getTime()) || 'Enter a valid forecast start time.',
            })}
          />

          <span>LOCAL TIME</span>
        </div>
        {errors.forecast?.start_time?.message && (
          <p id="prediction-start-time-error" className="form-error">
            {errors.forecast.start_time.message}
          </p>
        )}
      </div>

      <p className="forecast-window__note">
        The selected local date and time will be sent to the API in UTC.
      </p>
    </section>
  );
};

export default ForecastWindow;
