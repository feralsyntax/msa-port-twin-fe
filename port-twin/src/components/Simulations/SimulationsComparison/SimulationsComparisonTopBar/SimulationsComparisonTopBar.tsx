import TopBarBase from '../../../Common/TopBar/TopBar';

const SimulationsComparisonTopBar = () => {
  return (
    <TopBarBase
      breadcrumb={{ label: 'Simulations', to: '/app/simulations' }}
      current="Compare"
      showSearch={false}
    />
  );
};

export default SimulationsComparisonTopBar;
