import TopBarBase from '../../../Common/TopBar/TopBar';

interface BerthDetailsTopBarProps {
  berthName?: string;
}

const BerthDetailsTopBar = ({ berthName }: BerthDetailsTopBarProps) => {
  return (
    <TopBarBase
      breadcrumb={{ label: 'Berths', to: '/app/berths' }}
      current={berthName}
      showSearch={false}
    />
  );
};

export default BerthDetailsTopBar;
