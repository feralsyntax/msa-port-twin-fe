import { Link } from 'react-router-dom';
import './AddVesselTopBar.scss';

const AddVesselTopBar = () => {
  return (
    <header className="add-vessel-topbar">
      <div className="add-vessel-topbar__breadcrumb">
        <Link to="/app/vessels" className="add-vessel-topbar__parent">
          Vessels
        </Link>

        <span className="add-vessel-topbar__separator">/</span>

        <h1 className="add-vessel-topbar__title">Add New</h1>
      </div>
    </header>
  );
};

export default AddVesselTopBar;
