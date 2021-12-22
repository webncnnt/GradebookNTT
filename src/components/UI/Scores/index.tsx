import { DataGrid, GridEnrichedColDef, GridEventListener, GridEvents } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { GradeAssignmentModel } from "../../../@types/models/GradeAssignmentModel";
import { StudentGradeModel } from "../../../@types/models/StudentGradeModel";
import { StudentModel } from "../../../@types/models/StudentModel";
import UploadIcon from "../../../components/icons/Upload";
import Container from "../../../components/layouts/container/Container";
import useHttp from "../../../hooks/useHttp";
import { groupBy } from "../../../utils/array";
import "./index.scss";
import * as mock from "./mock";

const rows = [
  { id: 1, studentId: "1232", "1": 2, "2": 1 },
  { id: 2, studentId: "123", "1": 2, "2": 1 },
  { id: 3, studentId: "143", "1": 1, "2": 0.5 },
  { id: 4, studentId: "090", "1": 1.25, "2": 0.25 },
  { id: 5, studentId: "456", "1": 1, "2": 1 },
];

const columnsDefinition = (assignments: GradeAssignmentModel[]) => {
  const gridCols: GridEnrichedColDef[] = assignments.map((assignment) => ({
    field: assignment.id.toString(),
    headerName: assignment.title,
    width: 200,
    editable: true,
    align: "left",
    renderCell: (params) => {
      return <div>{params.value}</div>;
    },
    // TODO: render cell with button menu
    // renderEditCell: (params) => {
    //   return <input value={params.value?.toString()} />;
    // },
  }));

  gridCols.unshift({
    field: "studentId",
    headerName: "Sinh Vien",
    width: 200,
    editable: true,
    align: "left",
  });

  return gridCols;
};

const renderRows = (students: StudentModel[], studentGrades: StudentGradeModel[]) => {
  const groupedStudentGrades = groupBy(studentGrades, (item) => item.studentId);

  const rows = students.map((student, index) => {
    const grades = groupedStudentGrades[student.studentId];

    const base = { id: index, studentId: student.studentId };

    if (grades) {
      const assignmentIdWithScores = grades.reduce((prev, curr) => ({ ...prev, [curr.gradeAssignmentId]: curr.score }), {});
      return { ...base, ...assignmentIdWithScores };
    }

    return base;
  });

  return rows;
};

const handleCellEditCommit: GridEventListener<GridEvents.cellEditCommit> = (e) => {
  console.log(e);
};

const Scores = () => {
  const [assignments, setAssignments] = useState<GradeAssignmentModel[]>([]);
  const [students, setStudents] = useState<StudentModel[]>([]);
  const [gradeStudents, setGradeStudents] = useState<StudentGradeModel[]>([]);

  const { sendRequest } = useHttp();

  const pathname = window.location.pathname;
  const classId = pathname.split("/")[2];

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
      setGradeStudents(data.data.grades);
    };

    sendRequest(requestConfig, handleError, handleSuccess);
  }, [sendRequest]);

  const dataGridCols = columnsDefinition(assignments);
  const dataGridRows = renderRows(students, gradeStudents);

  return (
    <Container>
      <div className="scores">
        <div className="scores__header">
          <h1>Quản lý điểm số</h1>

          <div className="scores__actions">
            <button className="scores__action">
              <UploadIcon />
            </button>
            <button className="scores__action">
              <UploadIcon />
            </button>
          </div>
        </div>

        <div className="scores__datagrid">
          <DataGrid
            onCellEditCommit={handleCellEditCommit}
            sx={{
              fontSize: "2rem",
              "& .MuiDataGrid-editInputCell": {
                fontSize: "2rem",
              },
              ".MuiDataGrid-cell": {
                border: "1px solid gray",
                borderLeft: 0,
                borderTop: 0,
              },
            }}
            autoHeight={true}
            rows={dataGridRows}
            columns={dataGridCols}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
      </div>
    </Container>
  );
};

export default Scores;
