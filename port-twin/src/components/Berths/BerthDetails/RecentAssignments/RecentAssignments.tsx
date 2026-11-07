import './RecentAssignments.scss';

export interface BerthAssignment {
  vessel: string;
  arrived: string;
  departed: string;
  duration: string;
}

interface RecentAssignmentsProps {
  assignments?: BerthAssignment[];
}

const defaultAssignments: BerthAssignment[] = [
  {
    vessel: 'MV TANA',
    arrived: '10 May, 08:00',
    departed: '10 May, 18:30',
    duration: '10h 30m',
  },
  {
    vessel: 'EVER HORIZON',
    arrived: '08 May, 14:15',
    departed: '09 May, 02:00',
    duration: '11h 45m',
  },
  {
    vessel: 'PACIFIC TRADER',
    arrived: '05 May, 06:45',
    departed: '05 May, 16:20',
    duration: '9h 35m',
  },
];

const RecentAssignments = ({ assignments = defaultAssignments }: RecentAssignmentsProps) => {
  return (
    <section className="recent-assignments" aria-label="Recent assignments">
      <div className="recent-assignments__header">
        <h2 className="recent-assignments__title">Recent Assignments</h2>
        <span className="recent-assignments__meta">AIS LOGGED · PAST 7 DAYS</span>
      </div>

      <div className="recent-assignments__scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">VESSEL</th>
              <th scope="col">ARRIVED</th>
              <th scope="col">DEPARTED</th>
              <th scope="col">DURATION</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((row) => (
              <tr key={`${row.vessel}-${row.arrived}`}>
                <td>
                  <span className="recent-assignments__vessel">
                    <span className="recent-assignments__vessel-mark" />
                    {row.vessel}
                  </span>
                </td>
                <td className="recent-assignments__mono">{row.arrived}</td>
                <td className="recent-assignments__mono">{row.departed}</td>
                <td className="recent-assignments__duration">{row.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentAssignments;
