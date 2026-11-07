import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import './ScenarioIdentity.scss';
import type { ScenarioCreateUpdateRequest } from '../../../../api/models';

interface ScenarioIdentityProps {
  register: UseFormRegister<ScenarioCreateUpdateRequest>;
  errors: FieldErrors<ScenarioCreateUpdateRequest>;
}

const ScenarioIdentity = ({ register, errors }: ScenarioIdentityProps) => {
  return (
    <section className="scenario-identity">
      <div className="scenario-identity__header">
        <div className="scenario-identity__title">
          <span className="material-symbols-outlined">tune</span>
          <h2>Scenario Identity</h2>
        </div>

        <span className="scenario-identity__section-number">SEC:01</span>
      </div>

      <div className="scenario-identity__fields">
        <div className="scenario-identity__field">
          <label htmlFor="scenario-name">
            Scenario Name <span>*</span>
          </label>

          <input
            id="scenario-name"
            type="text"
            placeholder="e.g., Storm Conditions — Neap Tide Vector"
            maxLength={200}
            {...register('name', {
              required: 'Scenario name is required.',
              maxLength: {
                value: 200,
                message: 'Scenario name cannot exceed 200 characters.',
              },
            })}
          />

          {errors.name && <small className="form-error">{errors.name.message}</small>}
        </div>

        <div className="scenario-identity__field">
          <label htmlFor="scenario-description">Description</label>

          <textarea
            id="scenario-description"
            placeholder="Describe the operational conditions, seasonal weather factors, or channel restrictions..."
            rows={3}
            {...register('description')}
          />
        </div>

        <div className="scenario-identity__field">
          <label htmlFor="scenario-status">Status</label>

          <div className="scenario-identity__select-wrapper">
            <select id="scenario-status" {...register('status')}>
              <option value="draft">Draft</option>
              <option value="ready">Ready (Operational Baseline)</option>
            </select>

            <span className="material-symbols-outlined">unfold_more</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScenarioIdentity;
