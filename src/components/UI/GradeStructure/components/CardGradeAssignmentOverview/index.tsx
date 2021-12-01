import { HTMLAttributes } from "react";
import classNames from "classnames";
import { GradeAssignmentModel } from "../../../../../@types/models/GradeAssignmentModel";

type CardGradeAssignmentOverviewProps = {
  gradeAssignment: GradeAssignmentModel;
} & HTMLAttributes<HTMLDivElement>;

export const CardGradeAssignmentOverview = ({
  gradeAssignment,
  className,
  ...rest
}: CardGradeAssignmentOverviewProps) => {
  const { score, title } = gradeAssignment;

  const clzName = classNames(className, "card-grade-assignment-overview");

  return (
    <div className={clzName} {...rest}>
      <div className="card-grade-assignment-overview__title">{title}</div>
      <div className="card-grade-assignment-overview__score">{score}</div>
    </div>
  );
};
