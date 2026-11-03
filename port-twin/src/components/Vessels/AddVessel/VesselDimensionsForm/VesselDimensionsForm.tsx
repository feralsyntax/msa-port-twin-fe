import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { VesselCreateRequest } from "../../../../api/models";
import "./VesselDimensionsForm.scss";

interface VesselDimensionsFormProps {
  register: UseFormRegister<VesselCreateRequest>;
  errors: FieldErrors<VesselCreateRequest>;
}

const VesselDimensionsForm = ({
  register,
  errors,
}: VesselDimensionsFormProps) => {
  return (
    <section className='vessel-dimensions'>
      <div className='vessel-dimensions__header'>
        <div>
          <h2>Physical Dimensions</h2>
          <p>
            Enter the vessel's physical characteristics. These are optional.
          </p>
        </div>
      </div>

      <div className='vessel-dimensions__grid'>
        <div className='vessel-dimensions__field'>
          <label htmlFor='length-overall'>Length Overall (m)</label>

          <div className='vessel-dimensions__input-wrapper'>
            <input
              id='length-overall'
              type='number'
              min='0'
              step='0.01'
              placeholder='e.g., 300.00'
              {...register("length_overall", {
                setValueAs: (value) => (value === "" ? null : value),
                min: {
                  value: 0,
                  message: "Length cannot be negative.",
                },
              })}
            />
            <span>m</span>
          </div>

          {errors.length_overall && (
            <p className='form-error'>{errors.length_overall.message}</p>
          )}
        </div>

        <div className='vessel-dimensions__field'>
          <label htmlFor='beam-width'>Width (m)</label>

          <div className='vessel-dimensions__input-wrapper'>
            <input
              id='beam-width'
              type='number'
              min='0'
              step='0.01'
              placeholder='e.g., 42.00'
              {...register("width", {
                setValueAs: (value) => (value === "" ? null : value),
                min: {
                  value: 0,
                  message: "Width cannot be negative.",
                },
              })}
            />
            <span>m</span>
          </div>

          {errors.width && <p className='form-error'>{errors.width.message}</p>}
        </div>

        <div className='vessel-dimensions__field'>
          <label htmlFor='draft-depth'>Draft (m)</label>

          <div className='vessel-dimensions__input-wrapper'>
            <input
              id='draft-depth'
              type='number'
              min='0'
              step='0.01'
              placeholder='e.g., 14.20'
              {...register("draft", {
                setValueAs: (value) => (value === "" ? null : value),
                min: {
                  value: 0,
                  message: "Draft cannot be negative.",
                },
              })}
            />
            <span>m</span>
          </div>

          {errors.draft && <p className='form-error'>{errors.draft.message}</p>}
        </div>
      </div>
    </section>
  );
};

export default VesselDimensionsForm;
