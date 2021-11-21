import ArrowRightIcon from "../../icons/ArrowRight";
import AssignmentIcon from "../../icons/Assignment";
import ClockIcon from "../../icons/Clock";
import CommentIcon from "../../icons/Comment";
import DocumentIcon from "../../icons/Document";
import VideoIcon from "../../icons/Video";

type noticeProps = {
  title: string;
  commentCount: number;
  deadline: string; // dd/mm/yyyy
  type: string; //video, document,assignment
  onClick?: () => void;
};

const Notice = ({
  title,
  commentCount,
  deadline,
  type,
  onClick,
}: noticeProps) => {
  let noticeIcon: JSX.Element;

  let countdown: number; // deadline countdown = deadline - now

  const now: any = new Date(); //"now"
  countdown = miliseconsToDays(Date.parse(formatDate(deadline)) - now);

  if (type === "video") {
    if (countdown < 3) {
      noticeIcon = <VideoIcon className="comming" />;
    } else {
      noticeIcon = <VideoIcon className="far" />;
    }
  } else if (type === "document") {
    if (countdown < 3) {
      noticeIcon = <DocumentIcon className="comming" />;
    } else {
      noticeIcon = <DocumentIcon className="far" />;
    }
  } else {
    if (countdown < 3) {
      noticeIcon = <AssignmentIcon className="comming" />;
    } else {
      noticeIcon = <AssignmentIcon className="far" />;
    }
  }

  return (
    <div
      className={
        "notice" + (countdown < 3 ? " notice--comming" : " notice--far")
      }
    >
      <div className="notice__header">
        <div
          className={
            "notice__icon" +
            (countdown < 3 ? " notice__icon--comming" : " notice__icon--far")
          }
        >
          {noticeIcon}
        </div>
        <div className="notice__title-comment">
          <h2 className="notice__title">{title}</h2>
          <div className="notice__comment">
            <div className="notice__comment-icon">
              {countdown < 3 ? (
                <CommentIcon className="comming" />
              ) : (
                <CommentIcon className="far" />
              )}
            </div>
            <div className="notice__comment-count">{commentCount}</div>
          </div>
        </div>
      </div>

      <div className="notice__deadline">
        <div className="notice__time">
          <div className="notice__time-icon">
            {countdown < 3 ? (
              <ClockIcon className="comming" />
            ) : (
              <ClockIcon className="far" />
            )}
          </div>
          <div className="notice__time-content">{deadline}</div>
        </div>
        <div className="notice__show">
          {countdown < 3 ? (
            <ArrowRightIcon className="comming" />
          ) : (
            <ArrowRightIcon className="far" />
          )}
        </div>
      </div>
    </div>
  );
};

/*
convert milisecons to days
input: milisecons
output: days
*/
const miliseconsToDays = (t: number) => {
  let cd = 24 * 60 * 60 * 1000,
    ch = 60 * 60 * 1000,
    d = Math.floor(t / cd),
    h = Math.floor((t - d * cd) / ch),
    m = Math.round((t - d * cd - h * ch) / 60000);

  if (m === 60) {
    h++;
    m = 0;
  }
  if (h === 24) {
    d++;
    h = 0;
  }
  return d;
};

/*
format date: dd/mm/yyyy -> yyyy-mm-dd
*/
const formatDate = (date: string) => {
  const dateArr = date.split("/");
  dateArr.reverse();

  return dateArr.join("-");
};

export default Notice;
