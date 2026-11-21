import TopBarBase from '../../../Common/TopBar/TopBar';

const AddPredictionTopBar = () => {
  return (
    <TopBarBase
      breadcrumb={{ label: 'Marine Predictions', to: '/app/predictions' }}
      current="New"
      showSearch={false}
    />
  );
};

export default AddPredictionTopBar;
