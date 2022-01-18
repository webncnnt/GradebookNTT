import classNames from "classnames";
import { HTMLAttributes, useState } from "react";
import { CreateGradeAssignmentFormValues } from "../../../../../@types/formInputs/CreateGradeAssignmentFormValues";
import Add from "../../../../icons/Add";
import InputText from "../../../input/input-text/InputText";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type CardCreateAssignmentProps = {
  assignLength: number;
  onCreateClick: (gradeAssignment: CreateGradeAssignmentFormValues) => void;
} & HTMLAttributes<HTMLDivElement>;

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required").min(2, "Title must be at least 2 characters"),
  score: Yup.number()
    .typeError("Score must be a number")
    .required("Score is required")
    .min(0.01, "Score must be larger than 0")
    .max(10, "Max score is 10"),
});

export const CardCreateGradeAssignment = ({ onCreateClick, assignLength, className, ...rest }: CardCreateAssignmentProps) => {
  const [gradeName, setGradeName] = useState<string>("");
  const [gradeScore, setGradeScore] = useState<string>("");
  const clz = classNames(className, "card-create-grade-assignment");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

  const handleCreateSubmit = ({ title, score }: any) => {
    const data: CreateGradeAssignmentFormValues = { title, score, pos: assignLength + 1 };
    onCreateClick(data);
    setGradeName("");
    setGradeScore("");
  };

  return (
    <div className={clz} {...rest}>
      <form onSubmit={handleSubmit(handleCreateSubmit)} className="card-create-grade-assignment">
        <div className="card-create-grade-assignment__content">
          <InputText
            {...register("title")}
            placeholder="Grade Name"
            validStatus={errors.title !== undefined ? "invalid" : undefined}
            errorText={errors.title?.message}
            id="gradeName"
            className="mb2"
            value={gradeName}
            onChange={(e) => setGradeName(e.target.value)}
          />
          <InputText
            {...register("score")}
            validStatus={errors.score !== undefined ? "invalid" : undefined}
            errorText={errors.score?.message}
            placeholder="Grade Score"
            id="gradeScore"
            value={gradeScore}
            onChange={(e) => setGradeScore(e.target.value)}
          />
        </div>

        <div className="card-create-grade-assignment__action">
          <button type="submit">
            <Add className="icon--white" />
          </button>
        </div>
      </form>
    </div>
  );
};
