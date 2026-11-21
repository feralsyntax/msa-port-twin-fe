import { useNavigate } from 'react-router-dom';
import TopBarBase from '../../../Common/TopBar/TopBar';

const TopBar = () => {
  const navigate = useNavigate();

  const handleAddBerthClick = () => {
    navigate('/app/berths/new');
  };
  return (
    <TopBarBase
      title="Berths"
      showSearch={false}
      action={
        <button type="button" className="app-topbar__action" onClick={handleAddBerthClick}>
          <span className="material-symbols-outlined">add</span>
          <span>Add Berth</span>
        </button>
      }
    />
  );
};

export default TopBar;
