interface containerProps {
  children: any;
}

const Container = ({ children }: containerProps) => {
  return <div className='container'>{children}</div>;
};

export default Container;
