import { Link } from 'react-router-dom';
import TopBarBase from '../../../Common/TopBar/TopBar';

const SimulationsDirectoryTopBar = () => {
  return (
    <TopBarBase
      title="Simulations"
      showSearch={false}
      action={
        <Link to="/app/simulations/new" className="app-topbar__action">
          <span className="material-symbols-outlined">add</span>
          <span>New Simulation</span>
        </Link>
      }
    />
  );
};

export default SimulationsDirectoryTopBar;
