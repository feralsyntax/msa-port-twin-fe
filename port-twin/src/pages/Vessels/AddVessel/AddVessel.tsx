import { useNavigate } from 'react-router-dom';

import './AddVessel.scss';
import AddVesselTopBar from '../../../components/Vessels/AddVessel/AddVesselTopBar/AddVesselTopBar';
import VesselIdentityForm from '../../../components/Vessels/AddVessel/VesselIdentityForm/VesselIdentityForm';
import VesselDimensionsForm from '../../../components/Vessels/AddVessel/VesselDimensionsForm/VesselDimensionsForm';
import AddVesselActions from '../../../components/Vessels/AddVessel/AddVesselActions/AddVesselActions';
import { useForm } from 'react-hook-form';
import type { VesselCreateRequest } from '../../../api/models';
import { useAddVessel } from '../../../hooks/vessels/useAddVessel';

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
            {addVessel.isError && (
              <p role="alert" className="alert">
                Failed to register vessel. Please try again.
              </p>
            )}

            {addVessel.isSuccess && (
              <p role="status" className="success">
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
