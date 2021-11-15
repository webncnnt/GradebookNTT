import Icon from "../UI/icon/Icon";
type iconProps = {
  className?: string;
};
const UserStarIcon = ({ className }: iconProps) => {
  return (
    <Icon className={className}>
      <svg
        width="17"
        height="21"
        viewBox="0 0 17 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 12.25V19.25H0.5C0.5 17.3935 1.2375 15.613 2.55025 14.3003C3.86301 12.9875 5.64348 12.25 7.5 12.25V12.25ZM12.75 18.8125L10.1784 20.1644L10.6692 17.3014L8.58937 15.2731L11.4646 14.8549L12.75 12.25L14.0362 14.8549L16.9106 15.2731L14.8307 17.3014L15.3207 20.1644L12.75 18.8125ZM7.5 11.375C4.59937 11.375 2.25 9.02563 2.25 6.125C2.25 3.22437 4.59937 0.875 7.5 0.875C10.4006 0.875 12.75 3.22437 12.75 6.125C12.75 9.02563 10.4006 11.375 7.5 11.375Z"
          fill="#333333"
        />
      </svg>
    </Icon>
  );
};

export default UserStarIcon;
