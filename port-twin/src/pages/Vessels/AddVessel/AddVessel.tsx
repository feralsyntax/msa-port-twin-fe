import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './AddVessel.scss';
import AddVesselTopBar from '../../../components/Vessels/AddVessel/AddVesselTopBar/AddVesselTopBar';
import VesselIdentityForm from '../../../components/Vessels/AddVessel/VesselIdentityForm/VesselIdentityForm';
import VesselDimensionsForm from '../../../components/Vessels/AddVessel/VesselDimensionsForm/VesselDimensionsForm';
import AddVesselActions from '../../../components/Vessels/AddVessel/AddVesselActions/AddVesselActions';
import type { VesselCreateRequest } from '../../../api/models';
import { useAddVessel } from '../../../hooks/vessels/useAddVessel';
import { parseApiError } from '../../../utils/apiError';

const AddVesselPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VesselCreateRequest>({
    defaultValues: {
      name: '',
      imo_number: '',
      mmsi: '',
      vessel_type: undefined,
      length_overall: '',
      width: '',
      draft: '',
    },
  });

  const navigate = useNavigate();
  const addVessel = useAddVessel();

  const parsedError = addVessel.isError ? parseApiError(addVessel.error) : null;

  const onSubmit = (data: VesselCreateRequest) => {
    addVessel.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  const handleCancel = () => {
    navigate('/app/vessels');
  };

  return (
    <div className="add-vessel-page">
      <AddVesselTopBar />

      <div className="add-vessel-page__content">
        <div className="add-vessel-page__container">
          <form className="add-vessel-page__form" onSubmit={handleSubmit(onSubmit)}>
            {parsedError && (
              <div className="add-vessel-page__error" role="alert">
                <p className="add-vessel-page__error-title">Failed to register vessel</p>
                <p className="add-vessel-page__error-message">{parsedError.message}</p>
                {(parsedError.status != null || parsedError.code) && (
                  <p className="add-vessel-page__error-meta">
                    {parsedError.status != null && <span>HTTP {parsedError.status}</span>}
                    {parsedError.status != null && parsedError.code ? ' · ' : null}
                    {parsedError.code && <span>{parsedError.code}</span>}
                  </p>
                )}
              </div>
            )}

            {addVessel.isSuccess && (
              <p role="status" className="add-vessel-page__success">
                Vessel registered successfully.
              </p>
            )}

            <VesselIdentityForm register={register} errors={errors} />

            <VesselDimensionsForm register={register} errors={errors} />

            <AddVesselActions isSubmitting={addVessel.isPending} onCancel={handleCancel} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVesselPage;
