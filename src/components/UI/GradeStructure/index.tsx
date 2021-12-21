import { useEffect, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { CreateGradeAssignmentFormValues } from '../../../@types/formInputs/CreateGradeAssignmentFormValues';
import { UpdateGradeAssignmentFormValues } from '../../../@types/formInputs/UpdateGradeAssignmentFormsValues';
import { GradeAssignmentModel } from '../../../@types/models/GradeAssignmentModel';
import { TeacherModel } from '../../../@types/models/TeacherModel';
import useHttp from '../../../hooks/useHttp';
import { CardCreateGradeAssignment } from './components/CardCreateGradeAssignment';
import { GradeStructureEdit } from './components/GradeStructureEdit';
import { GradeStructureOverview } from './components/GradeStructureOverview';
import './index.scss';

type GradeStructureProps = {};

export const GradeStructure = (props: GradeStructureProps) => {
  const [gradeAssignments, setGradeAssignments] = useState<GradeAssignmentModel[]>([]);
  const [isChangeAssignment, setIsChangeAssignment] = useState<boolean>(false);
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const { sendRequest } = useHttp();

  const userId = localStorage.getItem('userId');

  const pathname = window.location.pathname;

  useEffect(() => {
    const requestConfig = {
      url: 'classes/' + pathname.split('/')[2] + '/gradeStructures',
    };

    const handleError = () => {};

    const getGradeAssignments = (data: any) => {
      const gradeAssignmentsFormat = data.data.gradeStructure.gradeAssignments.map((item: GradeAssignmentModel) => {
        return {
          id: item.id,
          title: item.title,
          pos: item.pos,
          score: item.score,
        };
      });

      setGradeAssignments(gradeAssignmentsFormat);
    };

    sendRequest(requestConfig, handleError, getGradeAssignments);

    setIsChangeAssignment(false);
  }, [pathname, isChangeAssignment, sendRequest]);

  //get teacher
  useEffect(() => {
    const requestConfig = {
      url: 'classes/' + pathname.split('/')[2] + '/teachers',
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
      if (memberInfoFormat.findIndex((teacher) => teacher.id === parseInt(userId ? userId : '')) >= 0) {
        setIsTeacher(true);
      }
    };
    sendRequest(requestConfig, handleError, getTeachers);
  }, [pathname, sendRequest, userId]);

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
    const pos = gradeAssignments.length * 65535;
    const newAssignment = { ...gradeAssignment, pos };

    const requestConfig = {
      url: 'classes/' + pathname.split('/')[2] + '/gradeStructures',
      method: 'POST',
      body: newAssignment,
    };

    const handleError = () => {};

    const getGradeAssignments = (data: any) => {
      const gradeAssignmentsFormat = data.data.gradeStructure.gradeAssignments.map((item: GradeAssignmentModel) => {
        return {
          id: item.id,
          title: item.title,
          pos: item.pos,
          score: item.score,
        };
      });

      setGradeAssignments(gradeAssignmentsFormat);
    };

    sendRequest(requestConfig, handleError, getGradeAssignments);

    setIsChangeAssignment(true);
  };

  const onAssignmentChange = (gradeAssignments: UpdateGradeAssignmentFormValues) => {
    const requestConfig = {
      url: 'classes/' + pathname.split('/')[2] + '/gradeStructures/' + gradeAssignments.id,
      method: 'PATCH',
      body: {
        score: gradeAssignments.score,
        title: gradeAssignments.title,
      },
    };

    const handleError = () => {};

    const getGradeAssignments = (data: any) => {
      setIsChangeAssignment(true);
    };

    sendRequest(requestConfig, handleError, getGradeAssignments);
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

    const requestConfig = {
      url: 'classes/' + pathname.split('/')[2] + '/gradeStructures/' + removed.id,
      method: 'PATCH',
      body: {
        score: removed.score,
        title: removed.title,
        pos: newPos,
      },
    };

    const handleError = () => {};

    const getGradeAssignments = (data: any) => {
      console.log(data);

      setIsChangeAssignment(true);
    };

    sendRequest(requestConfig, handleError, getGradeAssignments);
  };

  const onRemoveAssignment = (assignmentID: number) => {
    const requestConfig = {
      url: 'classes/' + pathname.split('/')[2] + '/gradeStructures/' + assignmentID,
      method: 'DELETE',
    };

    const handleError = () => {};

    const getGradeAssignments = (data: any) => {
      setIsChangeAssignment(true);
    };

    sendRequest(requestConfig, handleError, getGradeAssignments);
  };

  return (
    <div className='grade-structure'>
      <GradeStructureOverview className='grade-structure__overview' gradeAssignments={gradeAssignments} />
      {isTeacher ? (
        <>
          <GradeStructureEdit
            className='grade-structure__edit'
            gradeAssignments={gradeAssignments}
            onAssignmentDragEnd={onAssignmentDragEnd}
            onAssignmentChange={onAssignmentChange}
            onRemoveAssignment={onRemoveAssignment}
          />

          <CardCreateGradeAssignment
            className='grade-structure__create'
            onCreateClick={onCreateAssignmentClick}
            assignLength={gradeAssignments.length}
          />
        </>
      ) : null}
    </div>
  );
};
