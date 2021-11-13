import { NavLink } from "react-router-dom";

type itemProps = {
  content: string;
  link: string;
}

const Item = ({ content, link }: itemProps) => {
  return (
    <li className="item">
      <NavLink to={'/' + link} className={({ isActive }) => isActive ? "active" : ""}>
        {content}
      </NavLink>
    </li>
  );
};

export default Item;
