import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { BerthCreateRequest } from '../../../../api/models';
import './BerthLocationForm.scss';

interface BerthLocationFormProps {
  register: UseFormRegister<BerthCreateRequest>;
  errors: FieldErrors<BerthCreateRequest>;
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
          <label htmlFor="berth-latitude">
            Latitude <span>*</span>
          </label>

          <div className="berth-location__input-wrap">
            <input
              id="berth-latitude"
              type="number"
              step="any"
              min="-90"
              max="90"
              placeholder="e.g., -4.053"
              {...register('latitude', {
                required: 'Latitude is required.',
                valueAsNumber: true,
                min: {
                  value: -90,
                  message: 'Latitude cannot be below -90.',
                },
                max: {
                  value: 90,
                  message: 'Latitude cannot exceed 90.',
                },
              })}
            />
            <span className="berth-location__unit">DEG</span>
          </div>

          {errors.latitude && <p className="form-error">{errors.latitude.message}</p>}
        </div>

        <div className="berth-location__field">
          <label htmlFor="berth-longitude">
            Longitude <span>*</span>
          </label>

          <div className="berth-location__input-wrap">
            <input
              id="berth-longitude"
              type="number"
              step="any"
              min="-180"
              max="180"
              placeholder="e.g., 39.678"
              {...register('longitude', {
                required: 'Longitude is required.',
                valueAsNumber: true,
                min: {
                  value: -180,
                  message: 'Longitude cannot be below -180.',
                },
                max: {
                  value: 180,
                  message: 'Longitude cannot exceed 180.',
                },
              })}
            />
            <span className="berth-location__unit">DEG</span>
          </div>

          {errors.longitude && <p className="form-error">{errors.longitude.message}</p>}
        </div>
      </div>

      <p className="berth-location__hint">Coordinates use EPSG:4326 (WGS 84).</p>
    </section>
  );
};

export default BerthLocationForm;
