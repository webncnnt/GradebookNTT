import Icon from "../icon/Icon";
import avt from "../../../assets/images/avatar.jpg";

type avtProps = {
  imageSrc?: string;
  alt?: string;
  onClick?: () => void;
};

const Avatar = ({ imageSrc, alt, onClick }: avtProps) => {
  return (
    <Icon className="avatar" onClick={onClick}>
      <img src={imageSrc ? imageSrc : avt} alt={alt} />
    </Icon>
  );
};

export default Avatar;
