interface btnProps {
  className?: string;
  content: string;
  type?: string;
  animate?: boolean;
  fullsize?: boolean;
  onClick?: () => void;
  btnType?: string; //submit | reset | button
}

const Button = ({ className, content, type, animate, onClick, fullsize, btnType }: btnProps) => {
  return (
    <button
      type={btnType ? (btnType === "submit" ? "submit" : "reset") : "button"}
      className={"btn btn--" + type + (animate ? " animate" : "") + " " + (fullsize ? "full" : "") + " " + className}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
