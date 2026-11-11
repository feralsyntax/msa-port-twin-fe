import './AboutSystemArchitecture.scss';

const technologies = [
  'React + TypeScript',
  'Django + DRF',
  'Huawei Cloud ModelArts',
  'PostgreSQL + PostGIS',
  'MapLibre GL',
];

const AboutSystemArchitecture = () => {
  return (
    <section className="about-system-architecture">
      <div className="about-system-architecture__header">
        <h2 className="about-system-architecture__title">System Architecture</h2>
      </div>

      <div className="about-system-architecture__container">
        <div className="about-system-architecture__technologies">
          {technologies.map((technology, index) => (
            <div className="about-system-architecture__technology-group" key={technology}>
              <span className="about-system-architecture__technology">{technology}</span>

              {index !== technologies.length - 1 && (
                <span className="about-system-architecture__separator" aria-hidden="true">
                  •
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSystemArchitecture;
