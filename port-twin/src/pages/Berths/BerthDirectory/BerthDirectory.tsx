import { useMemo, useState } from 'react';
import TopBar from '../../../components/Berths/BerthDirectory/TopBar/TopBar';
import BerthFilters, {
  type BerthFilterStatus,
} from '../../../components/Berths/BerthDirectory/BerthFilters/BerthFilters';
import BerthTable from '../../../components/Berths/BerthDirectory/BerthTable/BerthTable';
import { demoBerths } from '../../../components/Berths/BerthDirectory/BerthTable/demoBerths';
import './BerthDirectory.scss';

const BerthDirectoryPage = () => {
  const [activeFilter, setActiveFilter] = useState<BerthFilterStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredBerths = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return demoBerths.filter((berth) => {
      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'occupied' &&
          (berth.status === 'occupied' || berth.status === 'reserved')) ||
        (activeFilter === 'available' && berth.status === 'available')

      const matchesQuery =
        query.length === 0 ||
        berth.name.toLowerCase().includes(query) ||
        berth.terminal.toLowerCase().includes(query) ||
        berth.currentVessel.toLowerCase().includes(query)

      return matchesFilter && matchesQuery
    })
  }, [activeFilter, searchQuery])

  const counts = useMemo(
    () => ({
      all: demoBerths.length,
      occupied: demoBerths.filter(
        (b) => b.status === 'occupied' || b.status === 'reserved',
      ).length,
      available: demoBerths.filter((b) => b.status === 'available').length,
    }),
    [],
  )

  return (
    <div className="berths-page">
      <TopBar />

      <main className="berths-page__content">
        <BerthFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          counts={counts}
        />

        <div className="berths-page__table">
          <BerthTable berths={filteredBerths} />
        </div>
      </main>
    </div>
  )
}

export default BerthDirectoryPage