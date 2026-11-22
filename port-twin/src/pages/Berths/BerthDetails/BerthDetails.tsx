import { useParams } from 'react-router-dom';

import TopBar from '../../../components/Common/TopBar/TopBar';
import BerthIdentityHeader from '../../../components/Berths/BerthDetails/BerthIdentityHeader/BerthIdentityHeader';
import BerthSpecCards from '../../../components/Berths/BerthDetails/BerthSpecCards/BerthSpecCards';
import RecentAssignments from '../../../components/Berths/BerthDetails/RecentAssignments/RecentAssignments';
import BerthLocation from '../../../components/Berths/BerthDetails/BerthLocation/BerthLocation';
import SimulationImpact from '../../../components/Berths/BerthDetails/SimulationImpact/SimulationImpact';

import { useGetBerthDetails } from '../../../hooks/berths/useGetBerthDetails';
import { parseApiError } from '../../../utils/apiError';
import ServerErrors from '../../../components/errors/ServerErrors';

import './BerthDetails.scss';

const BerthDetailsPage = () => {
  const { berthId } = useParams<{ berthId: string }>();

  const {
    data: berth,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetBerthDetails(berthId);

  const parsedError = isError ? parseApiError(error) : null;

  const showBlockingState = isPending || isError || parsedError != null || isFetching || !berth;

  if (showBlockingState) {
    return (
      <main className="berth-details-page">
        <TopBar
          breadcrumb={{ label: 'Berths', to: '/app/berths' }}
          current={berth?.name}
          showSearch={false}
        />
        <div className="berth-details-page__content">
          <ServerErrors
            isPending={isPending}
            isError={isError}
            isFetching={isFetching}
            parsedError={parsedError}
            refetch={refetch}
            requestedData="berth details"
            noData={!isPending && !isError && !berth}
          />
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

  const maxLoaM = berth.max_vessel_length !== null ? Number(berth.max_vessel_length) : null;

  const maxDraftM = berth.max_vessel_draft !== null ? Number(berth.max_vessel_draft) : null;

  const currentVessel = berth.assigned_vessel?.name ?? 'None';

  const isAvailable = berth.status === 'active' && !berth.is_occupied;

  const coordinates =
    berth.latitude !== null && berth.longitude !== null
      ? `${berth.latitude.toFixed(4)}, ${berth.longitude.toFixed(4)}`
      : 'Coordinates unavailable';

  return (
    <main className="berth-details-page">
      <TopBar
        breadcrumb={{ label: 'Berths', to: '/app/berths' }}
        current={berth.name}
        showSearch={false}
      />

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
