import { DataGrid, GridEnrichedColDef, GridEventListener, GridEvents } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import CSVReader from 'react-csv-reader';
import { GradeAssignmentModel } from '../../../@types/models/GradeAssignmentModel';
import { StudentGradeModel } from '../../../@types/models/StudentGradeModel';
import { StudentModel } from '../../../@types/models/StudentModel';
import UploadIcon from '../../../components/icons/Upload';
import useHttp from '../../../hooks/useHttp';
import DownloadIcon from '../../icons/Download';
import './index.scss';
import * as mock from './mock';
import { scores_headers } from './scores-header';
import { template_score } from './template';

const rows = [
  { id: 1, studentId: '1232', '1': 2, '2': 1 },
  { id: 2, studentId: '123', '1': 2, '2': 1 },
  { id: 3, studentId: '143', '1': 1, '2': 0.5 },
  { id: 4, studentId: '090', '1': 1.25, '2': 0.25 },
  { id: 5, studentId: '456', '1': 1, '2': 1 },
];

const columnsDefinition = (assignments: GradeAssignmentModel[]) => {
  const gridCols: GridEnrichedColDef[] = assignments.map((assignment) => ({
    field: assignment.id.toString(),
    headerName: assignment.title,
    width: 200,
    editable: true,
    align: 'left',
    renderCell: (params) => {
      return <div>{params.value}</div>;
    },
    // TODO: render cell with button menu
    // renderEditCell: (params) => {
    //   return <input value={params.value?.toString()} />;
    // },
  }));

  gridCols.unshift({
    field: 'studentId',
    headerName: 'Sinh Vien',
    width: 200,
    editable: true,
    align: 'left',
  });

  return gridCols;
};

const renderRows = (students: StudentModel[], assignments: GradeAssignmentModel[], studentGrades: StudentGradeModel[]) => {
  students.map((student) => {
    const base = { id: student.id, studentName: student.fullName };
    const scores = assignments.map((assignment) => {
      const studentGrade = studentGrades.find((grade) => grade.gradeAssignmentId === assignment.id);
      const score = studentGrade == undefined ? null : studentGrade.score;
      return { [assignment.id]: score };
    });
    return { ...base, ...scores };
  });
};

const handleCellEditCommit: GridEventListener<GridEvents.cellEditCommit> = (e) => {
  console.log(e);
};

const Scores = () => {
  const [assignments, setAssignments] = useState<GradeAssignmentModel[]>([]);
  const [students, setStudents] = useState<StudentModel[]>([]);
  const [gradeStudents, setGradeStudents] = useState<StudentGradeModel[]>([]);

  const { sendRequest } = useHttp();

  useEffect(() => {
    // TODO: fetch
    const requestConfig = {
      url: '',
    };
    const handleError = () => {};

    const handleSuccess = (data: any) => {};
    sendRequest(requestConfig, handleError, handleSuccess);

    setAssignments(mock.assignments);
  }, [sendRequest]);

  useEffect(() => {
    // TODO: fetch students
    const requestConfig = {
      url: '',
    };
    const handleError = () => {};

    const handleSuccess = (data: any) => {};
    sendRequest(requestConfig, handleError, handleSuccess);

    setAssignments(mock.assignments);
  }, [sendRequest]);

  useEffect(() => {
    // TODO: fetch grades
    const requestConfig = {
      url: '',
    };
    const handleError = () => {};

    const handleSuccess = (data: any) => {};
    sendRequest(requestConfig, handleError, handleSuccess);

    setAssignments(mock.assignments);
  }, [sendRequest]);

  const dataGridCols = columnsDefinition(assignments);
  const dataGridRows = renderRows(students, assignments, gradeStudents);

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  };

  const handleForce = (data: any, fileInfo: any) => {
    if (data[0]['Tên sinh viên']) {
      const newListStudents = data.map((student: any) => {
        return {
          studentName: student['Tên sinh viên'],
          studentId: student['MSSV'].toString(),
        };
      });

      const requestConfig = {
        url: '',
        method: 'POST',
        body: {},
      };
      const handleError = () => {};

      const uploadStudents = (data: any) => {};

      sendRequest(requestConfig, handleError, uploadStudents);
    } else {
      console.log('Wrong header');
    }
  };

  return (
    <>
      <div className='scores'>
        <div className='scores__header'>
          <h1>Quản lý điểm số</h1>

          <div className='scores__actions'>
            <button className='scores__button btn btn--primary'>
              <CSVLink data={template_score} filename={'list-students.csv'} headers={scores_headers}>
                <span>Tải template</span>
                <DownloadIcon className='icon--white' />
              </CSVLink>
            </button>

            <button className='scores__button btn btn--primary'>
              <CSVLink data={template_score} filename={'list-students.csv'} headers={scores_headers}>
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
            rows={rows}
            columns={dataGridCols}
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
