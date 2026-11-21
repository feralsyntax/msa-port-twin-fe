import TopBarBase from '../../../Common/TopBar/TopBar';

interface SimulationDetailsTopBarProps {
  simulationId?: string;
}

const SimulationDetailsTopBar = ({ simulationId }: SimulationDetailsTopBarProps) => {
  return (
    <TopBarBase
      breadcrumb={{ label: 'Simulations', to: '/app/simulations' }}
      current={simulationId}
      showSearch={false}
      action={
        <button type="button" className="app-topbar__action">
          <span className="material-symbols-outlined">compare_arrows</span>
          <span>Compare Runs</span>
        </button>
      }
    />
  );
};

export default SimulationDetailsTopBar;
