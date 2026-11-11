import AboutTopBar from '../../components/About/AboutTopBar/AboutTopBar';
import AboutThesis from '../../components/About/AboutThesis/AboutThesis';
import AboutDataSources from '../../components/About/AboutDataSources/AboutDataSources';
import AboutAICapabilities from '../../components/About/AboutAICapabilities/AboutAICapabilities';
import AboutSystemArchitecture from '../../components/About/AboutSystemArchitecture/AboutSystemArchitecture';

import './About.scss';

export const AboutPage = () => {
  return (
    <div className="about-page">
      <AboutTopBar />

      <main className="about-page__viewport">
        <div className="about-page__content">
          <AboutThesis />
          <AboutDataSources />
          <AboutAICapabilities />
          <AboutSystemArchitecture />
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
