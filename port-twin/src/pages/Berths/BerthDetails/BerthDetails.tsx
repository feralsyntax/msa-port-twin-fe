import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import BerthDetailsTopBar from '../../../components/Berths/BerthDetails/BerthDetailsTopBar/BerthDetailsTopBar';
import BerthIdentityHeader from '../../../components/Berths/BerthDetails/BerthIdentityHeader/BerthIdentityHeader';
import { demoBerths } from '../../../components/Berths/BerthDirectory/BerthTable/demoBerths';
import './BerthDetails.scss';

const BerthDetailsPage = () => {
  const { berthId } = useParams<{ berthId: string }>()

  const berth = useMemo(
    () => demoBerths.find((item) => item.id === berthId) ?? demoBerths[2],
    [berthId],
  )

  const statusLabel =
    berth.status === 'available'
      ? 'AVAILABLE'
      : berth.status === 'occupied'
        ? 'OCCUPIED'
        : berth.status === 'reserved'
          ? 'RESERVED'
          : 'MAINTENANCE'

  return (
    <main className="berth-details-page">
      <BerthDetailsTopBar berthName={berth.name} />

      <div className="berth-details-page__content">
        <BerthIdentityHeader name={berth.name} status={statusLabel} />

        {/* Spec cards, assignments, location, simulation impact — later sections */}
      </div>
    </main>
  )
}

export default BerthDetailsPage