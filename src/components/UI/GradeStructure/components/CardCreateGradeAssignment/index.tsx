import classNames from "classnames";
import { HTMLAttributes } from "react";
import { CreateGradeAssignmentFormValues } from "../../../../../@types/formInputs/CreateGradeAssignmentFormValues";
import Add from "../../../../icons/Add";
import InputText from "../../../input/input-text/InputText";
import "./index.scss";

type CardCreateAssignmentProps = {
  onCreateClick: (gradeAssignment: CreateGradeAssignmentFormValues) => void;
} & HTMLAttributes<HTMLDivElement>;

export const CardCreateGradeAssignment = ({
  onCreateClick,
  className,
  ...rest
}: CardCreateAssignmentProps) => {
  const clz = classNames(className, "card-create-grade-assignment");

  return (
    <div className={clz} {...rest}>
      <div className="card-create-grade-assignment__content">
        <InputText placeholder="Grade Name" id="gradeName" />
        <InputText placeholder="Grade Score" id="gradeScore" />
      </div>

      <div className="card-create-grade-assignment__action">
        <button>
          <Add />
        </button>
      </div>
    </div>
  );
};
