import type { UseFormRegister, FieldErrors } from "react-hook-form";
import "./BerthIdentityForm.scss";
import type { BerthCreateRequest } from "../../../../api/models";

interface BerthIdentityFormProps {
  register: UseFormRegister<BerthCreateRequest>;
  errors: FieldErrors<BerthCreateRequest>;
}

const BerthIdentityForm = ({ register, errors }: BerthIdentityFormProps) => {
  return (
    <section className='berth-identity'>
      <div className='berth-identity__header'>
        <div>
          <h2>Berth Identity</h2>
          <p>Enter the primary identification details for the berth.</p>
        </div>
        <span className='berth-identity__sec'>SEC 01</span>
      </div>

      <div className='berth-identity__grid'>
        <div className='berth-identity__field'>
          <label htmlFor='berth-name'>
            Berth Name <span>*</span>
          </label>
          <input
            id='berth-name'
            type='text'
            placeholder='e.g., Berth 5'
            {...register("name", {
              required: "Berth name is required.",
              maxLength: {
                value: 255,
                message: "Berth name cannot exceed 255 characters.",
              },
            })}
          />
          {errors.name && <p className='form-error'>{errors.name.message}</p>}
        </div>

        <div className='berth-identity__field'>
          <label htmlFor='berth-terminal'>Terminal</label>
          <input
            id='berth-terminal'
            type='text'
            placeholder='e.g., Mombasa Main'
            {...register("terminal", {
              maxLength: {
                value: 255,
                message: "Terminal cannot exceed 255 characters.",
              },
            })}
          />
          {errors.terminal && (
            <p className='form-error'>{errors.terminal.message}</p>
          )}
        </div>

        <div className='berth-identity__field berth-identity__field--full'>
          <label htmlFor='berth-status'>
            Status <span>*</span>
          </label>
          <div className='berth-identity__select-wrap'>
            <select
              id='berth-status'
              {...register("status", {
                required: "Status is required.",
              })}
            >
              <option value='available'>Available</option>
              <option value='occupied'>Occupied</option>
              <option value='reserved'>Reserved</option>
              <option value='maintenance'>Maintenance</option>
            </select>
          </div>
          {errors.status && (
            <p className='form-error'>{errors.status.message}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BerthIdentityForm;
