import TopBarBase from '../../../Common/TopBar/TopBar';

interface VesselDetailsTopBarProps {
  vesselName?: string;
}

const VesselDetailsTopBar = ({ vesselName }: VesselDetailsTopBarProps) => {
  return (
    <TopBarBase
      breadcrumb={{ label: 'Vessels', to: '/app/vessels' }}
      current={vesselName}
      showSearch={false}
    />
  );
};

export default VesselDetailsTopBar;
