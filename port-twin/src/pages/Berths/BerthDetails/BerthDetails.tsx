import { useParams } from 'react-router-dom';

import BerthDetailsTopBar from '../../../components/Berths/BerthDetails/BerthDetailsTopBar/BerthDetailsTopBar';
import BerthIdentityHeader from '../../../components/Berths/BerthDetails/BerthIdentityHeader/BerthIdentityHeader';
import BerthSpecCards from '../../../components/Berths/BerthDetails/BerthSpecCards/BerthSpecCards';
import RecentAssignments from '../../../components/Berths/BerthDetails/RecentAssignments/RecentAssignments';
import BerthLocation from '../../../components/Berths/BerthDetails/BerthLocation/BerthLocation';
import SimulationImpact from '../../../components/Berths/BerthDetails/SimulationImpact/SimulationImpact';

import { useGetBerthDetails } from '../../../hooks/berths/useGetBerthDetails';

import './BerthDetails.scss';

const BerthDetailsPage = () => {
  const { berthId } = useParams<{ berthId: string }>();

  const { data: berth, isPending, isError } = useGetBerthDetails(berthId);

  if (isPending) {
    return (
      <main className="berth-details-page">
        <div className="berth-details-page__content">
          <p>Loading berth details...</p>
        </div>
      </main>
    );
  }

  if (isError || !berth) {
    return (
      <main className="berth-details-page">
        <div className="berth-details-page__content">
          <p>Unable to load berth details. Please try again.</p>
        </div>
      </main>
    );
  }

  const statusLabel =
    berth.status === 'maintenance'
      ? 'MAINTENANCE'
      : berth.status === 'inactive'
        ? 'INACTIVE'
        : berth.is_occupied
          ? 'OCCUPIED'
          : 'AVAILABLE';

  const maxLoaM = berth.max_vessel_length ? Number(berth.max_vessel_length) : 0;

  const maxDraftM = berth.max_vessel_draft ? Number(berth.max_vessel_draft) : 0;

  const currentVessel = berth.assigned_vessel?.name ?? 'None';

  const isAvailable = berth.status === 'active' && !berth.is_occupied;

  const coordinates =
    berth.latitude !== null && berth.longitude !== null
      ? `${berth.latitude.toFixed(4)}, ${berth.longitude.toFixed(4)}`
      : 'Coordinates unavailable';

  return (
    <main className="berth-details-page">
      <BerthDetailsTopBar berthName={berth.name} />

      <div className="berth-details-page__content">
        <BerthIdentityHeader name={berth.name} status={statusLabel} />

        <BerthSpecCards
          maxLoaM={maxLoaM}
          maxDraftM={maxDraftM}
          currentVessel={currentVessel}
          isAvailable={isAvailable}
        />

        <div className="berth-details-page__split">
          <RecentAssignments />
          <BerthLocation berthLabel={berth.name.toUpperCase()} coordinates={coordinates} />
        </div>

        <SimulationImpact />
      </div>
    </main>
  );
};

export default BerthDetailsPage;
