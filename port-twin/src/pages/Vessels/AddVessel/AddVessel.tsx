import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './AddVessel.scss';
import TopBar from '../../../components/Common/TopBar/TopBar';
import VesselIdentityForm from '../../../components/Vessels/AddVessel/VesselIdentityForm/VesselIdentityForm';
import VesselDimensionsForm from '../../../components/Vessels/AddVessel/VesselDimensionsForm/VesselDimensionsForm';
import AddVesselActions from '../../../components/Vessels/AddVessel/AddVesselActions/AddVesselActions';
import type { VesselCreateRequest } from '../../../api/models';
import { useAddVessel } from '../../../hooks/vessels/useAddVessel';
import { getFieldErrors, hasFieldErrors, parseApiError } from '../../../utils/apiError';

const SERVER_FIELDS = [
  'name',
  'imo_number',
  'mmsi',
  'vessel_type',
  'length_overall',
  'width',
  'draft',
] as const satisfies ReadonlyArray<keyof VesselCreateRequest>;

const AddVesselPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
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
  const fieldErrors = addVessel.isError ? getFieldErrors(addVessel.error) : {};
  const showFormBanner =
    addVessel.isError &&
    parsedError &&
    (!hasFieldErrors(fieldErrors) || Boolean(fieldErrors.non_field_errors));

  const onSubmit = (data: VesselCreateRequest) => {
    clearErrors();
    addVessel.reset();

    addVessel.mutate(data, {
      onSuccess: () => {
        reset();
      },
      onError: (error) => {
        const fields = getFieldErrors(error);

        for (const name of SERVER_FIELDS) {
          const message = fields[name];
          if (message) {
            setError(name, { type: 'server', message });
          }
        }
      },
    });
  };

  const handleCancel = () => {
    navigate('/app/vessels');
  };

  return (
    <div className="add-vessel-page">
      <TopBar
        breadcrumb={{ label: 'Vessels', to: '/app/vessels' }}
        current="Add New"
        showSearch={false}
      />

      <div className="add-vessel-page__content">
        <div className="add-vessel-page__container">
          <form className="add-vessel-page__form" onSubmit={handleSubmit(onSubmit)}>
            {showFormBanner && (
              <div className="add-vessel-page__error" role="alert">
                <p className="add-vessel-page__error-title">Failed to register vessel</p>
                <p className="add-vessel-page__error-message">
                  {fieldErrors.non_field_errors ?? parsedError.message}
                </p>
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
