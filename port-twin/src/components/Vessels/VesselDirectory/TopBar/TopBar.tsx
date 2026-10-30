import { useState } from "react";
import "./TopBar.scss";

interface TopbarProps {
  onSyncAIS?: () => void;
}

const TopBar = ({ onSyncAIS }: TopbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    if (isSyncing) return;

    setIsSyncing(true);
    onSyncAIS?.();

    window.setTimeout(() => {
      setIsSyncing(false);
    }, 900);
  };

  return (
    <header className='vessels-topbar'>
      {/* Page Information */}
      <div className='vessels-topbar__heading'>
        <h1>Vessels</h1>

        <span className='vessels-topbar__sector'>
          SECTOR MOMBASA-KILINDINI // AIS INGEST ACTIVE
        </span>
      </div>

      {/* Header Actions */}
      <div className='vessels-topbar__actions'>
        {/* Global AIS Search */}
        <div className='vessels-topbar__search'>
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor'>
            <circle cx='11' cy='11' r='8' strokeWidth='1.75' />
            <path
              d='m21 21-4.35-4.35'
              strokeWidth='1.75'
              strokeLinecap='round'
            />
          </svg>

          <input
            type='text'
            placeholder='Global AIS index...'
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            aria-label='Global AIS search'
          />
        </div>

        {/* AIS Synchronization */}
        <button
          type='button'
          className='vessels-topbar__sync-button'
          onClick={handleSync}
          disabled={isSyncing}
        >
          <svg
            className={isSyncing ? "is-syncing" : ""}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path
              d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>

          <span>{isSyncing ? "Syncing..." : "Sync AIS"}</span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
