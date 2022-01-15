import Icon from "../UI/icon/Icon";
type iconProps = {
  className?: string;
  onClick?: () => void;
};
const NotificationIcon = ({ className, onClick }: iconProps) => {
  return (
    <Icon className={className} onClick={onClick}>
      <svg width='20' height='22' viewBox='0 0 20 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M20 18H0V16H1V9.031C1 4.043 5.03 0 10 0C14.97 0 19 4.043 19 9.031V16H20V18ZM7.5 19H12.5C12.5 19.663 12.2366 20.2989 11.7678 20.7678C11.2989 21.2366 10.663 21.5 10 21.5C9.33696 21.5 8.70107 21.2366 8.23223 20.7678C7.76339 20.2989 7.5 19.663 7.5 19Z'
          fill='#333333'
        />
      </svg>
    </Icon>
  );
};

export default NotificationIcon;
