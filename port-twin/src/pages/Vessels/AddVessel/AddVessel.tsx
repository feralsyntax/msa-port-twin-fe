import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import "./AddVessel.scss";
import AddVesselTopBar from "../../../components/Vessels/AddVessel/AddVesselTopBar/AddVesselTopBar";
import VesselIdentityForm from "../../../components/Vessels/AddVessel/VesselIdentityForm/VesselIdentityForm";
import VesselDimensionsForm from "../../../components/Vessels/AddVessel/VesselDimensionsForm/VesselDimensionsForm";
import AddVesselActions from "../../../components/Vessels/AddVessel/AddVesselActions/AddVesselActions";

const AddVesselPage = () => {

  return (
    <div className='add-vessel-page'>
      <AddVesselTopBar />

      <div className='add-vessel-page__content'>
        <div className='add-vessel-page__container'>
          <form className='add-vessel-page__form' onSubmit={handleSubmit}>
            <VesselIdentityForm formData={formData} onChange={handleChange} />

            <VesselDimensionsForm formData={formData} onChange={handleChange} />

            <AddVesselActions
              isSubmitting={isSubmitting}
              onCancel={handleCancel}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVesselPage;
