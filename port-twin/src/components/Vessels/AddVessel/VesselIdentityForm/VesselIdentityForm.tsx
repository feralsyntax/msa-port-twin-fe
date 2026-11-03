import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { VesselCreateRequest } from "../../../../api/models";
import "./VesselIdentityForm.scss";

interface VesselIdentityFormProps {
  register: UseFormRegister<VesselCreateRequest>;
  errors: FieldErrors<VesselCreateRequest>;
}

const VesselIdentityForm = ({ register, errors }: VesselIdentityFormProps) => {
  return (
    <section className='vessel-identity'>
      <div className='vessel-identity__header'>
        <div>
          <h2>Vessel Identity</h2>
          <p>Enter the primary identification details for the vessel.</p>
        </div>
      </div>

      <div className='vessel-identity__field vessel-identity__field--name'>
        <label htmlFor='vessel-name'>
          Vessel Name <span>*</span>
        </label>

        <input
          id='vessel-name'
          type='text'
          placeholder='e.g., MV Kwale Star'
          {...register("name", {
            required: "Vessel name is required.",
            maxLength: {
              value: 255,
              message: "Vessel name cannot exceed 255 characters.",
            },
          })}
        />

        {errors.name && <p className='form-error'>{errors.name.message}</p>}
      </div>

      <div className='vessel-identity__row'>
        <div className='vessel-identity__field'>
          <label htmlFor='imo-number'>IMO Number</label>

          <input
            id='imo-number'
            type='text'
            inputMode='numeric'
            maxLength={7}
            placeholder='e.g., 9876543'
            {...register("imo_number", {
              pattern: {
                value: /^[0-9]{7}$/,
                message: "IMO number must be a 7-digit number.",
              },
            })}
          />

          {errors.imo_number && (
            <p className='form-error'>{errors.imo_number.message}</p>
          )}
        </div>

        <div className='vessel-identity__field'>
          <label htmlFor='mmsi-number'>MMSI</label>

          <input
            id='mmsi-number'
            type='text'
            inputMode='numeric'
            maxLength={9}
            placeholder='e.g., 636019283'
            {...register("mmsi", {
              pattern: {
                value: /^[0-9]{9}$/,
                message: "MMSI must be a 9-digit number.",
              },
            })}
          />

          {errors.mmsi && <p className='form-error'>{errors.mmsi.message}</p>}
        </div>
      </div>

      <div className='vessel-identity__field'>
        <label htmlFor='vessel-type'>
          Vessel Type <span>*</span>
        </label>

        <div className='vessel-identity__select-wrapper'>
          <select
            id='vessel-type'
            {...register("vessel_type", {
              required: "Please select a vessel type.",
            })}
            required
          >
            <option value='container'>Container Ship</option>
            <option value='bulk_carrier'>Bulk Carrier</option>
            <option value='general_cargo'>General Cargo</option>
            <option value='tanker'>Tanker / Liquid Bulk</option>
            <option value='passenger'>Passenger Ship</option>
            <option value='other'>Other</option>
            <option value='unknown'>Unknown</option>
          </select>

          <span className='material-symbols-outlined'>expand_more</span>

          {errors.vessel_type && (
            <p className='form-error'>{errors.vessel_type.message}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default VesselIdentityForm;
