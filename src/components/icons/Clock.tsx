import Icon from "../UI/icon/Icon";
type iconProps = {
  className?: string;
  onClick?: () => void;
};
const ClockIcon = ({ className, onClick }: iconProps) => {
  return (
    <Icon className={className} onClick={onClick}>
      <svg
        width="18"
        height="21"
        viewBox="0 0 18 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.6181 4.968L16.0711 3.515L17.4851 4.929L16.0321 6.382C17.4678 8.17917 18.161 10.4579 17.9691 12.7501C17.7773 15.0424 16.7151 17.1742 15.0005 18.7077C13.286 20.2412 11.0494 21.0601 8.75004 20.9961C6.45067 20.9321 4.26307 19.9901 2.63653 18.3635C1.00999 16.737 0.0679877 14.5494 0.00397711 12.25C-0.0600335 9.95063 0.75881 7.71402 2.29234 5.99951C3.82587 4.285 5.95767 3.22275 8.24993 3.03092C10.5422 2.83909 12.8209 3.53223 14.6181 4.968ZM8.00006 7V13H10.0001V7H8.00006ZM5.00006 0H13.0001V2H5.00006V0Z"
          fill="#333333"
        />
      </svg>
    </Icon>
  );
};

export default ClockIcon;
