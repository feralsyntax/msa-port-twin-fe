import { useEffect, useMemo, useState } from 'react';
import TopBar from '../../../components/Berths/BerthDirectory/TopBar/TopBar';
import BerthFilters, {
  type BerthFilterStatus,
} from '../../../components/Berths/BerthDirectory/BerthFilters/BerthFilters';
import BerthTable from '../../../components/Berths/BerthDirectory/BerthTable/BerthTable';
import BerthPagination from '../../../components/Berths/BerthDirectory/BerthPagination/BerthPagination';
import { demoBerths } from '../../../components/Berths/BerthDirectory/BerthTable/demoBerths';
import './BerthDirectory.scss';

const PAGE_SIZE = 5

const BerthDirectoryPage = () => {
  const [activeFilter, setActiveFilter] = useState<BerthFilterStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

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

  const totalItems = filteredBerths.length
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE))

  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilter, searchQuery])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const pageBerths = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredBerths.slice(start, start + PAGE_SIZE)
  }, [filteredBerths, currentPage])

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

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

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
          <BerthTable berths={pageBerths} />

          <BerthPagination
            currentPage={totalItems === 0 ? 0 : currentPage}
            totalPages={totalItems === 0 ? 0 : totalPages}
            totalItems={totalItems}
            pageSize={PAGE_SIZE}
            onPageChange={handlePageChange}
            canGoPrevious={currentPage > 1 && totalItems > 0}
            canGoNext={currentPage < totalPages && totalItems > 0}
          />
        </div>
      </main>
    </div>
  )
}

export default BerthDirectoryPage