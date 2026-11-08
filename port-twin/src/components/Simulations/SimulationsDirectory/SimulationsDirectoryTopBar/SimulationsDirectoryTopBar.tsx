import './SimulationsDirectoryTopBar.scss';

const SimulationsDirectoryTopBar = () => {
  return (
    <header className="simulations-directory-top-bar">
      <h1 className="simulations-directory-top-bar__title">Simulations</h1>

      <a href="/simulations/new" className="simulations-directory-top-bar__action">
        <span className="material-symbols-outlined">add</span>
        <span>New Simulation</span>
      </a>
    </header>
  );
};

export default SimulationsDirectoryTopBar;
