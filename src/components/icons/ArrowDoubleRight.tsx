import Icon from '../UI/icon/Icon';
type iconProps = {
  className?: string;
  onClick?: () => void;
};
const ArrowDoubleRightIcon = ({ className, onClick }: iconProps) => {
  return (
    <Icon className={className} onClick={onClick}>
      <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M7 6L17 16L7 26' stroke='#333333' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        <path d='M17 6L27 16L17 26' stroke='#333333' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
    </Icon>
  );
};

export default ArrowDoubleRightIcon;
