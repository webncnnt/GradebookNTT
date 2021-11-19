import Icon from "../UI/icon/Icon";
type iconProps = {
  className?: string;
  onClick?: () => void;
};
const AssignmentIcon = ({ className, onClick }: iconProps) => {
  return (
    <Icon className={className} onClick={onClick}>
      <svg
        width="18"
        height="22"
        viewBox="0 0 18 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 2H17C17.2652 2 17.5196 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3V21C18 21.2652 17.8946 21.5196 17.7071 21.7071C17.5196 21.8946 17.2652 22 17 22H1C0.734784 22 0.48043 21.8946 0.292893 21.7071C0.105357 21.5196 0 21.2652 0 21V3C0 2.73478 0.105357 2.48043 0.292893 2.29289C0.48043 2.10536 0.734784 2 1 2H4V0H6V2H12V0H14V2ZM4 8V10H14V8H4ZM4 12V14H14V12H4Z"
          fill="#333333"
        />
      </svg>
    </Icon>
  );
};

export default AssignmentIcon;
