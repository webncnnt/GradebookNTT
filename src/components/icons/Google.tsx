import Icon from "../UI/icon/Icon";
type iconProps = {
  className?: string;
  onClick?: () => void;
};
const GoogleIcon = ({ className, onClick }: iconProps) => {
  return (
    <Icon className={className} onClick={onClick}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 8H17.533C17.577 8.385 17.6 8.78 17.6 9.184C17.6 11.918 16.62 14.22 14.922 15.784C13.437 17.155 11.404 17.959 8.98 17.959C7.80067 17.9595 6.63279 17.7276 5.54311 17.2766C4.45344 16.8256 3.46333 16.1642 2.62936 15.3303C1.7954 14.4965 1.13394 13.5064 0.682779 12.4168C0.231619 11.3272 -0.000393388 10.1593 8.91745e-07 8.98C-0.000524813 7.80058 0.231391 6.63262 0.682492 5.54288C1.13359 4.45314 1.79503 3.46298 2.62901 2.62901C3.46298 1.79503 4.45314 1.13359 5.54288 0.682492C6.63262 0.231391 7.80058 -0.000524813 8.98 8.91745e-07C11.4 8.91745e-07 13.433 0.890001 14.988 2.339L13.526 3.8C12.368 2.681 10.803 2 9 2C8.08075 2 7.1705 2.18106 6.32122 2.53284C5.47194 2.88463 4.70026 3.40024 4.05025 4.05025C3.40024 4.70026 2.88463 5.47194 2.53284 6.32122C2.18106 7.1705 2 8.08075 2 9C2 9.91925 2.18106 10.8295 2.53284 11.6788C2.88463 12.5281 3.40024 13.2997 4.05025 13.9497C4.70026 14.5998 5.47194 15.1154 6.32122 15.4672C7.1705 15.8189 8.08075 16 9 16C12.526 16 15.144 13.392 15.577 10H9V8Z"
          fill="#333333"
        />
      </svg>
    </Icon>
  );
};

export default GoogleIcon;
