import type { VesselResponse } from '../../../../api/models';
import './VesselSpecifications.scss';

interface VesselSpecificationsProps {
  vessel: VesselResponse;
}

const formatMeasurement = (value: string | null): string => {
  return value !== null ? Number(value).toFixed(2) : '—';
};

const VesselSpecifications = ({ vessel }: VesselSpecificationsProps) => {
  return (
    <section className="vessel-specifications">
      <article className="vessel-specifications__card">
        <div className="vessel-specifications__card-header">
          <span>LENGTH OVERALL</span>
          <span>LOA</span>
        </div>

        <div className="vessel-specifications__value">
          <span className="vessel-specifications__number">
            {formatMeasurement(vessel.length_overall)}
          </span>
          <span className="vessel-specifications__unit">m</span>
        </div>

        <div className="vessel-specifications__footer">
          <span>PARALLEL BODY</span>
          <span className="vessel-specifications__secondary-value">—</span>
        </div>
      </article>

      <article className="vessel-specifications__card">
        <div className="vessel-specifications__card-header">
          <span>WIDTH</span>
          <span>BEAM</span>
        </div>

        <div className="vessel-specifications__value">
          <span className="vessel-specifications__number">{formatMeasurement(vessel.width)}</span>
          <span className="vessel-specifications__unit">m</span>
        </div>

        <div className="vessel-specifications__footer">
          <span>MOULDED DEPTH</span>
          <span className="vessel-specifications__secondary-value">—</span>
        </div>
      </article>

      <article className="vessel-specifications__card">
        <div className="vessel-specifications__card-header">
          <span>DRAFT</span>
          <span>REGISTERED VALUE</span>
        </div>

        <div className="vessel-specifications__value">
          <span className="vessel-specifications__number">{formatMeasurement(vessel.draft)}</span>
          <span className="vessel-specifications__unit">m</span>
        </div>

        <div className="vessel-specifications__footer">
          <span>AIR DRAFT CLEARANCE</span>
          <span className="vessel-specifications__secondary-value">—</span>
        </div>
      </article>
    </section>
  );
};

export default VesselSpecifications;
