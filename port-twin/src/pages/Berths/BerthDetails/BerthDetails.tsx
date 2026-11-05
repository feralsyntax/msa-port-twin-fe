import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import BerthDetailsTopBar from '../../../components/Berths/BerthDetails/BerthDetailsTopBar/BerthDetailsTopBar';
import BerthIdentityHeader from '../../../components/Berths/BerthDetails/BerthIdentityHeader/BerthIdentityHeader';
import { demoBerths } from '../../../components/Berths/BerthDirectory/BerthTable/demoBerths';
import './BerthDetails.scss';
import BerthSpecCards from '../../../components/Berths/BerthDetails/BerthSpecCards/BerthSpecCards';
import RecentAssignments from '../../../components/Berths/BerthDetails/RecentAssignments/RecentAssignments';

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

        <BerthSpecCards
          maxLoaM={berth.id === '3' ? 350 : berth.maxLoaM}
          maxDraftM={berth.id === '3' ? 16 : berth.maxDraftM}
          currentVessel={berth.id === '3' ? 'None' : berth.currentVessel}
          isAvailable={berth.id === '3' ? true : berth.status === 'available'}
        />

                <div className="berth-details-page__split">
          <RecentAssignments />
          {/* Berth Location — section 4 */}
        </div>
      </div>
    </main>
  )
}

export default BerthDetailsPage