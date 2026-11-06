import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { BerthFormValues } from '../BerthIdentityForm/BerthIdentityForm';
import './BerthConstraintsForm.scss';

interface BerthConstraintsFormProps {
  register: UseFormRegister<BerthFormValues>
  errors: FieldErrors<BerthFormValues>
}

const BerthConstraintsForm = ({
  register,
  errors,
}: BerthConstraintsFormProps) => {
  return (
    <section className="berth-constraints">
      <div className="berth-constraints__header">
        <div>
          <h2>Operational Constraints</h2>
          <p>Define the maximum physical limits for vessels docking here.</p>
        </div>
        <span className="berth-constraints__sec">SEC 02</span>
      </div>

      <div className="berth-constraints__grid">
        <div className="berth-constraints__field">
          <label htmlFor="max-vessel-length">Max Vessel Length (M)</label>
          <div className="berth-constraints__input-wrap">
            <input
              id="max-vessel-length"
              type="text"
              inputMode="decimal"
              placeholder="e.g., 350.00"
              {...register('max_vessel_length', {
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: 'Enter a valid length (e.g. 350.00).',
                },
              })}
            />
            <span className="berth-constraints__unit">M</span>
          </div>
          {errors.max_vessel_length && (
            <p className="form-error">{errors.max_vessel_length.message}</p>
          )}
        </div>

        <div className="berth-constraints__field">
          <label htmlFor="max-vessel-draft">Max Draft (M)</label>
          <div className="berth-constraints__input-wrap">
            <input
              id="max-vessel-draft"
              type="text"
              inputMode="decimal"
              placeholder="e.g., 16.00"
              {...register('max_vessel_draft', {
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: 'Enter a valid draft (e.g. 16.00).',
                },
              })}
            />
            <span className="berth-constraints__unit">M</span>
          </div>
          {errors.max_vessel_draft && (
            <p className="form-error">{errors.max_vessel_draft.message}</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default BerthConstraintsForm