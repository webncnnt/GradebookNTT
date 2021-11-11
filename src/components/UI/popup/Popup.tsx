
interface popupProps {
  children: JSX.Element;
}

const Popup = ({ children }: popupProps) => {
  return (
    <div>
      <div className="backdrop" />
      <div className="popup">{children}</div>
    </div>
  );
};

export default Popup;
