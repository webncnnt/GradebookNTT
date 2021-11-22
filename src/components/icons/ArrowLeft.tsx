import Icon from "../UI/icon/Icon";
type iconProps = {
  className?: string;
  onClick?: () => void;
};
const ArrowLeftIcon = ({ className, onClick }: iconProps) => {
  return (
    <Icon className={className} onClick={onClick}>
      <svg
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.828 6.99999L7.778 11.95L6.364 13.364L0 6.99999L6.364 0.635986L7.778 2.04999L2.828 6.99999Z"
          fill="#333333"
        />
      </svg>
    </Icon>
  );
};

export default ArrowLeftIcon;
