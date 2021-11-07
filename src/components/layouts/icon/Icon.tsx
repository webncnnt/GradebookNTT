import Frame from "./frame/Frame";


interface iconProps {
  icon: JSX.Element;
}

const Icon = ({ icon }: iconProps) => {
  return <Frame>{icon}</Frame>;
};

export default Icon;
