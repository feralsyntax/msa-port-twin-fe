import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import './AddPrediction.scss';

import AddPredictionTopBar from '../../../components/Predictions/AddPrediction/AddPredictionTopBar/AddPredictionTopBar';
import AddPredictionFooter from '../../../components/Predictions/AddPrediction/AddPredictionFooter/AddPredictionFooter';
import GridDefinition from '../../../components/Predictions/AddPrediction/GridDefinition/GridDefinition';
import ForecastWindow from '../../../components/Predictions/AddPrediction/ForecastWindow/ForecastWindow';

interface PredictionFormValues {
  westLon: string;
  eastLon: string;
  southLat: string;
  northLat: string;
  gridNx: string;
  gridNy: string;
  crs: string;
  startTime: string;
}

const initialFormValues: PredictionFormValues = {
  westLon: '39.60',
  eastLon: '39.70',
  southLat: '-4.10',
  northLat: '-4.00',
  gridNx: '64',
  gridNy: '64',
  crs: 'EPSG:4326',
  startTime: '',
};

const AddPredictionPage = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<PredictionFormValues>(initialFormValues);

  const [validationMessage, setValidationMessage] = useState('');

  const handleFieldChange = (field: string, value: string) => {
    setFormValues((previous) => ({
      ...previous,
      [field]: value,
    }));

    setValidationMessage('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { westLon, eastLon, southLat, northLat, gridNx, gridNy } = formValues;

    if (Number(westLon) >= Number(eastLon)) {
      setValidationMessage('East longitude must be greater than west longitude.');
      return;
    }

    if (Number(southLat) >= Number(northLat)) {
      setValidationMessage('North latitude must be greater than south latitude.');
      return;
    }

    if (
      !Number.isInteger(Number(gridNx)) ||
      !Number.isInteger(Number(gridNy)) ||
      Number(gridNx) < 2 ||
      Number(gridNy) < 2
    ) {
      setValidationMessage('Grid dimensions must be integers greater than or equal to 2.');
      return;
    }

    setValidationMessage(
      'Configuration validated successfully. Prediction generation is not connected yet.',
    );
  };

  return (
    <div className="add-prediction-page">
      <AddPredictionTopBar />

      <div className="add-prediction-page__content">
        <div className="add-prediction-page__container">
          <form className="add-prediction-page__form" onSubmit={handleSubmit}>
            <GridDefinition
              westLon={formValues.westLon}
              eastLon={formValues.eastLon}
              southLat={formValues.southLat}
              northLat={formValues.northLat}
              gridNx={formValues.gridNx}
              gridNy={formValues.gridNy}
              crs={formValues.crs}
              onChange={handleFieldChange}
            />

            <ForecastWindow
              startTime={formValues.startTime}
              onChange={(value) => handleFieldChange('startTime', value)}
            />

            {validationMessage && (
              <p className="add-prediction-page__validation" role="status">
                {validationMessage}
              </p>
            )}

            <AddPredictionFooter onCancel={() => navigate(-1)} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPredictionPage;
