import { useNavigate } from 'react-router-dom';
import './TopBar.scss';

const TopBar = () => {
  const navigate = useNavigate();

  const handleAddVesselClick = () => {
    navigate('/app/vessels/new');
  };

  return (
    <header className="vessels-topbar">
      {/* Page Information */}
      <div className="vessels-topbar__heading">
        <h1>Vessels</h1>
      </div>

      {/* Header Actions */}
      <div className="vessels-topbar__actions">
        {/* Add Vessel Button */}
        <button
          type="button"
          className="vessels-topbar__add-vessel-button"
          onClick={handleAddVesselClick}
        >
          <span className="vessels-topbar__add-vessel-icon material-symbols-outlined">add</span>
          <span>Add Vessel</span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
