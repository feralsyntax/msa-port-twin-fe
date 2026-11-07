import { Link } from 'react-router-dom';
import './AddBerthTopBar.scss';

const AddBerthTopBar = () => {
  return (
    <header className="add-berth-topbar">
      <div className="add-berth-topbar__breadcrumb">
        <Link to="/app/berths" className="add-berth-topbar__parent">
          Berths
        </Link>
        <span className="add-berth-topbar__separator">/</span>
        <h1 className="add-berth-topbar__title">Add New</h1>
      </div>
    </header>
  );
};

export default AddBerthTopBar;
