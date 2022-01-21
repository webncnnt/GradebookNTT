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
import { toast } from "react-toastify";
import useHttp from "../../../../../hooks/useHttp";
import { useLocation } from "react-router";

type CardAssignmentProps = {
  gradeAssignment: GradeAssignmentModel;
  onGradeAssignmentDelete?: (id: number) => void;
} & HTMLAttributes<HTMLDivElement>;

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required").min(2, "Title must be at least 2 characters"),
  score: Yup.number().typeError("Score must be a number").required("Score is required").min(0, "Score cannot negative").max(10, "Max score is 10"),
});

export const CardGradeAssignment = ({ gradeAssignment, onGradeAssignmentDelete, className, ...rest }: CardAssignmentProps) => {
  const { sendRequest } = useHttp();
  const { pathname } = useLocation();
  const { id, score, title } = gradeAssignment;

  const clz = classNames(className, "card-grade-assignment");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

  const handleRemoveAssignment = () => {
    onGradeAssignmentDelete && onGradeAssignmentDelete(id);
  };

  const handleGradeAssignmentUpdateSubmit = (data: any) => {
    const requestConfig = {
      url: "classes/" + pathname.split("/")[2] + "/gradeStructures/" + id,
      method: "PATCH",
      body: {
        score: data.score,
        title: data.title,
      },
    };

    const handleError = (err: any) => {
      toast("Cannot update this grade assignment", { type: "error" });
    };

    const getGradeAssignment = (_: any) => {
      toast("Update grade assignment successfully", { type: "success" });
    };

    sendRequest(requestConfig, handleError, getGradeAssignment);
  };

  return (
    <div className={clz} {...rest}>
      <form onSubmit={handleSubmit(handleGradeAssignmentUpdateSubmit)} className="card-grade-assignment__content">
        <div className="card-grade-assignment__input">
          <InputText
            {...register("title")}
            validStatus={errors.title !== undefined ? "invalid" : undefined}
            errorText={errors.title?.message}
            placeholder="Grade Name"
            id="gradeName"
            defaultValue={title}
            className="mb2"
          />
          <InputText
            validStatus={errors.score !== undefined ? "invalid" : undefined}
            errorText={errors.score?.message}
            {...register("score")}
            defaultValue={score}
            placeholder="Grade Score"
            id="gradeScore"
          />
        </div>

        <div className="card-grade-assignment__action">
          <button className="card-grade-assignment__action card-grade-assignment__action--save" type="submit">
            <UpdateIcon className="icon--white" />
          </button>
          <button type="button" className="card-grade-assignment__action card-grade-assignment__action--remove" onClick={handleRemoveAssignment}>
            <RemoveIcon className="icon--white" />
          </button>
        </div>
      </form>
    </div>
  );
};
