import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { CreateGradeAssignmentFormValues } from "../../../@types/formInputs/CreateGradeAssignmentFormValues";
import { UpdateGradeAssignmentFormValues } from "../../../@types/formInputs/UpdateGradeAssignmentFormsValues";
import { GradeAssignmentModel } from "../../../@types/models/GradeAssignmentModel";
import { CardCreateGradeAssignment } from "./components/CardCreateGradeAssignment";
import { GradeStructureEdit } from "./components/GradeStructureEdit";
import { GradeStructureOverview } from "./components/GradeStructureOverview";
import "./index.scss";

type GradeStructureProps = {};

export const GradeStructure = ({}: GradeStructureProps) => {
  const [gradeAssignments, setGradeAssignments] = useState(() => {
    const gradeAssignments: GradeAssignmentModel[] = [
      { id: 1, title: "Giua ky", pos: 65536, score: 2 },
      { id: 2, title: "Cuoi ky", pos: 131072, score: 2 },
      { id: 3, title: "BTCN", pos: 196608, score: 2 },
    ];

    return gradeAssignments;
  });

  const calculateNewPos = (
    gradeAssignments: GradeAssignmentModel[],
    destinationIndex: number
  ) => {
    let newPos = 0;
    if (destinationIndex === 0) {
      newPos = gradeAssignments[0].pos / 2;
    }

    if (destinationIndex === gradeAssignments.length - 1) {
      newPos = gradeAssignments[gradeAssignments.length - 1].pos + 65535;
    }

    if (
      destinationIndex > 0 &&
      destinationIndex < gradeAssignments.length - 1
    ) {
      newPos =
        (gradeAssignments[destinationIndex - 1].pos +
          gradeAssignments[destinationIndex + 1].pos) /
        2;
    }

    return newPos;
  };

  const onCreateAssignmentClick = (
    gradeAssignment: CreateGradeAssignmentFormValues
  ) => {
    const pos = gradeAssignments.length * 65535;
    const newAssignment = { ...gradeAssignment, pos };

    // send
  };

  const onAssignmentChange = (
    gradeAssignments: UpdateGradeAssignmentFormValues
  ) => {
    //send
  };

  const onAssignmentDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const gradeAssignmentsClone = Array.from(gradeAssignments);
    const [removed] = gradeAssignmentsClone.splice(result.source.index, 1);

    const newPos = calculateNewPos(gradeAssignments, result.destination.index);
    const updatedAssignment = { ...removed, pos: newPos };

    gradeAssignmentsClone.splice(
      result.destination.index,
      0,
      updatedAssignment
    );

    //send to server updated assignment

    setGradeAssignments(gradeAssignmentsClone);
  };

  return (
    <div className="grade-structure">
      <GradeStructureOverview
        className="grade-structure__overview"
        gradeAssignments={gradeAssignments}
      />

      <GradeStructureEdit
        className="grade-structure__edit"
        gradeAssignments={gradeAssignments}
        onAssignmentDragEnd={onAssignmentDragEnd}
        onAssignmentChange={onAssignmentChange}
      />

      <CardCreateGradeAssignment
        className="grade-structure__create"
        onCreateClick={onCreateAssignmentClick}
      />
    </div>
  );
};
