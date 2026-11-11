import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PredictionsDirectoryTopBar from '../../../components/Predictions/PredictionsDirectory/PredictionsDirectoryTopBar/PredictionsDirectoryTopBar';
import PredictionsDirectoryStatusTabs from '../../../components/Predictions/PredictionsDirectory/PredictionsDirectoryStatusTabs/PredictionsDirectoryStatusTabs';
import PredictionsDirectoryTable from '../../../components/Predictions/PredictionsDirectory/PredictionsDirectoryTable/PredictionsDirectoryTable';
import PredictionsDirectoryPagination from '../../../components/Predictions/PredictionsDirectory/PredictionsDirectoryPagination/PredictionsDirectoryPagination';

import type {
  MarinePrediction,
  PredictionFilter,
} from '../../../components/Predictions/PredictionsDirectory/types/predictions-directory.types';

import './PredictionsDirectory.scss';

const SAMPLE_PREDICTIONS: MarinePrediction[] = [
  {
    id: 'a1b2c3d4-e5f6',
    gridExtent: '04°S, 39°E',
    resolution: '1km res',
    status: 'completed',
    createdAt: '12 May, 14:08',
  },
  {
    id: 'b2c3d4e5-f6a7',
    gridExtent: '04°S, 39°E',
    resolution: '2km res',
    status: 'completed',
    createdAt: '12 May, 11:30',
  },
  {
    id: 'c3d4e5f6-a7b8',
    gridExtent: '03°S, 40°E',
    resolution: '1km res',
    status: 'failed',
    createdAt: '11 May, 16:45',
  },
  {
    id: 'd4e5f6a7-b8c9',
    gridExtent: '04°S, 39°E',
    resolution: '500m res',
    status: 'completed',
    createdAt: '11 May, 09:15',
  },
  {
    id: 'e5f6a7b8-c9d0',
    gridExtent: '04°S, 39°E',
    resolution: '1km res',
    status: 'completed',
    createdAt: '10 May, 14:00',
  },
  {
    id: 'f6a7b8c9-d0e1',
    gridExtent: '04°S, 39°E',
    resolution: '1km res',
    status: 'completed',
    createdAt: '09 May, 08:30',
  },
];

const PAGE_SIZE = 6;

export const MarinePredictionsPage = () => {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState<PredictionFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPredictions = useMemo(() => {
    if (activeFilter === 'all') {
      return SAMPLE_PREDICTIONS;
    }

    return SAMPLE_PREDICTIONS.filter((prediction) => prediction.status === activeFilter);
  }, [activeFilter]);

  const counts = useMemo(
    () => ({
      all: SAMPLE_PREDICTIONS.length,
      completed: SAMPLE_PREDICTIONS.filter((prediction) => prediction.status === 'completed')
        .length,
      failed: SAMPLE_PREDICTIONS.filter((prediction) => prediction.status === 'failed').length,
    }),
    [],
  );

  const totalPages = Math.max(1, Math.ceil(filteredPredictions.length / PAGE_SIZE));

  const paginatedPredictions = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;

    return filteredPredictions.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredPredictions, currentPage]);

  const handleFilterChange = (filter: PredictionFilter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setActiveFilter('all');
    setCurrentPage(1);
  };

  const handleSelectPrediction = (predictionId: string) => {
    navigate(`/app/marine-predictions/${predictionId}`);
  };

  return (
    <div className="marine-predictions-page">
      <PredictionsDirectoryTopBar />

      <PredictionsDirectoryStatusTabs
        activeFilter={activeFilter}
        counts={counts}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      <main className="marine-predictions-page__content">
        <PredictionsDirectoryTable
          predictions={paginatedPredictions}
          onSelectPrediction={handleSelectPrediction}
        />
      </main>

      <PredictionsDirectoryPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredPredictions.length}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default MarinePredictionsPage;
