import Icon from "../UI/icon/Icon";
type iconProps = {
  className?: string;
  onClick?: () => void;
};
const LocationIcon = ({ className, onClick }: iconProps) => {
  return (
    <Icon className={className} onClick={onClick}>
      <svg
        width="13"
        height="16"
        viewBox="0 0 13 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.0078 11.2995L6.5 15.8073L1.99217 11.2995C1.10062 10.4079 0.493465 9.27202 0.247491 8.0354C0.00151654 6.79877 0.127767 5.51697 0.610278 4.3521C1.09279 3.18723 1.90989 2.19159 2.95825 1.4911C4.00661 0.79061 5.23915 0.416725 6.5 0.416725C7.76086 0.416725 8.99339 0.79061 10.0418 1.4911C11.0901 2.19159 11.9072 3.18723 12.3897 4.3521C12.8722 5.51697 12.9985 6.79877 12.7525 8.0354C12.5065 9.27202 11.8994 10.4079 11.0078 11.2995V11.2995ZM6.5 8.20834C6.87573 8.20834 7.23606 8.05908 7.50174 7.7934C7.76741 7.52773 7.91667 7.16739 7.91667 6.79167C7.91667 6.41595 7.76741 6.05561 7.50174 5.78994C7.23606 5.52426 6.87573 5.375 6.5 5.375C6.12428 5.375 5.76394 5.52426 5.49827 5.78994C5.23259 6.05561 5.08334 6.41595 5.08334 6.79167C5.08334 7.16739 5.23259 7.52773 5.49827 7.7934C5.76394 8.05908 6.12428 8.20834 6.5 8.20834Z"
          fill="#333333"
        />
      </svg>
    </Icon>
  );
};

export default LocationIcon;
