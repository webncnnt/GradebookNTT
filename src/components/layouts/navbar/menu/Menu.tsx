import Item from "./item/Item";

const Menu = () => {
  return (
    <ul className="menu">
      <Item content="Home" />
      <Item content="Classroom" />
      <Item content="About us" />
    </ul>
  );
};

export default Menu;
