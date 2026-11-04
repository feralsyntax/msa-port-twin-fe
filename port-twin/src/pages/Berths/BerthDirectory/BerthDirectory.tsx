import { useState } from 'react';
import TopBar from '../../../components/Berths/BerthDirectory/TopBar/TopBar';
import BerthFilters, {
  type BerthFilterStatus,
} from '../../../components/Berths/BerthDirectory/BerthFilters/BerthFilters';
import './BerthDirectory.scss';

const BerthDirectoryPage = () => {
  const [activeFilter, setActiveFilter] = useState<BerthFilterStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="berths-page">
      <TopBar />

      <main className="berths-page__content">
        <BerthFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          counts={{
            all: 0,
            occupied: 0,
            available: 0,
          }}
        />

        {/* Table + pagination in later sections */}
      </main>
    </div>
  )
}

export default BerthDirectoryPage