import "./VesselIdentityPanel.scss";

export interface VesselIdentityData {
  id: string;
  vesselType: string;
  imo: string;
  mmsi: string;
  callSign: string;
  grossTonnage: number;
  recordCreated: string;
  lastUpdated: string;
}

interface VesselIdentityPanelProps {
  vessel: VesselIdentityData;
}

const VesselIdentityPanel = ({ vessel }: VesselIdentityPanelProps) => {
  const identityRows = [
    { label: "System ID", value: vessel.id, mono: true },
    { label: "Vessel Type", value: vessel.vesselType },
    { label: "IMO Number", value: vessel.imo, mono: true },
    { label: "MMSI", value: vessel.mmsi, mono: true },
    { label: "Call Sign", value: vessel.callSign, mono: true },
    {
      label: "Gross Tonnage",
      value: `${vessel.grossTonnage.toLocaleString()} GT`,
      mono: true,
    },
    { label: "Record Created", value: vessel.recordCreated, muted: true },
    { label: "Last Updated", value: vessel.lastUpdated, muted: true },
  ];

  return (
    <article className='vessel-identity-panel'>
      <div className='vessel-identity-panel__header'>
        <h2>Vessel Identity</h2>
        <span>RECORD VERIFIED</span>
      </div>

      <dl className='vessel-identity-panel__list'>
        {identityRows.map((row) => (
          <div className='vessel-identity-panel__row' key={row.label}>
            <dt>{row.label}</dt>
            <dd
              className={[
                row.mono && "vessel-identity-panel__value--mono",
                row.muted && "vessel-identity-panel__value--muted",
              ]
                .filter(Boolean)
                .join(" ")}
              title={row.label === "System ID" ? row.value : undefined}
            >
              {row.label === "System ID" ? (
                <>
                  <span className='vessel-identity-panel__id-full'>
                    {row.value}
                  </span>
                  <span className='vessel-identity-panel__id-short'>
                    {row.value.slice(0, 8)}...{row.value.slice(-6)}
                  </span>
                </>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
};

export default VesselIdentityPanel;
