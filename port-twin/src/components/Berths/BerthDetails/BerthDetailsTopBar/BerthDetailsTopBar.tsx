import { Link } from 'react-router-dom';
import './BerthDetailsTopBar.scss';

interface BerthDetailsTopBarProps {
  berthName: string;
}

const BerthDetailsTopBar = ({ berthName }: BerthDetailsTopBarProps) => {
  return (
    <header className="berth-details-topbar">
      <div className="berth-details-topbar__crumbs">
        <Link to="/app/berths" className="berth-details-topbar__parent">
          Berths
        </Link>
        <span className="berth-details-topbar__sep">/</span>
        <span className="berth-details-topbar__current">{berthName}</span>
      </div>
    </header>
  );
};

export default BerthDetailsTopBar;
