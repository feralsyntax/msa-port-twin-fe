import { useNavigate } from 'react-router-dom'
import './TopBar.scss'

const TopBar = () => {
  const navigate = useNavigate()

  const handleAddBerthClick = () => {
    // Route reserved for a later card; keep button wired for parity with vessels
    navigate('/app/berths')
  }

  return (
    <header className="berths-topbar">
      <div className="berths-topbar__heading">
        <h1>Berths</h1>
      </div>

      <div className="berths-topbar__actions">
        <button
          type="button"
          className="berths-topbar__add-button"
          onClick={handleAddBerthClick}
        >
          <span className="berths-topbar__add-icon material-symbols-outlined">
            add
          </span>
          <span>Add Berth</span>
        </button>
      </div>
    </header>
  )
}

export default TopBar