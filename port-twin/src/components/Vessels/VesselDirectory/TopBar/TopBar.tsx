import { useNavigate } from 'react-router-dom';
import TopBarBase from '../../../Common/TopBar/TopBar';

const TopBar = () => {
  const navigate = useNavigate();

  const handleAddVesselClick = () => {
    navigate('/app/vessels/new');
  };

  return (
    <TopBarBase
      title="Vessels"
      showSearch={false}
      action={
        <button type="button" className="app-topbar__action" onClick={handleAddVesselClick}>
          <span className="material-symbols-outlined">add</span>
          <span>Add Vessel</span>
        </button>
      }
    />
  );
};

export default TopBar;
