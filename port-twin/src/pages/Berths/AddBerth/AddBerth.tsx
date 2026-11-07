import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import AddBerthTopBar from '../../../components/Berths/AddBerth/AddBerthTopBar/AddBerthTopBar';
import BerthIdentityForm from '../../../components/Berths/AddBerth/BerthIdentityForm/BerthIdentityForm';
import BerthConstraintsForm from '../../../components/Berths/AddBerth/BerthConstraintsForm/BerthConstraintsForm';
import BerthLocationForm from '../../../components/Berths/AddBerth/BerthLocationForm/BerthLocationForm';
import AddBerthActions from '../../../components/Berths/AddBerth/AddBerthActions/AddBerthActions';

import { useAddBerth } from '../../../hooks/berths/useAddBerth';
import { BerthOperationalStatusEnum, type BerthCreateRequest } from '../../../api/models';

import './AddBerth.scss';

const AddBerthPage = () => {
  const navigate = useNavigate();
  const addBerth = useAddBerth();

  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BerthCreateRequest>({
    defaultValues: {
      name: '',
      status: BerthOperationalStatusEnum.active,
      max_vessel_length: '',
      max_vessel_draft: '',
    },
  });

  const onSubmit = async (data: BerthCreateRequest) => {
    setSubmissionError(null);

    try {
      const { max_vessel_draft, ...requiredData } = data;

      const payload: BerthCreateRequest = max_vessel_draft?.trim()
        ? { ...requiredData, max_vessel_draft }
        : requiredData;

      await addBerth.mutateAsync(payload);

      reset();
      navigate('/app/berths');
    } catch (error) {
      console.error('Failed to create berth:', error);
      setSubmissionError('Unable to save the berth. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/app/berths');
  };

  return (
    <div className="add-berth-page">
      <AddBerthTopBar />

      <div className="add-berth-page__content">
        <div className="add-berth-page__container">
          <form className="add-berth-page__form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <BerthIdentityForm register={register} errors={errors} />

            <BerthConstraintsForm register={register} errors={errors} />

            <BerthLocationForm register={register} errors={errors} />

            {submissionError && (
              <p className="form-error" role="alert">
                {submissionError}
              </p>
            )}

            <AddBerthActions isSubmitting={isSubmitting} onCancel={handleCancel} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBerthPage;
