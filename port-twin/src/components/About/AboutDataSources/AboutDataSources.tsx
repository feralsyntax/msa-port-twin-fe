import './AboutDataSources.scss';

interface DataSource {
  type: string;
  symbol: string;
  title: string;
  description: string;
  accent: string;
}

const dataSources: DataSource[] = [
  {
    type: 'MEASURED',
    symbol: '●',
    title: 'AIS & Vessel Telemetry',
    description:
      'Vessel positions, speeds, and headings. Real-time transponder bursts captured through Class A shipboard units and coastal receivers.',
    accent: 'measured',
  },
  {
    type: 'HISTORICAL',
    symbol: '◐',
    title: 'Port Operations',
    description:
      'Berth limits, channel geometry, and past vessel calls. Calibrated against historical operational manifests and dwell recordings.',
    accent: 'historical',
  },
  {
    type: 'MODEL',
    symbol: '○',
    title: 'Environmental Inputs',
    description:
      'Weather, wind, tide, and oceanographic datasets. Gridded meteorological feeds combined with local bathymetric sounding points.',
    accent: 'model',
  },
  {
    type: 'SIMULATED',
    symbol: '◇',
    title: 'Simulated Inputs',
    description:
      'Controlled scenarios used where live data is unavailable. Heuristic vessel displacement models for outage periods and forward planning.',
    accent: 'simulated',
  },
];

const AboutDataSources = () => {
  return (
    <section className="about-data-sources">
      <div className="about-data-sources__header">
        <div className="about-data-sources__heading">
          <svg
            className="about-data-sources__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.25 2.25L18 6.75" />
          </svg>

          <h2 className="about-data-sources__title">Data Sources</h2>
        </div>

        <span className="about-data-sources__subtitle">TELEMETRY &amp; INGESTION PIPELINES</span>
      </div>

      <div className="about-data-sources__grid">
        {dataSources.map((source) => (
          <article
            key={source.type}
            className={`about-data-sources__card about-data-sources__card--${source.accent}`}
          >
            <div className="about-data-sources__card-header">
              <span
                className={`about-data-sources__badge about-data-sources__badge--${source.accent}`}
              >
                <span aria-hidden="true">{source.symbol}</span>
                {source.type}
              </span>
            </div>

            <h3 className="about-data-sources__card-title">{source.title}</h3>

            <p className="about-data-sources__card-description">{source.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AboutDataSources;
