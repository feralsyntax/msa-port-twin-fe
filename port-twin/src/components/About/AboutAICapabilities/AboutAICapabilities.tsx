import './AboutAICapabilities.scss';

const AboutAICapabilities = () => {
  return (
    <section className="about-ai-capabilities">
      <div className="about-ai-capabilities__eyebrow">
        <span className="about-ai-capabilities__category">HYDRODYNAMIC INFERENCE</span>
        <span className="about-ai-capabilities__separator">/</span>
        <span className="about-ai-capabilities__mapping">OPERATOR MAPPING</span>
      </div>

      <h2 className="about-ai-capabilities__title">The FNO Model</h2>

      <p className="about-ai-capabilities__description">
        The primary AI component is a Fourier Neural Operator (FNO) trained on 2D shallow-water
        equations. It estimates water-flow patterns and current directions based on supported
        environmental inputs, evaluating continuous physical vectors at orders-of- magnitude reduced
        latency compared to classical Navier-Stokes solvers.
      </p>

      <div
        className="about-ai-capabilities__disclosure"
        role="note"
        aria-labelledby="about-ai-limitations-title"
      >
        <div className="about-ai-capabilities__disclosure-heading">
          <svg
            className="about-ai-capabilities__warning-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
            <path d="M12 15.75h.007v.008H12v-.008z" />
          </svg>

          <h3 id="about-ai-limitations-title" className="about-ai-capabilities__disclosure-title">
            Model Limitations
          </h3>
        </div>

        <ul className="about-ai-capabilities__limitations">
          <li>The initial model focuses on water levels and current patterns.</li>
          <li>It does not predict seabed siltation or sediment transport.</li>
          <li>
            Predictions are limited to the conditions and inputs for which the model has been
            tested.
          </li>
          <li>
            This application is not a replacement for live navigation systems or official port
            operations.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AboutAICapabilities;
