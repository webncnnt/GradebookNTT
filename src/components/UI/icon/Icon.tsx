type iconProps = {
  children: JSX.Element | String | Number;
  className?: string;
  onClick?: () => void;
};

const Icon = ({ children, className, onClick }: iconProps) => {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export default Icon;
