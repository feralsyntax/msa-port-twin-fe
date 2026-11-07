import { Link } from 'react-router-dom';
import './BerthTable.scss';
import type { Berth } from '../../../../api/models';

interface BerthTableProps {
  berths: Berth[];
}

const statusLabel: Record<Berth['status'], string> = {
  active: 'ACTIVE',
  inactive: 'INACTIVE',
  maintenance: 'MAINTENANCE',
};

const formatMeasurement = (value: string | null) => {
  if (value === null) return '—';

  return `${Number(value).toFixed(1)} m`;
};

const BerthTable = ({ berths }: BerthTableProps) => {
  return (
    <section className="berth-table">
      <div className="berth-table__scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Berth</th>
              <th scope="col">Location</th>
              <th scope="col">Status</th>
              <th scope="col">Occupancy</th>
              <th scope="col">Assigned Vessel</th>
              <th scope="col">Max Draft</th>
              <th scope="col">Max LOA</th>
              <th scope="col">Last Updated</th>
            </tr>
          </thead>

          <tbody>
            {berths.length > 0 ? (
              berths.map((berth) => (
                <tr key={berth.id}>
                  <td>
                    <div className="berth-table__name">
                      <Link to={`/app/berths/${berth.id}`} className="berth-table__name-link">
                        {berth.name}
                      </Link>
                    </div>
                  </td>

                  <td className="berth-table__mono">
                    {berth.latitude !== null && berth.longitude !== null
                      ? `${berth.latitude.toFixed(5)}, ${berth.longitude.toFixed(5)}`
                      : '—'}
                  </td>

                  <td>
                    <span className={`berth-table__status berth-table__status--${berth.status}`}>
                      <span className="berth-table__status-dot" />
                      {statusLabel[berth.status]}
                    </span>
                  </td>

                  <td className="berth-table__mono">
                    {berth.is_occupied ? 'Occupied' : 'Available'}
                  </td>

                  <td className="berth-table__mono">{berth.assigned_vessel?.name ?? '—'}</td>

                  <td className="berth-table__mono">{formatMeasurement(berth.max_vessel_draft)}</td>

                  <td className="berth-table__mono">
                    {formatMeasurement(berth.max_vessel_length)}
                  </td>

                  <td>{new Date(berth.updated_at).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="berth-table__empty">
                  No berths found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default BerthTable;
