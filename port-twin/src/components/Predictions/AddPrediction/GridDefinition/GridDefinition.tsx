import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { MarinePredictionRequest } from '../../../../api/models';
import AddPredictionSectionHeader from '../AddPredictionSectionHeader/AddPredictionSectionHeader';
import './GridDefinition.scss';

interface GridDefinitionProps {
  register: UseFormRegister<MarinePredictionRequest>;
  errors: FieldErrors<MarinePredictionRequest>;
}

const GridDefinition = ({ register, errors }: GridDefinitionProps) => {
  const domainError = errors.domain?.message;

  return (
    
    <section className="grid-definition">
      <AddPredictionSectionHeader
        title="Prediction Domain"
        description="Choose a predefined sea area for this prediction."
        section="SEC 01"
      />

      <div className="grid-definition__field">
        <label htmlFor="prediction-domain">
          DOMAIN <span>*</span>
        </label>
        <select
          id="prediction-domain"
          aria-invalid={Boolean(domainError)}
          aria-describedby={domainError ? 'prediction-domain-error' : undefined}
          {...register('domain', { required: 'Select a prediction domain.' })}
        >
          <option value="mombasa_offshore">Mombasa Offshore</option>
        </select>
        {domainError && (
          <p id="prediction-domain-error" className="form-error">
            {domainError}
          </p>
        )}
      </div>

      <div className="grid-definition__summary" aria-label="Mombasa Offshore domain details">
        <h3>Area summary</h3>
        <dl>
          <div>
            <dt>West</dt>
            <dd>39.60°E</dd>
          </div>
          <div>
            <dt>East</dt>
            <dd>39.70°E</dd>
          </div>
          <div>
            <dt>South</dt>
            <dd>4.10°S</dd>
          </div>
          <div>
            <dt>North</dt>
            <dd>4.00°S</dd>
          </div>
          <div>
            <dt>Grid size</dt>
            <dd>64 × 64</dd>
          </div>
          <div>
            <dt>CRS</dt>
            <dd>EPSG:4326</dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default GridDefinition;
