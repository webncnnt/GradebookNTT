import classNames from "classnames";
import { HTMLAttributes } from "react";
import { UpdateGradeAssignmentFormValues } from "../../../../../@types/formInputs/UpdateGradeAssignmentFormsValues";
import { GradeAssignmentModel } from "../../../../../@types/models/GradeAssignmentModel";
import { RemoveIcon } from "../../../../icons/Remove";
import InputText from "../../../input/input-text/InputText";

type CardAssignmentProps = {
  gradeAssignment: GradeAssignmentModel;
  onAssignmentChange: (
    gradeAssignment: UpdateGradeAssignmentFormValues
  ) => void;
  onRemoveAssignment: (id: number) => void;
} & HTMLAttributes<HTMLDivElement>;

export const CardGradeAssignment = ({
  gradeAssignment,
  onAssignmentChange,
  onRemoveAssignment,
  className,
  ...rest
}: CardAssignmentProps) => {
  const { id, score, title } = gradeAssignment;

  const clz = classNames(className, "card-grade-assignment");

  const removeAssignmentHandle = () => {
    onRemoveAssignment(id);
  }

  return (
    <div className={clz} {...rest}>
      <div className="card-grade-assignment__content">
        <InputText
          placeholder="Grade Name"
          id="gradeName"
          value={title}
          className="mb2"
          onChange={(e) => {
            const newName = e.target.value;

            onAssignmentChange({
              id,
              title: newName,
              score: score
            });
          }}
        />

        <InputText
          placeholder="Grade Score"
          id="gradeScore"
          value={`${score}`}
          onChange={(e) => {
            const newScore = +e.target.value;

            onAssignmentChange({
              id,
              title: title,
              score: newScore,
            });
          }}
        />
      </div>

      <div className="card-grade-assignment__action">
        <button onClick={removeAssignmentHandle}>
          <RemoveIcon className="icon--white"/>
        </button>
      </div>
    </div>
  );
};
