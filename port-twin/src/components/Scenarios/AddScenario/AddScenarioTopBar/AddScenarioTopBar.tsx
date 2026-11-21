import TopBarBase from '../../../Common/TopBar/TopBar';

const AddScenarioTopBar = () => {
  return (
    <TopBarBase
      breadcrumb={{ label: 'Scenarios', to: '/app/scenarios' }}
      current="New"
      showSearch={false}
    />
  );
};

export default AddScenarioTopBar;
