import './BerthIdentityHeader.scss';

interface BerthIdentityHeaderProps {
  name: string;
  status: 'AVAILABLE' | 'OCCUPIED' | 'INACTIVE' | 'MAINTENANCE';
}

const BerthIdentityHeader = ({ name, status }: BerthIdentityHeaderProps) => {
  return (
    <div className="berth-identity-header">
      <h1 className="berth-identity-header__title">{name}</h1>
      <span
        className={`berth-identity-header__status berth-identity-header__status--${status.toLowerCase()}`}
      >
        <span className="berth-identity-header__status-dot" />
        {status}
      </span>
    </div>
  );
};

export default BerthIdentityHeader;
