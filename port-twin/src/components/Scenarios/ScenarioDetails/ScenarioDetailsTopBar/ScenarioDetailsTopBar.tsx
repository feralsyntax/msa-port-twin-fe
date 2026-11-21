import TopBarBase from '../../../Common/TopBar/TopBar';

interface ScenarioDetailsTopBarProps {
  scenarioName?: string;
  onRunSimulation?: () => void;
  isRunning?: boolean;
}

const ScenarioDetailsTopBar = ({
  scenarioName,
  onRunSimulation,
  isRunning,
}: ScenarioDetailsTopBarProps) => {
  return (
    <TopBarBase
      breadcrumb={{ label: 'Scenarios', to: '/app/scenarios' }}
      current={scenarioName}
      showSearch={false}
      action={
        <button
          type="button"
          className="app-topbar__action"
          onClick={onRunSimulation}
          disabled={!onRunSimulation || isRunning}
        >
          <span className="material-symbols-outlined">play_arrow</span>
          <span>{isRunning ? 'Queuing...' : 'Run Simulation'}</span>
        </button>
      }
    />
  );
};

export default ScenarioDetailsTopBar;
