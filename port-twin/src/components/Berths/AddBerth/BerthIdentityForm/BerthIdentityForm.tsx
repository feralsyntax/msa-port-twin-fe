import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import './BerthIdentityForm.scss';
import { BerthOperationalStatusEnum, type BerthCreateRequest } from '../../../../api/models';

interface BerthIdentityFormProps {
  register: UseFormRegister<BerthCreateRequest>;
  errors: FieldErrors<BerthCreateRequest>;
}

const BerthIdentityForm = ({ register, errors }: BerthIdentityFormProps) => {
  return (
    <section className="berth-identity">
      <div className="berth-identity__header">
        <div>
          <h2>Berth Identity</h2>
          <p>Enter the primary identification details for the berth.</p>
        </div>
        <span className="berth-identity__sec">SEC 01</span>
      </div>

      <div className="berth-identity__grid">
        <div className="berth-identity__field">
          <label htmlFor="berth-name">
            Berth Name <span>*</span>
          </label>
          <input
            id="berth-name"
            type="text"
            maxLength={100}
            placeholder="e.g., Berth 5"
            {...register('name', {
              required: 'Berth name is required.',
              maxLength: {
                value: 100,
                message: 'Berth name cannot exceed 100 characters.',
              },
            })}
          />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>

        <div className="berth-identity__field berth-identity__field--full">
          <label htmlFor="berth-status">
            Status <span>*</span>
          </label>

          <div className="berth-identity__select-wrap">
            <select
              id="berth-status"
              {...register('status', {
                required: 'Status is required.',
              })}
            >
              <option value={BerthOperationalStatusEnum.active}>Active</option>
              <option value={BerthOperationalStatusEnum.inactive}>Inactive</option>
              <option value={BerthOperationalStatusEnum.maintenance}>Under Maintenance</option>
            </select>
          </div>

          {errors.status && <p className="form-error">{errors.status.message}</p>}
        </div>
      </div>
    </section>
  );
};

export default BerthIdentityForm;
