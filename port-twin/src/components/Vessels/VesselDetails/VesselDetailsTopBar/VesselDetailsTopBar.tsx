import { Link } from "react-router-dom";
import "./VesselDetailsTopBar.scss";

interface VesselDetailsTopBarProps {
  vesselName: string;
}

const VesselDetailsTopBar = ({ vesselName }: VesselDetailsTopBarProps) => {
  return (
    <header className='vessel-details-topbar'>
      <div className='vessel-details-topbar__breadcrumb'>
        <Link to='/app/vessels'>Vessels</Link>

        <span className='vessel-details-topbar__separator'>/</span>

        <span className='vessel-details-topbar__vessel-name'>{vesselName}</span>
      </div>
    </header>
  );
};

export default VesselDetailsTopBar;
