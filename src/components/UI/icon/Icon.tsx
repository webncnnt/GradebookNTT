type iconProps = {
  children: JSX.Element;
  className?: string;
};

const Icon = ({ children, className }: iconProps) => {
  return <div className={className}>{children}</div>;
};

export default Icon;
