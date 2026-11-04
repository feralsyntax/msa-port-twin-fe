import TopBar from '../../../components/Berths/BerthDirectory/TopBar/TopBar'
import './BerthDirectory.scss'

const BerthDirectoryPage = () => {
  return (
    <div className="berths-page">
      <TopBar />

      <main className="berths-page__content">
        {/* Filters, table, pagination added in later sections */}
      </main>
    </div>
  )
}

export default BerthDirectoryPage