import { DataGrid, GridColDef, GridEnrichedColDef, GridEventListener, GridEvents } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import CSVReader from 'react-csv-reader';
import { GradeAssignmentModel } from '../../../@types/models/GradeAssignmentModel';
import { StudentGradeModel } from '../../../@types/models/StudentGradeModel';
import { StudentModel } from '../../../@types/models/StudentModel';
import UploadIcon from '../../../components/icons/Upload';
import useHttp from '../../../hooks/useHttp';
import { groupBy } from '../../../utils/array';
import DownloadIcon from '../../icons/Download';
import Download2Icon from '../../icons/Download2';
import './index.scss';

const renderRows = (students: StudentModel[], assignments: GradeAssignmentModel[], studentGrades: StudentGradeModel[]) => {
  const groupedStudentGrades = groupBy(studentGrades, (item) => item.studentId);

  const rows = students.map((student) => {
    const grades = groupedStudentGrades[student.studentId];

    const base = { id: student.id, 'Tên sinh viên': student.fullName, MSSV: student.studentId };

    if (grades) {
      const assignmentIdWithScores = grades.reduce((prev, curr) => {
        const currAssignment = assignments.filter((a) => a.id === curr.gradeAssignmentId);
        return { ...prev, [currAssignment[0].title]: curr.score };
      }, {});

      return { ...base, ...assignmentIdWithScores };
    }

    return base;
  });

  return rows;
};

const pathname = window.location.pathname;

const classId = pathname.split('/')[2];

