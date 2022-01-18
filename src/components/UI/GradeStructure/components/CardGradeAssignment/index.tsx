import classNames from "classnames";
import { HTMLAttributes } from "react";
import { UpdateGradeAssignmentFormValues } from "../../../../../@types/formInputs/UpdateGradeAssignmentFormsValues";
import { GradeAssignmentModel } from "../../../../../@types/models/GradeAssignmentModel";
import { RemoveIcon } from "../../../../icons/Remove";
import InputText from "../../../input/input-text/InputText";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UpdateIcon from "../../../../icons/Update";

type CardAssignmentProps = {
  gradeAssignment: GradeAssignmentModel;
  onAssignmentChange: (gradeAssignment: UpdateGradeAssignmentFormValues) => void;
  onSubmitUpdateAssignment?: (gradeAssignment: UpdateGradeAssignmentFormValues) => void;
  onRemoveAssignment: (id: number) => void;
} & HTMLAttributes<HTMLDivElement>;

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required").min(2, "Title must be at least 2 characters"),
  score: Yup.number().typeError("Score must be a number").required("Score is required").min(0, "Score cannot negative").max(10, "Max score is 10"),
});

export const CardGradeAssignment = ({
  gradeAssignment,
  onAssignmentChange,
  onSubmitUpdateAssignment,
  onRemoveAssignment,
  className,
  ...rest
}: CardAssignmentProps) => {
  const { id, score, pos, title } = gradeAssignment;

  const clz = classNames(className, "card-grade-assignment");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

  const handleGradeScoreChange = (e: any) => {
    onAssignmentChange({ id, title, pos, score: e.target.value });
  };

  const handleGradeTitleChange = (e: any) => {
    onAssignmentChange({ id, title: e.target.value, pos, score });
  };

  const handleGradeAssignmentSubmit = (e: any) => {
    if (errors.title || errors.score) return;
    onSubmitUpdateAssignment && onSubmitUpdateAssignment({ id, title: e.title, pos, score: e.score });
  };

  const removeAssignmentHandle = () => {
    onRemoveAssignment(id);
  };

  return (
    <div className={clz} {...rest}>
      <form onSubmit={handleSubmit(handleGradeAssignmentSubmit)} className="card-grade-assignment__content">
        <div className="card-grade-assignment__input">
          <InputText
            {...register("title")}
            validStatus={errors.title !== undefined ? "invalid" : undefined}
            errorText={errors.title?.message}
            onChange={handleGradeTitleChange}
            placeholder="Grade Name"
            id="gradeName"
            value={title}
            className="mb2"
          />
          <InputText
            validStatus={errors.score !== undefined ? "invalid" : undefined}
            errorText={errors.score?.message}
            {...register("score")}
            onChange={handleGradeScoreChange}
            placeholder="Grade Score"
            id="gradeScore"
            value={`${score}`}
          />
        </div>

        <div className="card-grade-assignment__action">
          <button className="card-grade-assignment__action card-grade-assignment__action--save" type="submit">
            <UpdateIcon className="icon--white" />
          </button>
          <button className="card-grade-assignment__action card-grade-assignment__action--remove" onClick={removeAssignmentHandle}>
            <RemoveIcon className="icon--white" />
          </button>
        </div>
      </form>
    </div>
  );
};
