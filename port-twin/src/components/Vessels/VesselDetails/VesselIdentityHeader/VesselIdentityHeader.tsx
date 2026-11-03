import type { VesselResponse } from "../../../../api/models";
import { formatVesselType } from "../../../../utils/formatVesselType";
import "./VesselIdentityHeader.scss";

interface VesselIdentityHeaderProps {
  vessel: VesselResponse;
}

const VesselIdentityHeader = ({ vessel }: VesselIdentityHeaderProps) => {
  return (
    <section className='vessel-identity'>
      <div className='vessel-identity__heading'>
        <h1 className='vessel-identity__name'>{vessel.name}</h1>
      </div>

      <div className='vessel-identity__metadata'>
        <span>
          IMO:{" "}
          <span className='vessel-identity__value'>
            {vessel.imo_number ?? "—"}
          </span>
        </span>

        <span className='vessel-identity__separator'>·</span>

        <span>
          MMSI:{" "}
          <span className='vessel-identity__value'>{vessel.mmsi ?? "—"}</span>
        </span>

        <span className='vessel-identity__separator'>·</span>

        <span>
          Type:{" "}
          <span className='vessel-identity__value'>
            {formatVesselType(vessel.vessel_type)}
          </span>
        </span>
      </div>
    </section>
  );
};

export default VesselIdentityHeader;
