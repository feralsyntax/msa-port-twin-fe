import type { Vessel, VesselStatus } from "./demoVessels";
import "./VesselTable.scss";

interface VesselTableProps {
  vessels: Vessel[];
  selectedVesselId?: string;
}

const statusLabels: Record<VesselStatus, string> = {
  "in-port": "In Port",
  approaching: "Approaching",
  delayed: "Delayed",
  departed: "Departed",
};

const VesselTable = ({ vessels, selectedVesselId = "1" }: VesselTableProps) => {
  return (
    <section className='vessel-table'>
      <div className='vessel-table__scroll'>
        <table>
          <thead>
            <tr>
              <th scope='col'>Vessel Name</th>
              <th scope='col'>MMSI</th>
              <th scope='col'>Type</th>
              <th scope='col'>Status</th>
              <th scope='col'>ETA</th>
              <th scope='col'>Berth</th>
              <th scope='col'>Measured (AIS Live)</th>
            </tr>
          </thead>

          <tbody>
            {vessels.length > 0 ? (
              vessels.map((vessel) => {
                const isSelected = vessel.id === selectedVesselId;

                return (
                  <tr
                    key={vessel.id}
                    className={isSelected ? "is-selected" : ""}
                    aria-selected={isSelected}
                  >
                    <td>
                      <div className='vessel-table__name'>
                        {isSelected && (
                          <span className='vessel-table__selection-indicator' />
                        )}
                        <span>{vessel.name}</span>
                      </div>
                    </td>

                    <td className='vessel-table__mono'>{vessel.mmsi}</td>

                    <td>{vessel.type}</td>

                    <td>
                      <span
                        className={`vessel-table__status vessel-table__status--${vessel.status}`}
                      >
                        <span className='vessel-table__status-dot' />
                        {statusLabels[vessel.status]}
                      </span>
                    </td>

                    <td className='vessel-table__mono'>{vessel.eta}</td>

                    <td>{vessel.berth}</td>

                    <td>
                      <span className='vessel-table__measurement'>
                        <span className='vessel-table__live-dot' />
                        {vessel.lastMeasured}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className='vessel-table__empty'>
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
