
type popupProps = {
  children: JSX.Element;
  onClose?: () => void;
}

const Popup = ({ children, onClose }: popupProps) => {
  return (
    <div>
      <div className="backdrop" onClick={onClose}/>
      <div className="popup">{children}</div>
    </div>
  );
};

export default Popup;
