import './ScenarioDetailsHeader.scss';

interface ScenarioDetailsHeaderProps {
  name: string;
  description: string;
  status: 'ready' | 'draft';
}

const ScenarioDetailsHeader = ({ name, description, status }: ScenarioDetailsHeaderProps) => {
  return (
    <section className="scenario-details-header">
      <div className="scenario-details-header__identity">
        <h1>{name}</h1>

        <span
          className={`scenario-details-header__status scenario-details-header__status--${status}`}
        >
          {status}
        </span>
      </div>

      <p>{description}</p>
    </section>
  );
};

export default ScenarioDetailsHeader;
