import { Link } from 'react-router-dom';
import type { VesselResponse } from '../../../../api/models';
import './VesselTable.scss';
import { formatVesselType } from '../../../../utils/formatVesselType';

interface VesselTableProps {
  vessels: VesselResponse[];
}

const VesselTable = ({ vessels }: VesselTableProps) => {
  return (
    <section className="vessel-table">
      <div className="vessel-table__scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Vessel Name</th>
              <th scope="col">IMO</th>
              <th scope="col">MMSI</th>
              <th scope="col">Type</th>
              <th scope="col">Length</th>
              <th scope="col">Width</th>
              <th scope="col">Draft</th>
            </tr>
          </thead>

          <tbody>
            {vessels.length > 0 ? (
              vessels.map((vessel) => {
                return (
                  <tr key={vessel.id}>
                    <td>
                      <div className="vessel-table__name">
                        <Link to={`/app/vessels/${vessel.id}`} className="vessel-table__name-link">
                          {vessel.name}
                        </Link>
                      </div>
                    </td>

                    <td className="vessel-table__mono">{vessel.imo_number ?? '—'}</td>

                    <td className="vessel-table__mono">{vessel.mmsi ?? '—'}</td>

                    <td>{formatVesselType(vessel.vessel_type)}</td>

                    <td>{vessel.length_overall ?? '—'}</td>

                    <td>{vessel.width ?? '—'}</td>

                    <td>{vessel.draft ?? '—'}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="vessel-table__empty">
                  No vessels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default VesselTable;
