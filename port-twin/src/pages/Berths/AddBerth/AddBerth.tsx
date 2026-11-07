import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import AddBerthTopBar from "../../../components/Berths/AddBerth/AddBerthTopBar/AddBerthTopBar";
import BerthIdentityForm, {
  type BerthFormValues,
} from "../../../components/Berths/AddBerth/BerthIdentityForm/BerthIdentityForm";
import BerthConstraintsForm from "../../../components/Berths/AddBerth/BerthConstraintsForm/BerthConstraintsForm";
import BerthLocationForm from "../../../components/Berths/AddBerth/BerthLocationForm/BerthLocationForm";
import AddBerthActions from "../../../components/Berths/AddBerth/AddBerthActions/AddBerthActions";
import "./AddBerth.scss";
import {
  BerthOperationalStatusEnum,
  type BerthCreateRequest,
} from "../../../api/models";

const AddBerthPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BerthCreateRequest>({
    defaultValues: {
      name: "",
      status: BerthOperationalStatusEnum.active,
      max_vessel_length: "",
      max_vessel_draft: "",
      latitude: 0,
      longitude: 0,
    },
  });

  const onSubmit = (data: BerthFormValues) => {
    // Backend currently exposes GET-only berth endpoints.
    // Keep the form production-ready; wire useAddBerth when POST lands.
    console.info("Add berth payload (ready for API):", data);
    reset();
    navigate("/app/berths");
  };

  const handleCancel = () => {
    navigate("/app/berths");
  };

  return (
    <div className='add-berth-page'>
      <AddBerthTopBar />

      <div className='add-berth-page__content'>
        <div className='add-berth-page__container'>
          <form
            className='add-berth-page__form'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <BerthIdentityForm register={register} errors={errors} />
            <BerthConstraintsForm register={register} errors={errors} />
            <BerthLocationForm register={register} errors={errors} />
            <AddBerthActions
              isSubmitting={isSubmitting}
              onCancel={handleCancel}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBerthPage;
