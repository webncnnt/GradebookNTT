import { ClickAwayListener } from "@mui/base";
import { Paper } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MouseEventHandler, useRef, useState } from "react";

type ScoreCellProps = {
  value: string;
};

const ScoreCell = ({ value }: ScoreCellProps) => {
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

  const handleHover = () => {
    setHover(true);
  };

  const handleLeave = () => {
    setHover(false);
  };

  return (
    <div style={{ display: "flex", width: "100%" }} onMouseOver={handleHover} onMouseLeave={handleLeave}>
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

export default ScoreCell;
