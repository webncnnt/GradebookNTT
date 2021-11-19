import Icon from "../icon/Icon";

interface avtProps {
  imageSrc: string;
  alt?: string;
}

const Avatar = ({ imageSrc, alt }: avtProps) => {
  return (
    <Icon className="avatar">
      <img src={imageSrc} alt={alt} />
    </Icon>
  );
};

export default Avatar;
