import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import TopBar from '../../../components/Common/TopBar/TopBar';
import BerthIdentityForm from '../../../components/Berths/AddBerth/BerthIdentityForm/BerthIdentityForm';
import BerthConstraintsForm from '../../../components/Berths/AddBerth/BerthConstraintsForm/BerthConstraintsForm';
import BerthLocationForm from '../../../components/Berths/AddBerth/BerthLocationForm/BerthLocationForm';
import AddBerthActions from '../../../components/Berths/AddBerth/AddBerthActions/AddBerthActions';

import { useAddBerth } from '../../../hooks/berths/useAddBerth';
import { BerthOperationalStatusEnum, type BerthCreateRequest } from '../../../api/models';
import { getFieldErrors, hasFieldErrors, parseApiError } from '../../../utils/apiError';

import './AddBerth.scss';

const SERVER_FIELDS = [
  'name',
  'status',
  'max_vessel_length',
  'max_vessel_draft',
  'latitude',
  'longitude',
] as const satisfies ReadonlyArray<keyof BerthCreateRequest>;

const AddBerthPage = () => {
  const navigate = useNavigate();
  const addBerth = useAddBerth();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<BerthCreateRequest>({
    defaultValues: {
      name: '',
      status: BerthOperationalStatusEnum.active,
      max_vessel_length: '',
      max_vessel_draft: '',
    },
  });

  const parsedError = addBerth.isError ? parseApiError(addBerth.error) : null;
  const fieldErrors = addBerth.isError ? getFieldErrors(addBerth.error) : {};
  const showFormBanner =
    addBerth.isError &&
    parsedError &&
    (!hasFieldErrors(fieldErrors) || Boolean(fieldErrors.non_field_errors));

  const onSubmit = (data: BerthCreateRequest) => {
    clearErrors();
    addBerth.reset();

    const { max_vessel_draft, ...requiredData } = data;

    const payload: BerthCreateRequest =
      typeof max_vessel_draft === 'string' && max_vessel_draft.trim()
        ? { ...requiredData, max_vessel_draft }
        : requiredData;

    addBerth.mutate(payload, {
      onSuccess: () => {
        reset();
        navigate('/app/berths');
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
    navigate('/app/berths');
  };

  return (
    <div className="add-berth-page">
      <TopBar
        breadcrumb={{ label: 'Berths', to: '/app/berths' }}
        current="Add New"
        showSearch={false}
      />

      <div className="add-berth-page__content">
        <div className="add-berth-page__container">
          <form className="add-berth-page__form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {showFormBanner && (
              <div className="add-berth-page__error" role="alert">
                <p className="add-berth-page__error-title">Failed to register berth</p>
                <p className="add-berth-page__error-message">
                  {fieldErrors.non_field_errors ?? parsedError.message}
                </p>
                {(parsedError.status != null || parsedError.code) && (
                  <p className="add-berth-page__error-meta">
                    {parsedError.status != null && <span>HTTP {parsedError.status}</span>}
                    {parsedError.status != null && parsedError.code ? ' · ' : null}
                    {parsedError.code && <span>{parsedError.code}</span>}
                  </p>
                )}
              </div>
            )}

            {addBerth.isSuccess && (
              <p role="status" className="add-berth-page__success">
                Berth registered successfully.
              </p>
            )}

            <BerthIdentityForm register={register} errors={errors} />
            <BerthConstraintsForm register={register} errors={errors} />
            <BerthLocationForm register={register} errors={errors} />

            <AddBerthActions isSubmitting={addBerth.isPending} onCancel={handleCancel} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBerthPage;
