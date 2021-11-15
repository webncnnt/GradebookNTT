import Icon from "../UI/icon/Icon";
type iconProps = {
  className?: string;
};
const FacebookCircleIcon = ({ className }: iconProps) => {
  return (
    <Icon className={className}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 0.5C3.85775 0.5 0.5 3.85775 0.5 8C0.5 11.7433 3.24275 14.846 6.8285 15.4092V10.1675H4.9235V8H6.8285V6.34775C6.8285 4.46825 7.9475 3.43025 9.66125 3.43025C10.4818 3.43025 11.3397 3.5765 11.3397 3.5765V5.4215H10.3947C9.4625 5.4215 9.17225 5.99975 9.17225 6.593V8H11.252L10.9197 10.1675H9.17225V15.4092C12.7572 14.8467 15.5 11.7425 15.5 8C15.5 3.85775 12.1422 0.5 8 0.5Z"
          fill="#333333"
        />
      </svg>
    </Icon>
  );
};

export default FacebookCircleIcon;
