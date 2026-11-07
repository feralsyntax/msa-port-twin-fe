import './ScenariosDirectoryHeader.scss';

interface ScenariosDirectoryHeaderProps {
  onNewScenario?: () => void;
}

const ScenariosDirectoryHeader = ({ onNewScenario }: ScenariosDirectoryHeaderProps) => {
  return (
    <header className="scenarios-directory-header">
      <div className="scenarios-directory-header__title-group">
        <h1 className="scenarios-directory-header__title">Scenarios</h1>

        <div className="scenarios-directory-header__divider" />
      </div>

      <button className="scenarios-directory-header__action" type="button" onClick={onNewScenario}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>

        <span>New Scenario</span>
      </button>
    </header>
  );
};

export default ScenariosDirectoryHeader;
