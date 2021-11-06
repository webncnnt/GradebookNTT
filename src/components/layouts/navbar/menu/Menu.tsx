import Item from "./item/Item";

const Menu = () => {
  return (
    <ul className="menu">
      <Item content="Home" isActive={true} />
      <Item content="Classroom" isActive={false} />
      <Item content="About us" isActive={false} />
    </ul>
  );
};

export default Menu;
