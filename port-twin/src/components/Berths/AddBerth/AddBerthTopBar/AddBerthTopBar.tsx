import TopBarBase from '../../../Common/TopBar/TopBar';

const AddBerthTopBar = () => {
  return (
    <TopBarBase
      breadcrumb={{ label: 'Berths', to: '/app/berths' }}
      current="Add New"
      showSearch={false}
    />
  );
};

export default AddBerthTopBar;
