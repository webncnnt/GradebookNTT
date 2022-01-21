import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import { CreateGradeAssignmentFormValues } from "../../../@types/formInputs/CreateGradeAssignmentFormValues";
import { UpdateGradeAssignmentFormValues } from "../../../@types/formInputs/UpdateGradeAssignmentFormsValues";
import { GradeAssignmentModel } from "../../../@types/models/GradeAssignmentModel";
import { TeacherModel } from "../../../@types/models/TeacherModel";
import useHttp from "../../../hooks/useHttp";
import { CardCreateGradeAssignment } from "./components/CardCreateGradeAssignment";
import { GradeStructureEdit } from "./components/GradeStructureEdit";
import { GradeStructureOverview } from "./components/GradeStructureOverview";

import "./index.scss";

type GradeStructureProps = {};
const pathname = window.location.pathname;

export const GradeStructure = (props: GradeStructureProps) => {
  const [gradeAssignments, setGradeAssignments] = useState<GradeAssignmentModel[]>([]);
  const [isChangeAssignment, setIsChangeAssignment] = useState<number>(0);
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const { sendRequest } = useHttp();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const requestConfig = {
      url: "classes/" + pathname.split("/")[2] + "/gradeStructures",
    };

    const handleError = () => {};

    const getGradeAssignments = (data: any) => {
      const gradeAssignmentsFormat = data.data.gradeStructure.gradeAssignments
        .map((item: GradeAssignmentModel) => {
          return {
            id: item.id,
            title: item.title,
            pos: item.pos,
            score: item.score,
          };
        })
        .sort((a: GradeAssignmentModel, b: GradeAssignmentModel) => a.pos - b.pos);

      setGradeAssignments(gradeAssignmentsFormat);
    };

    sendRequest(requestConfig, handleError, getGradeAssignments);
  }, [isChangeAssignment, sendRequest]);

  //get teacher
  useEffect(() => {
    const requestConfig = {
      url: "classes/" + pathname.split("/")[2] + "/teachers",
    };
    const handleError = () => {};

    const getTeachers = (data: any) => {
      const memberInfoFormat: TeacherModel[] = data.data.teachers.map((member: any) => {
        return {
          id: member.profile.id,
          fullName: member.profile.fullName,
          avatar: member.profile.avatar,
          email: member.profile.email,
          joinDate: member.joinDate,
        };
      });
      if (memberInfoFormat.findIndex((teacher) => teacher.id === parseInt(userId ? userId : "")) >= 0) {
        setIsTeacher(true);
      }
    };
    sendRequest(requestConfig, handleError, getTeachers);
  }, [sendRequest, userId]);

  const calculateNewPos = (gradeAssignments: GradeAssignmentModel[], destinationIndex: number) => {
    let newPos = 0;

    if (destinationIndex === 0) {
      newPos = gradeAssignments[0].pos / 2;
    }

    if (destinationIndex === gradeAssignments.length - 1) {
      newPos = gradeAssignments[gradeAssignments.length - 1].pos + 65535;
    }

    if (destinationIndex > 0 && destinationIndex < gradeAssignments.length - 1) {
      newPos = (gradeAssignments[destinationIndex - 1].pos + gradeAssignments[destinationIndex].pos) / 2;
    }

    return newPos;
  };

  const onCreateAssignmentClick = (gradeAssignment: CreateGradeAssignmentFormValues) => {
    const pos = gradeAssignments.length * 65535 + 65535;
    const newAssignment = { ...gradeAssignment, pos };

    const requestConfig = {
      url: "classes/" + pathname.split("/")[2] + "/gradeStructures",
      method: "POST",
      body: newAssignment,
    };

    const handleError = () => {
      toast("fdgfjkfg create error", { type: "error" });
    };

    const getGradeAssignments = (data: any) => {
      const newGradeAssignment = data.data.gradeAssignment as GradeAssignmentModel;
      setGradeAssignments((prev) => [...prev, newGradeAssignment]);
    };

    sendRequest(requestConfig, handleError, getGradeAssignments);

    setIsChangeAssignment(isChangeAssignment + 1);
  };

  const onAssignmentDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const gradeAssignmentsClone = Array.from(gradeAssignments);

    const newPos = calculateNewPos(gradeAssignments, result.destination.index);
    const [removed] = gradeAssignmentsClone.splice(result.source.index, 1);
    removed.pos = newPos;

    gradeAssignmentsClone.splice(result.destination!.index, 0, removed);

    setGradeAssignments(gradeAssignmentsClone);

    const requestConfig = {
      url: "classes/" + pathname.split("/")[2] + "/gradeStructures/" + removed.id,
      method: "PATCH",
      body: {
        score: removed.score,
        title: removed.title,
        pos: newPos,
      },
    };

    const handleError = () => {
      toast("Cannot update grade assignment", { type: "error" });
    };

    const handleSuccess = (data: any) => {};

    sendRequest(requestConfig, handleError, handleSuccess);
  };

  const handleGradeAssignmentDelete = (id: number) => {
    const requestConfig = {
      url: "classes/" + pathname.split("/")[2] + "/gradeStructures/" + id,
      method: "DELETE",
    };

    const handleError = (err: any) => {
      toast("Cannot delete selected grade assignments", { type: "error" });
    };

    const handleSuccess = (_: any) => {
      setGradeAssignments((gradeAssignments) => gradeAssignments.filter((item) => item.id !== id));
    };

    sendRequest(requestConfig, handleError, handleSuccess);
  };

  return (
    <div className="grade-structure">
      <GradeStructureOverview className="grade-structure__overview" gradeAssignments={gradeAssignments} />
      {isTeacher ? (
        <>
          <GradeStructureEdit
            onGradeAssignmentDelete={handleGradeAssignmentDelete}
            className="grade-structure__edit"
            gradeAssignments={gradeAssignments}
            onAssignmentDragEnd={onAssignmentDragEnd}
          />

          <CardCreateGradeAssignment
            className="grade-structure__create"
            onCreateClick={onCreateAssignmentClick}
            assignLength={gradeAssignments.length}
          />
        </>
      ) : null}
    </div>
  );
};
