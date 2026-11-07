import type { VesselResponse } from '../../../../api/models';
import { formatVesselType } from '../../../../utils/formatVesselType';
import './VesselIdentityPanel.scss';

interface VesselIdentityPanelProps {
  vessel: VesselResponse;
}

const VesselIdentityPanel = ({ vessel }: VesselIdentityPanelProps) => {
  const identityRows = [
    { label: 'System ID', value: vessel.id, mono: true },
    { label: 'Vessel Type', value: formatVesselType(vessel.vessel_type) },
    { label: 'IMO Number', value: vessel.imo_number ?? '—', mono: true },
    { label: 'MMSI', value: vessel.mmsi ?? '—', mono: true },
    {
      label: 'Length Overall',
      value: vessel.length_overall ? `${vessel.length_overall} m` : '—',
    },
    {
      label: 'Width',
      value: vessel.width ? `${vessel.width} m` : '—',
    },
    {
      label: 'Draft',
      value: vessel.draft ? `${vessel.draft} m` : '—',
    },
    {
      label: 'Record Created',
      value: new Date(vessel.created_at).toLocaleString(),
      muted: true,
    },
    {
      label: 'Last Updated',
      value: new Date(vessel.updated_at).toLocaleString(),
      muted: true,
    },
  ];

  return (
    <article className="vessel-identity-panel">
      <div className="vessel-identity-panel__header">
        <h2>Vessel Identity</h2>
        <span>RECORD VERIFIED</span>
      </div>

      <dl className="vessel-identity-panel__list">
        {identityRows.map((row) => (
          <div className="vessel-identity-panel__row" key={row.label}>
            <dt>{row.label}</dt>
            <dd
              className={[
                row.mono && 'vessel-identity-panel__value--mono',
                row.muted && 'vessel-identity-panel__value--muted',
              ]
                .filter(Boolean)
                .join(' ')}
              title={row.label === 'System ID' ? row.value : undefined}
            >
              {row.label === 'System ID' ? (
                <>
                  <span className="vessel-identity-panel__id-full">{row.value}</span>
                  <span className="vessel-identity-panel__id-short">
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
