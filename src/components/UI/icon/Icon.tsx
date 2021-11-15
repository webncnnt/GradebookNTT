type iconProps = {
  children: JSX.Element;
  mr4?: boolean;
  className?: string;
};

const Icon = ({ children, mr4, className }: iconProps) => {
  return <div className={className + (mr4 ? ' mr4' : '')}>{children}</div>;
};

export default Icon;
