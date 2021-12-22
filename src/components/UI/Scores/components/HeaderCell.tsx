import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRef, useState } from "react";

type HeaderCellProps = {
  value?: string;
};

const HeaderCell = ({ value }: HeaderCellProps) => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleBlur = () => {
    setOpen(false);
  };

  const handleItemClick = () => {
    setOpen(false);
  };

  const handleMouseHoverInContainer = () => {
    setHover(true);
  };

  const handleMouseLeaveInContainer = () => {
    setHover(false);
  };

  return (
    <div style={{ display: "flex", width: "100%" }} onMouseOver={handleMouseHoverInContainer} onMouseLeave={handleMouseLeaveInContainer}>
      <div>{value}</div>
      {hover && (
        <div>
          <button onClick={handleToggle} ref={anchorRef}>
            sssss
          </button>
          <Menu open={open} anchorEl={anchorRef.current} onBlur={handleBlur}>
            <MenuItem onClick={handleItemClick}>OK</MenuItem>
            <MenuItem onClick={handleItemClick}>Cancel</MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default HeaderCell;
