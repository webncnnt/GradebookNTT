interface frameProps {
  children: any;
}

const Frame = ({ children }: frameProps) => {
  return <div className="frame">{children}</div>;
};

export default Frame;
