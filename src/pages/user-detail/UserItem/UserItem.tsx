type userItem = {
  icon: JSX.Element;
  content?: string;
};

const UserItem = ({ icon, content }: userItem) => {
  return (
    <div className="user-item">
      <div className="user-item__icon">{icon}</div>
      <div className="user-item__content">{content}</div>
    </div>
  );
};

export default UserItem;
