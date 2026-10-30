import "./VesselSpecifications.scss";

interface VesselSpecificationsProps {
  lengthOverall: number;
  parallelBody: number;
  width: number;
  mouldedDepth: number;
  draft: number;
  airDraftClearance: number;
}

const VesselSpecifications = ({
  lengthOverall,
  parallelBody,
  width,
  mouldedDepth,
  draft,
  airDraftClearance,
}: VesselSpecificationsProps) => {
  return (
    <section className='vessel-specifications'>
      {/* Length Overall */}
      <article className='vessel-specifications__card'>
        <div className='vessel-specifications__card-header'>
          <span>LENGTH OVERALL</span>
          <span>LOA</span>
        </div>

        <div className='vessel-specifications__value'>
          <span className='vessel-specifications__number'>
            {lengthOverall.toFixed(2)}
          </span>
          <span className='vessel-specifications__unit'>m</span>
        </div>

        <div className='vessel-specifications__footer'>
          <span>PARALLEL BODY</span>
          <span className='vessel-specifications__secondary-value'>
            {parallelBody.toFixed(1)} m
          </span>
        </div>
      </article>

      {/* Width */}
      <article className='vessel-specifications__card'>
        <div className='vessel-specifications__card-header'>
          <span>WIDTH</span>
          <span>BEAM</span>
        </div>

        <div className='vessel-specifications__value'>
          <span className='vessel-specifications__number'>
            {width.toFixed(2)}
          </span>
          <span className='vessel-specifications__unit'>m</span>
        </div>

        <div className='vessel-specifications__footer'>
          <span>MOULDED DEPTH</span>
          <span className='vessel-specifications__secondary-value'>
            {mouldedDepth.toFixed(1)} m
          </span>
        </div>
      </article>

      {/* Draft */}
      <article className='vessel-specifications__card'>
        <div className='vessel-specifications__card-header'>
          <span>DRAFT</span>
          <span>CURRENT MAXIMUM</span>
        </div>

        <div className='vessel-specifications__value'>
          <span className='vessel-specifications__number'>
            {draft.toFixed(2)}
          </span>
          <span className='vessel-specifications__unit'>m</span>
        </div>

        <div className='vessel-specifications__footer'>
          <span>AIR DRAFT CLEARANCE</span>
          <span className='vessel-specifications__secondary-value'>
            {airDraftClearance.toFixed(1)} m
          </span>
        </div>
      </article>
    </section>
  );
};

export default VesselSpecifications;
