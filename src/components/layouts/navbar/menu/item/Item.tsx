import { NavLink } from "react-router-dom";

interface itemProps {
  content: string;
}

const Item = ({ content }: itemProps) => {
  return (
    <li className="item">
      <NavLink to={'/' + content} className={({ isActive }) => isActive ? "active" : ""}>
        {content}
      </NavLink>
    </li>
  );
};

export default Item;