const Scores = () => {
  const [assignments, setAssignments] = useState<GradeAssignmentModel[]>([]);
  const [students, setStudents] = useState<StudentModel[]>([]);
  const [gradeStudents, setGradeStudents] = useState<StudentGradeModel[]>([]);

  const { sendRequest } = useHttp();

  const handleCellEditCommit: GridEventListener<GridEvents.cellEditCommit> = (e) => {
    const foundStudents = students.filter((s) => s.id === e.id);
    const foundAssignments = assignments.filter((a) => a.title === e.field);
    const isUpdate = e.value ? true : false;

    if (foundStudents.length !== 1) return;
    if (foundAssignments.length !== 1) return;

    const student = foundStudents[0];
    const gradeAssignment = foundAssignments[0];

    const handleError = () => {
      setGradeStudents((prev) => [...prev]);
    };

    if (!e.value) {
      handleError();
      return;
    }

    const newScore = +e.value;

    if (newScore > gradeAssignment.score) {
      handleError();
      return;
    }

    if (newScore < 0) {
      handleError();
      return;
    }

    const requestConfig = {
      url: `grades/${classId}/${gradeAssignment.id}/${student.studentId}`,
      method: 'PATCH',
      body: {
        score: newScore,
      },
    };

    const handleSuccess = (data: any) => {
      const newGrade = data.data as StudentGradeModel;

      if (isUpdate) {
        setGradeStudents((prev) =>
          prev.map((row) =>
            row.studentId === newGrade.studentId && row.gradeAssignmentId === newGrade.gradeAssignmentId ? { ...row, ...newGrade } : row
          )
        );
      }

      if (!isUpdate) {
        const newGradeStudents = [...gradeStudents, newGrade];
        setGradeStudents(newGradeStudents);
      }
    };

    sendRequest(requestConfig, handleError, handleSuccess);
  };

  // Students
  useEffect(() => {
    const requestConfig = {
      url: `students/getStudentsByClassId/${classId}`,
    };

    const handleError = () => {};

    const handleSuccess = (data: any) => {
      setStudents(data);
    };

    sendRequest(requestConfig, handleError, handleSuccess);
  }, [sendRequest]);

  // Class assignments
  useEffect(() => {
    const requestConfig = {
      url: `classes/${classId}/gradeStructures`,
    };

    const handleError = () => {};

    const handleSuccess = (data: any) => {
      const gradeAssignmentsData: GradeAssignmentModel[] = data.data.gradeStructure.gradeAssignments.map((item: any) => {
        return {
          id: item.id,
          title: item.title,
          pos: item.pos,
          score: item.score,
        };
      });

      setAssignments(gradeAssignmentsData);
    };

    sendRequest(requestConfig, handleError, handleSuccess);
  }, [sendRequest]);

  // Class grades
  useEffect(() => {
    const requestConfig = {
      url: `grades/${classId}`,
    };

    const handleError = () => {};

    const handleSuccess = (data: any) => {
      console.log(data);

      setGradeStudents(data.data.grades);
    };

    sendRequest(requestConfig, handleError, handleSuccess);
  }, [sendRequest]);

  const renderRows = (students: StudentModel[], studentGrades: StudentGradeModel[]) => {
    const groupedStudentGrades = groupBy(studentGrades, (item) => item.studentId);

    const rows = students.map((student, index) => {
      const grades = groupedStudentGrades[student.studentId];

      const base = { id: index, 'Tên sinh viên': student.fullName, MSSV: student.studentId };

      if (grades) {
        const assignmentIdWithScores = grades.reduce(
          (prev, curr) => ({ ...prev, [assignments[assignments.findIndex((a) => a.id === curr.gradeAssignmentId)].title]: curr.score }),
          {}
        );

        return { ...base, ...assignmentIdWithScores };
      }

      return base;
    });

    return rows;
  };

  const dataGridRows = renderRows(students, gradeStudents);

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  };

  const handleForce = (data: any) => {
    if (data[0]['Tên sinh viên']) {
      const dataAssignmentStudents = data.map((student: any) => {
        return {
          ...{
            studentId: student['MSSV'].toString(),
            score: student[assignments[0].title],
            gradeAssignmentId: student[assignments[0].id],
          },
          ...{
            studentId: student['MSSV'].toString(),
            score: student[assignments[1].title],
            gradeAssignmentId: student[assignments[1].id],
          },
        };
      });

      const requestConfig = {
        url: `grades/${classId}`,
        method: 'POST',
        body: { grades: dataAssignmentStudents },
      };
      const handleError = () => {};

      const uploadStudents = (data: any) => {
        console.log(data);
      };

      sendRequest(requestConfig, handleError, uploadStudents);
    } else {
      console.log('Wrong header');
    }
  };

  const handleForceAssignment = (data: any, grade: GradeAssignmentModel) => {
    if (data[0]['Tên sinh viên']) {
      const dataAssignmentStudents = data.map((student: any) => {
        return {
          studentId: student['MSSV'].toString(),
          score: student[grade.title],
        };
      });

      const requestConfig = {
        url: `grades/${classId}/${grade.id}`,
        method: 'POST',
        body: { grades: dataAssignmentStudents },
      };
      const handleError = () => {};
      const uploadStudents = (data: any) => {};
      sendRequest(requestConfig, handleError, uploadStudents);
    } else {
      console.log('Wrong header');
    }
  };

  const assignment_columns: GridColDef[] = assignments.map((grade) => {
    const assignment_name = grade.title;

    const template_score = [{ studentName: 'Nguyễn Văn A', studentId: '1', [grade.title]: '1' }];

    const groupedStudentGrades = groupBy(gradeStudents, (item) => item.studentId);

    const assignment_score = dataGridRows.map((student) => {
      const grades = groupedStudentGrades[student.MSSV];
      return {
        studentName: student['Tên sinh viên'],
        studentId: student.MSSV,
        [assignment_name]: grades ?? '',
      };
    });

    const scores_headers = [
      { label: 'Tên sinh viên', key: 'studentName' },
      { label: 'MSSV', key: 'studentId' },
      { label: assignment_name, key: assignment_name },
    ];

    return {
      field: grade.title,
      width: 200,
      editable: true,
      renderHeader: (headerParams: any) => {
        return (
          <>
            {headerParams.field}
            <CSVLink data={template_score} filename={`${grade.title}.csv`} headers={scores_headers}>
              <Download2Icon className='icon--csv ml1' />
            </CSVLink>

            <CSVLink data={assignment_score} filename={`${grade.title}.csv`} headers={scores_headers}>
              <DownloadIcon className='icon--csv ml1' />
            </CSVLink>

            <CSVReader
              cssClass='csv-reader-input'
              label={<UploadIcon className='icon--csv ml1' />}
              onFileLoaded={(data) => handleForceAssignment(data, grade)}
              parserOptions={papaparseOptions}
              inputId={'assignment' + grade.id}
              inputName={'assignment' + grade.id}
            />
          </>
        );
      },
    };
  });

  const grades_headers_assignment = assignments.map((grades) => {
    return {
      label: grades.title,
      key: grades.title,
    };
  });

  const scores_headers = [
    { label: 'Tên sinh viên', key: 'studentName' },
    { label: 'MSSV', key: 'studentId' },
  ].concat(grades_headers_assignment);

  const grades_columns = assignments.map((grades) => {
    return {
      [grades.title]: '1',
    };
  });

  let grades_columns_template = {};

  for (let i of grades_columns) {
    grades_columns_template = { ...grades_columns_template, ...i };
  }

  grades_columns_template = {
    ...{
      studentName: 'Nguyễn Văn A',
      studentId: '1',
    },
    ...grades_columns_template,
  };

  const grades_board_data = dataGridRows.map((student) => {
    return {
      studentName: student['Tên sinh viên'],
      studentId: student.MSSV,
      ...student,
    };
  });

  const columns: GridColDef[] = [
    {
      field: 'Tên sinh viên',
      width: 300,
      editable: false,
      renderHeader: (headerParams: any) => {
        return <>{headerParams.field}</>;
      },
    },
    {
      field: 'MSSV',
      width: 120,
      editable: false,
      renderHeader: (headerParams: any) => {
        return <>{headerParams.field}</>;
      },
    },
    ...assignment_columns,
    {
      field: 'Tổng kết',
      width: 200,
      editable: false,
      renderHeader: (headerParams: any) => {
        return <>{headerParams.field}</>;
      },
    },
  ];

  return (
    <>
      <div className='scores'>
        <div className='scores__header'>
          <h1>Quản lý điểm số</h1>

          <div className='scores__actions'>
            <button className='scores__button btn btn--primary'>
              <CSVLink data={[grades_columns_template]} filename={'template-grades.csv'} headers={scores_headers}>
                <span>Tải template</span>
                <Download2Icon className='icon--white' />
              </CSVLink>
            </button>

            <button className='scores__button btn btn--primary'>
              <CSVLink data={grades_board_data} filename={'class-grades.csv'} headers={scores_headers}>
                <span>Tải bảng điểm</span>
                <DownloadIcon className='icon--white' />
              </CSVLink>
            </button>

            <CSVReader
              cssClass='csv-reader-input'
              label={
                <div className='scores__button btn btn--primary'>
                  <span>Cập nhật bảng điểm</span>
                  <UploadIcon className='icon--white' />
                </div>
              }
              onFileLoaded={handleForce}
              parserOptions={papaparseOptions}
              inputId='gradesBoard'
              inputName='gradesBoard'
            />
          </div>
        </div>

        <div className='scores__datagrid'>
          <DataGrid
            onCellEditCommit={handleCellEditCommit}
            sx={{
              fontSize: '2rem',
              '& .MuiDataGrid-editInputCell': {
                fontSize: '2rem',
              },
              '.MuiDataGrid-cell': {
                border: '1px solid gray',
                borderLeft: 0,
                borderTop: 0,
              },
            }}
            autoHeight={true}
            rows={dataGridRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
      </div>
    </>
  );
};

export default Scores;
