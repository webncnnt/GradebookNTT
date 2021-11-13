interface btnProps {
  content: string;
  type: string;
  animate?: boolean;
  fullsize?: boolean;
  onClick?: () => void;
}

const Button = ({ content, type, animate, onClick, fullsize }: btnProps) => {
  return (
    <button
      className={"btn btn--" + type + (animate ? " animate" : "") + ' ' + (fullsize ? 'full': '')}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
