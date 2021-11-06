import React from "react";

interface btnProps {
  content: string;
  type: string;
}

const Button = ({ content, type }: btnProps) => {
  return <button className={"btn btn--" + type}>{content}</button>;
};

export default Button;
