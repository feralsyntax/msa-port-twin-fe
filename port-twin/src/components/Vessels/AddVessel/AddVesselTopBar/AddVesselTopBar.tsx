import TopBarBase from '../../../Common/TopBar/TopBar';

const AddVesselTopBar = () => {
  return (
    <TopBarBase
      breadcrumb={{ label: 'Vessels', to: '/app/vessels' }}
      current="Add New"
      showSearch={false}
    />
  );
};

export default AddVesselTopBar;
