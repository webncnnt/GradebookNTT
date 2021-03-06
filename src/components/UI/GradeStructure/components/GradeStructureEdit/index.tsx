import classNames from "classnames";
import { HTMLAttributes } from "react";
import { DragDropContext, Draggable, Droppable, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { CardGradeAssignment } from "../CardGradeAssignment";
import { GradeAssignmentModel } from "../../../../../@types/models/GradeAssignmentModel";
import "./index.scss";

type GradeStructureEditProps = {
  gradeAssignments: GradeAssignmentModel[];
  onAssignmentDragEnd: (result: DropResult, provided: ResponderProvided) => void;
  onGradeAssignmentDelete?: (id: number) => void;
} & HTMLAttributes<HTMLDivElement>;

export const GradeStructureEdit = ({
  className,
  gradeAssignments,
  onAssignmentDragEnd,
  onGradeAssignmentDelete,
  ...rest
}: GradeStructureEditProps) => {
  const clz = classNames(className, "grade-structure-edit");

  return (
    <div className={clz} {...rest}>
      <DragDropContext onDragEnd={onAssignmentDragEnd}>
        <Droppable droppableId="gradeStructure">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {gradeAssignments.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="grade-structure-edit__assignment"
                      >
                        <CardGradeAssignment onGradeAssignmentDelete={onGradeAssignmentDelete} gradeAssignment={item} />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
