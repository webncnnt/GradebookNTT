import classNames from "classnames";
import { HTMLAttributes } from "react";
import { GradeAssignmentModel } from "../../../../../@types/models/GradeAssignmentModel";
import { CardGradeAssignmentOverview } from "../CardGradeAssignmentOverview";
import "./index.scss";

type GradeStructureOverviewProps = {
  gradeAssignments: GradeAssignmentModel[];
} & HTMLAttributes<HTMLDivElement>;

export const GradeStructureOverview = ({ gradeAssignments, className, ...rest }: GradeStructureOverviewProps) => {
  const clz = classNames(className, "grade-structure-overview");

  const gradeStructureCardOverviews = gradeAssignments.map((ga) => (
    <CardGradeAssignmentOverview className="grade-structure-overview__card" gradeAssignment={ga} key={ga.id} />
  ));

  return (
    <div className={clz} {...rest}>
      {gradeStructureCardOverviews}
    </div>
  );
};
