import Icon from "../UI/icon/Icon";

type RemoveIconProps = {
  className?: string;
  onClick?: () => void;
};

export const RemoveIcon = ({ className, onClick }: RemoveIconProps) => {
  return (
    <Icon className={className} onClick={onClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 9C10.5523 9 11 9.44771 11 10V16.5C11 17.0523 10.5523 17.5 10 17.5C9.44771 17.5 9 17.0523 9 16.5V10C9 9.44771 9.44771 9 10 9Z"
          fill="black"
          fillOpacity="0.85"
        />
        <path
          d="M15 10C15 9.44771 14.5523 9 14 9C13.4477 9 13 9.44771 13 10V16.5C13 17.0523 13.4477 17.5 14 17.5C14.5523 17.5 15 17.0523 15 16.5V10Z"
          fill="black"
          fillOpacity="0.85"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.6445 1C9.2793 1 8.94315 1.19908 8.76761 1.51932L7.40778 4H2C1.44772 4 1 4.44772 1 5C1 5.55228 1.44772 6 2 6H3.5V22C3.5 22.5523 3.94772 23 4.5 23H19.5C20.0523 23 20.5 22.5523 20.5 22V6H22C22.5523 6 23 5.55228 23 5C23 4.44772 22.5523 4 22 4H16.598L15.2695 1.5268C15.0952 1.20239 14.7568 1 14.3885 1H9.6445ZM14.3277 4L13.7906 3H10.2367L9.68856 4H14.3277ZM5.5 6V21H18.5V6H5.5Z"
          fill="black"
          fillOpacity="0.85"
        />
      </svg>
    </Icon>
  );
};
