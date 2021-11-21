import { useAuth } from "../../../contexts/auth-context";
import MoreIcon from "../../icons/More";
import Avatar from "../avatar/Avatar";

type postProps = {
  owner: string;
  timeCreate: string; //dd/mm/yyyy
  content: string;
};

const Post = ({ owner, timeCreate, content }: postProps) => {
  const authCtx = useAuth();
  return (
    <div className="post">
      <div className="post__header">
        <div className="post__header-avatar">
          <Avatar
            imageSrc={
              authCtx.user.avatar
                ? authCtx.user.avatar
                : "https://res.cloudinary.com/dtitvei0p/image/upload/v1636946157/upload-img/cdfiqu8sw9gfaaslhs4q.jpg"
            }
          />
        </div>
        <div className="post__owner-time">
          <div className="post__owner">{owner}</div>
          <div className="post__time">{timeCreate}</div>
        </div>
        <div className="post__menu">
          <MoreIcon />
        </div>
      </div>
      <div className="post__content">{content}</div>
    </div>
  );
};

export default Post;
