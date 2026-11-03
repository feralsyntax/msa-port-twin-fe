import "./VesselIdentityForm.scss";



const VesselIdentityForm = () => {
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
          name='name'
          type='text'
          placeholder='e.g., MV Kwale Star'
          value={formData.name}
          onChange={onChange}
          required
        />
      </div>

      <div className='vessel-identity__row'>
        <div className='vessel-identity__field'>
          <label htmlFor='imo-number'>IMO Number</label>

          <input
            id='imo-number'
            name='imo_number'
            type='text'
            inputMode='numeric'
            pattern='[0-9]{7}'
            maxLength={7}
            placeholder='e.g., 9876543'
            value={formData.imo_number}
            onChange={onChange}
          />
        </div>

        <div className='vessel-identity__field'>
          <label htmlFor='mmsi-number'>MMSI</label>

          <input
            id='mmsi-number'
            name='mmsi'
            type='text'
            inputMode='numeric'
            pattern='[0-9]{9}'
            maxLength={9}
            placeholder='e.g., 636019283'
            value={formData.mmsi}
            onChange={onChange}
          />
        </div>
      </div>

      <div className='vessel-identity__field'>
        <label htmlFor='vessel-type'>
          Vessel Type <span>*</span>
        </label>

        <div className='vessel-identity__select-wrapper'>
          <select
            id='vessel-type'
            name='vessel_type'
            value={formData.vessel_type}
            onChange={onChange}
            required
          >
            <option value='container'>Container Ship</option>
            <option value='bulk'>Bulk Carrier</option>
            <option value='cargo'>General Cargo</option>
            <option value='tanker'>Tanker / Liquid Bulk</option>
            <option value='tug'>Tugboat / Pilot</option>
          </select>

          <span className='material-symbols-outlined'>expand_more</span>
        </div>
      </div>
    </section>
  );
};

export default VesselIdentityForm;
