import './AboutThesis.scss';

const AboutThesis = () => {
  return (
    <section className="about-thesis">
      <div className="about-thesis__eyebrow">
        <span className="about-thesis__specification">SPECIFICATION 01.0</span>
        <span className="about-thesis__separator">/</span>
        <span className="about-thesis__category">OPERATIONAL THESIS</span>
      </div>

      <h2 className="about-thesis__title">A digital twin for the Port of Mombasa.</h2>

      <p className="about-thesis__description">
        MSA PortTwin is an AI-powered web application that digitally represents the harbour,
        simulating vessel movement and berth scheduling. It combines marine-condition modelling,
        queue simulation, and schedule optimization to help port planners anticipate congestion and
        evaluate operational scenarios.
      </p>
    </section>
  );
};

export default AboutThesis;
