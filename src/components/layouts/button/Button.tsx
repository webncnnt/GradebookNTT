interface btnProps {
  content: string;
  type: string;
  animate?: boolean;
}

const Button = ({ content, type, animate }: btnProps) => {
  return (
    <button className={"btn btn--" + type + (animate ? " animate" : "")}>
      {content}
    </button>
  );
};

export default Button;
