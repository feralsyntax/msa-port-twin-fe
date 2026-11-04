import { Link } from 'react-router-dom';
import type { Berth } from './demoBerths';
import './BerthTable.scss';

interface BerthTableProps {
  berths: Berth[]
}

const statusLabel: Record<Berth['status'], string> = {
  occupied: 'OCCUPIED',
  available: 'AVAILABLE',
  reserved: 'RESERVED',
  maintenance: 'MAINTENANCE',
}

const BerthTable = ({ berths }: BerthTableProps) => {
  return (
    <section className="berth-table">
      <div className="berth-table__scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Berth</th>
              <th scope="col">Terminal</th>
              <th scope="col">Status</th>
              <th scope="col">Occupancy</th>
              <th scope="col">Current Vessel</th>
              <th scope="col">Max Draft</th>
              <th scope="col">Max LOA</th>
              <th scope="col">Last Measured</th>
            </tr>
          </thead>

          <tbody>
            {berths.length > 0 ? (
              berths.map((berth) => (
                <tr key={berth.id}>
                  <td>
                    <div className="berth-table__name">
                      <Link
                        to={`/app/berths/${berth.id}`}
                        className="berth-table__name-link"
                      >
                        {berth.name}
                      </Link>
                    </div>
                  </td>

                  <td>{berth.terminal}</td>

                  <td>
                    <span
                      className={`berth-table__status berth-table__status--${berth.status}`}
                    >
                      <span className="berth-table__status-dot" />
                      {statusLabel[berth.status]}
                    </span>
                  </td>

                  <td className="berth-table__mono">
                    {berth.status === 'available' || berth.status === 'maintenance'
                      ? '—'
                      : `${berth.occupancy}%`}
                  </td>

                  <td className="berth-table__mono">{berth.currentVessel}</td>

                  <td className="berth-table__mono">{berth.maxDraftM.toFixed(1)} m</td>

                  <td className="berth-table__mono">{berth.maxLoaM} m</td>

                  <td>
                    <span className="berth-table__measurement">
                      <span className="berth-table__live-dot" />
                      {berth.lastMeasured}
                    </span>
                  </td>
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
  )
}

export default BerthTable