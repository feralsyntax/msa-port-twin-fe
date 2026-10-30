import "./VesselIdentityHeader.scss";

interface VesselIdentityHeaderProps {
  name: string;
  status: string;
  imo: string;
  mmsi: string;
  vesselType: string;
  flag: string;
  flagCode: string;
}

const VesselIdentityHeader = ({
  name,
  status,
  imo,
  mmsi,
  vesselType,
  flag,
  flagCode,
}: VesselIdentityHeaderProps) => {
  return (
    <section className='vessel-identity'>
      <div className='vessel-identity__heading'>
        <h1 className='vessel-identity__name'>{name}</h1>

        <div className='vessel-identity__status'>
          <span className='vessel-identity__status-dot' />
          <span>{status}</span>
        </div>
      </div>

      <div className='vessel-identity__metadata'>
        <span>
          IMO: <span className='vessel-identity__value'>{imo}</span>
        </span>

        <span className='vessel-identity__separator'>·</span>

        <span>
          MMSI: <span className='vessel-identity__value'>{mmsi}</span>
        </span>

        <span className='vessel-identity__separator'>·</span>

        <span>
          Type: <span className='vessel-identity__value'>{vesselType}</span>
        </span>

        <span className='vessel-identity__separator'>·</span>

        <span>
          Flag:{" "}
          <span className='vessel-identity__value'>
            {flag} [{flagCode}]
          </span>
        </span>
      </div>
    </section>
  );
};

export default VesselIdentityHeader;
