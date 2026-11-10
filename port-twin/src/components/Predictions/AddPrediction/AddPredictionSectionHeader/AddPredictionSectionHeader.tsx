import './AddPredictionSectionHeader.scss';

interface AddPredictionSectionHeaderProps {
  title: string;
  description: string;
  section: string;
}

const AddPredictionSectionHeader = ({
  title,
  description,
  section,
}: AddPredictionSectionHeaderProps) => {
  return (
    <div className="add-prediction-section-header">
      <div className="add-prediction-section-header__content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <span className="add-prediction-section-header__number">{section}</span>
    </div>
  );
};

export default AddPredictionSectionHeader;
