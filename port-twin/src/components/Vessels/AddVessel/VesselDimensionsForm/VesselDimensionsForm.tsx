import "./VesselDimensionsForm.scss";

interface VesselDimensionsFormProps {
  formData: {
    length_overall: string;
    beam_width: string;
    draft_depth: string;
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const VesselDimensionsForm = ({
  formData,
  onChange,
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
              name='length_overall'
              type='number'
              min='0'
              step='0.01'
              placeholder='e.g., 300.00'
              value={formData.length_overall}
              onChange={onChange}
            />
            <span>m</span>
          </div>
        </div>

        <div className='vessel-dimensions__field'>
          <label htmlFor='beam-width'>Width (m)</label>

          <div className='vessel-dimensions__input-wrapper'>
            <input
              id='beam-width'
              name='beam_width'
              type='number'
              min='0'
              step='0.01'
              placeholder='e.g., 42.00'
              value={formData.beam_width}
              onChange={onChange}
            />
            <span>m</span>
          </div>
        </div>

        <div className='vessel-dimensions__field'>
          <label htmlFor='draft-depth'>Draft (m)</label>

          <div className='vessel-dimensions__input-wrapper'>
            <input
              id='draft-depth'
              name='draft_depth'
              type='number'
              min='0'
              step='0.01'
              placeholder='e.g., 14.20'
              value={formData.draft_depth}
              onChange={onChange}
            />
            <span>m</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VesselDimensionsForm;
