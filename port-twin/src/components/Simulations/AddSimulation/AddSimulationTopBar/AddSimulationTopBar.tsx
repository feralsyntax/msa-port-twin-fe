import TopBarBase from '../../../Common/TopBar/TopBar';

const AddSimulationTopBar = () => {
  return (
    <TopBarBase
      breadcrumb={{ label: 'Simulations', to: '/app/simulations' }}
      current="New"
      showSearch={false}
    />
  );
};

export default AddSimulationTopBar;
