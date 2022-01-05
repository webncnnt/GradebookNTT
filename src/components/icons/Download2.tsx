import Icon from '../UI/icon/Icon';

type iconProps = {
  className?: string;
  onClick?: () => void;
};

const Download2Icon = ({ className, onClick }: iconProps) => {
  return (
    <Icon className={className} onClick={onClick}>
      <svg width='18' height='20' viewBox='0 0 18 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M0 18H18V20H0V18ZM10 8H17L9 16L1 8H8V0H10V8Z' fill='#333333' />
      </svg>
    </Icon>
  );
};

export default Download2Icon;
