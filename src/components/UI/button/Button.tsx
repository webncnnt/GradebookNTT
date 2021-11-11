interface btnProps {
  content: string;
  type: string;
  animate?: boolean;
  onClick?: () => void;
}

const Button = ({ content, type, animate, onClick }: btnProps) => {
  return (
    <button
      className={"btn btn--" + type + (animate ? " animate" : "")}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
