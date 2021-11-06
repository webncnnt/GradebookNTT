import Item from "./item/Item";

type item = {
  content: string;
  isActive: boolean;
};

let items: item[];

items = [
  {
    content: "Home",
    isActive: true,
  },
  {
    content: "About us",
    isActive: false,
  },
];

const Menu = () => {
  return (
    <ul className="menu">
      {items.map((item: item) => {
        return <Item content={item.content} isActive={item.isActive} />;
      })}
    </ul>
  );
};

export default Menu;
