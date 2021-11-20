import ArrowRightIcon from "../../../../components/icons/ArrowRight";
import AssignmentIcon from "../../../../components/icons/Assignment";
import ClockIcon from "../../../../components/icons/Clock";
import CommentIcon from "../../../../components/icons/Comment";
import DocumentIcon from "../../../../components/icons/Document";
import VideoIcon from "../../../../components/icons/Video";

type classworkItemProps = {
  title: string;
  commentCount: number;
  deadline: string; // dd/mm/yyyy
  type: string; //video, document,assignment
  onClick?: () => void;
};

const ClassworkItem = ({
  title,
  commentCount,
  deadline,
  type,
  onClick,
}: classworkItemProps) => {
  let classworkItemIcon: JSX.Element;

  let countdown: number; // deadline countdown = deadline - now

  const now: any = new Date(); //"now"
  countdown = miliseconsToDays(Date.parse(formatDate(deadline)) - now);

  if (type === "video") {
    if (countdown > 0) {
      if (countdown > 3) {
        classworkItemIcon = <VideoIcon className="far" />;
      } else {
        classworkItemIcon = <VideoIcon className="coming" />;
      }
    } else {
      classworkItemIcon = <VideoIcon className="passed" />;
    }
  } else if (type === "document") {
    if (countdown > 0) {
      if (countdown > 3) {
        classworkItemIcon = <DocumentIcon className="far" />;
      } else {
        classworkItemIcon = <DocumentIcon className="coming" />;
      }
    } else {
      classworkItemIcon = <DocumentIcon className="passed" />;
    }
  } else {
    if (countdown > 0) {
      if (countdown > 3) {
        classworkItemIcon = <AssignmentIcon className="far" />;
      } else {
        classworkItemIcon = <AssignmentIcon className="coming" />;
      }
    } else {
      console.log("assignment", countdown);
      classworkItemIcon = <AssignmentIcon className="passed" />;
    }
  }

  return (
    <div
      className={
        "classwork-item" +
        (countdown > 0
          ? countdown <= 3
            ? " classwork-item--coming"
            : " classwork-item--far"
          : " classwork-item--passed")
      }
    >
      <div className="classwork-item__header">
        <div
          className={
            "classwork-item__icon" +
            (countdown > 0
              ? countdown <= 3
                ? " classwork-item__icon--coming"
                : " classwork-item__icon--far"
              : " classwork-item__icon--passed")
          }
        >
          {classworkItemIcon}
        </div>
        <div className="classwork-item__title-comment">
          <h2 className="classwork-item__title">{title}</h2>
          <div className="classwork-item__comment">
            <div className="classwork-item__comment-icon">
              {countdown > 0 ? (
                countdown <= 3 ? (
                  <CommentIcon className="coming" />
                ) : (
                  <CommentIcon className="far" />
                )
              ) : (
                <CommentIcon className="passed" />
              )}
            </div>
            <div className="classwork-item__comment-count">{commentCount}</div>
          </div>
        </div>
      </div>

      <div className="classwork-item__deadline">
        <div className="classwork-item__time">
          <div className="classwork-item__time-icon">
            {countdown > 0 ? (
              countdown <= 3 ? (
                <ClockIcon className="coming" />
              ) : (
                <ClockIcon className="far" />
              )
            ) : (
              <ClockIcon className="passed" />
            )}
          </div>
          <div className="classwork-item__time-content">{deadline}</div>
        </div>
        <div className="classwork-item__show">
          {countdown > 0 ? (
            countdown <= 3 ? (
              <ArrowRightIcon className="coming" />
            ) : (
              <ArrowRightIcon className="far" />
            )
          ) : (
            <ArrowRightIcon className="passed" />
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

export default ClassworkItem;
