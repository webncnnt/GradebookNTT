interface itemProps {
  content: string;
  isActive: boolean;
}

const Item = ({ content, isActive }: itemProps) => {
  return <li className={"item " + (isActive ? "active" : "")}>{content}</li>;
};

export default Item;
