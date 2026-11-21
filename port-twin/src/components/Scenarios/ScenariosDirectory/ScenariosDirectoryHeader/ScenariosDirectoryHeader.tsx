import TopBarBase from '../../../Common/TopBar/TopBar';

interface ScenariosDirectoryHeaderProps {
  onNewScenario?: () => void;
}

const ScenariosDirectoryHeader = ({ onNewScenario }: ScenariosDirectoryHeaderProps) => {
  return (
    <TopBarBase
      title="Scenarios"
      showSearch={false}
      action={
        <button type="button" className="app-topbar__action" onClick={onNewScenario}>
          <span className="material-symbols-outlined">add</span>
          <span>New Scenario</span>
        </button>
      }
    />
  );
};

export default ScenariosDirectoryHeader;
