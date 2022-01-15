interface NotificationInterface {
  notifyMessage: string;
}

interface NotificationProps {
  listNotifications: NotificationInterface[];
}

const Notification = ({ listNotifications }: NotificationProps) => {
  console.log(listNotifications);

  return (
    <div className='notification'>
      <ul className='notification__items'>
        {listNotifications.map((noti, key) => {
          return (
            <li className='notification__item' key={key}>
              {noti.notifyMessage}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Notification;
