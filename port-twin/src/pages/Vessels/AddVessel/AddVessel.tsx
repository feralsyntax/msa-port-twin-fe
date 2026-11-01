import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import "./AddVessel.scss";
import AddVesselTopBar from "../../../components/Vessels/AddVessel/AddVesselTopBar/AddVesselTopBar";
import VesselIdentityForm from "../../../components/Vessels/AddVessel/VesselIdentityForm/VesselIdentityForm";
import VesselDimensionsForm from "../../../components/Vessels/AddVessel/VesselDimensionsForm/VesselDimensionsForm";
import AddVesselActions from "../../../components/Vessels/AddVessel/AddVesselActions/AddVesselActions";

interface VesselFormData {
  name: string;
  imo_number: string;
  mmsi: string;
  vessel_type: string;
  length_overall: string;
  beam_width: string;
  draft_depth: string;
}

const initialFormData: VesselFormData = {
  name: "",
  imo_number: "",
  mmsi: "",
  vessel_type: "container",
  length_overall: "",
  beam_width: "",
  draft_depth: "",
};

const AddVesselPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<VesselFormData>(initialFormData);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    navigate("/app/vessels");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    // Temporary submission handler until backend integration.
    console.log("New vessel form data:", formData);

    alert("Form captured successfully. Backend integration is pending.");

    setIsSubmitting(false);
  };

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
