import classNames from "classnames";
import { HTMLAttributes, useState } from "react";
import { CreateGradeAssignmentFormValues } from "../../../../../@types/formInputs/CreateGradeAssignmentFormValues";
import Add from "../../../../icons/Add";
import InputText from "../../../input/input-text/InputText";

type CardCreateAssignmentProps = {
  assignLength: number;
  onCreateClick: (gradeAssignment: CreateGradeAssignmentFormValues) => void;
} & HTMLAttributes<HTMLDivElement>;

export const CardCreateGradeAssignment = ({
  onCreateClick,
  assignLength,
  className,
  ...rest
}: CardCreateAssignmentProps) => {
  const [gradeName, setGradeName] = useState<string>('');
  const [gradeScore, setGradeScore] = useState<string>('');
  const clz = classNames(className, "card-create-grade-assignment");

  const CreateAssignmentHandle = () => {
    const data:CreateGradeAssignmentFormValues = {"title": gradeName, "score": parseInt(gradeScore), "pos": assignLength + 1}
    if (gradeName.trim() !== "" && gradeScore.trim() !== ""){
      onCreateClick(data);
    }
    setGradeName("");
    setGradeScore("");
  }

  return (
    <div className={clz} {...rest}>
      <div className="card-create-grade-assignment__content">
        <InputText placeholder="Grade Name" id="gradeName" className="mb2" value={gradeName} onChange={(e) => setGradeName(e.target.value)}/>
        <InputText placeholder="Grade Score" id="gradeScore" value={gradeScore} onChange={(e) => setGradeScore(e.target.value)}/>
      </div>

      <div className="card-create-grade-assignment__action">
        <button onClick={CreateAssignmentHandle}>
          <Add className="icon--white" />
        </button>
      </div>
    </div>
  );
};
