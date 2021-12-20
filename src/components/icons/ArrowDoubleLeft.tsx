import Icon from '../UI/icon/Icon';
type iconProps = {
  className?: string;
  onClick?: () => void;
};
const ArrowDoubleLeftIcon = ({ className, onClick }: iconProps) => {
  return (
    <Icon className={className} onClick={onClick}>
      <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M25 26L15 16L25 6' stroke='#333333' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        <path d='M15 26L5 16L15 6' stroke='#333333' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
    </Icon>
  );
};

export default ArrowDoubleLeftIcon;
