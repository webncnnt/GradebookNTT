interface iconProps {
  children: JSX.Element;
  mr4?: boolean;
}

const Icon = ({ children, mr4 }: iconProps) => {
  return <div className={"frame" + (mr4 ? ' mr4' : '')}>{children}</div>;
};

export default Icon;
