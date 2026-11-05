import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { BerthFormValues } from '../BerthIdentityForm/BerthIdentityForm';
import './BerthLocationForm.scss';

interface BerthLocationFormProps {
  register: UseFormRegister<BerthFormValues>
  errors: FieldErrors<BerthFormValues>
}

const BerthLocationForm = ({ register, errors }: BerthLocationFormProps) => {
  return (
    <section className="berth-location">
      <div className="berth-location__header">
        <div>
          <h2>Geographic Location</h2>
          <p>Used to render the berth on the port map.</p>
        </div>
        <span className="berth-location__sec">SEC 03</span>
      </div>

      <div className="berth-location__grid">
        <div className="berth-location__field">
          <label htmlFor="berth-latitude">Latitude</label>
          <div className="berth-location__input-wrap">
            <input
              id="berth-latitude"
              type="text"
              inputMode="decimal"
              placeholder="e.g., -4.053"
              {...register('latitude', {
                pattern: {
                  value: /^-?\d+(\.\d+)?$/,
                  message: 'Enter a valid latitude (e.g. -4.053).',
                },
              })}
            />
            <span className="berth-location__unit">DEG</span>
          </div>
          {errors.latitude && (
            <p className="form-error">{errors.latitude.message}</p>
          )}
        </div>

        <div className="berth-location__field">
          <label htmlFor="berth-longitude">Longitude</label>
          <div className="berth-location__input-wrap">
            <input
              id="berth-longitude"
              type="text"
              inputMode="decimal"
              placeholder="e.g., 39.678"
              {...register('longitude', {
                pattern: {
                  value: /^-?\d+(\.\d+)?$/,
                  message: 'Enter a valid longitude (e.g. 39.678).',
                },
              })}
            />
            <span className="berth-location__unit">DEG</span>
          </div>
          {errors.longitude && (
            <p className="form-error">{errors.longitude.message}</p>
          )}
        </div>
      </div>

      <p className="berth-location__hint">
        Coordinates use EPSG:4326 (WGS 84).
      </p>
    </section>
  )
}

export default BerthLocationForm