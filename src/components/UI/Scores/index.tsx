import {
  DataGrid,
  GridActionsColDef,
  GridCellEditCommitParams,
  GridCellParams,
  GridColDef,
  GridEditCellProps,
  GridEditCellPropsParams,
  GridEnrichedColDef,
  GridEventListener,
  GridEvents,
  useGridApiRef,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GradeAssignmentModel } from "../../../@types/models/GradeAssignmentModel";
import { StudentGradeModel } from "../../../@types/models/StudentGradeModel";
import { StudentModel } from "../../../@types/models/StudentModel";
import UploadIcon from "../../../components/icons/Upload";
import Container from "../../../components/layouts/container/Container";
import useHttp from "../../../hooks/useHttp";
import { groupBy } from "../../../utils/array";
import HeaderCell from "./components/HeaderCell";
import ScoreCell from "./components/ScoreCell";
import StudentOverviewCell from "./components/StudentOverviewCell";
import "./index.scss";

const columnsDefinition = (assignments: GradeAssignmentModel[]) => {
  const gridCols: GridColDef[] = assignments.map((assignment) => ({
    field: assignment.id.toString(),
    headerName: assignment.title,
    disableColumnMenu: true,
    sortable: false,
    width: 200,
    editable: true,
    align: "left",
    renderCell: (params) => {
      return <ScoreCell value={params.value} />;
    },
    renderHeader: (params) => {
      return <HeaderCell value={params.colDef.headerName} />;
    },
    preProcessEditCellProps: (params) => {
      const value = params.props.value;
      if (value && (value < 0 || value > 10)) return { ...params.props, error: true };
      return { ...params.props, error: false };
    },
  }));

  gridCols.unshift({
    field: "student",
    headerName: "Sinh Vien",
    width: 300,
    editable: false,
    align: "left",
    renderCell: (params) => {
      const { fullName, id, avatar } = params.value as StudentModel;
      return <StudentOverviewCell avatarUrl={avatar} studentName={fullName} userLink={`/users/${id}`} />;
    },
  });

  return gridCols;
};

const generateDataRows = (students: StudentModel[], studentGrades: StudentGradeModel[]) => {
  const groupedStudentGrades = groupBy(studentGrades, (item) => item.studentId);

  console.log("generate datarow::", students);

  const rows = students.map((student, index) => {
    const grades = groupedStudentGrades[student.studentId];

    const base = { id: index, student: student };

    if (grades) {
      const assignmentIdWithScores = grades.reduce((prev, curr) => ({ ...prev, [curr.gradeAssignmentId]: curr.score }), {});
      console.log({ ...base, ...assignmentIdWithScores });
      return { ...base, ...assignmentIdWithScores };
    }

    return base;
  });

  return rows;
};

const Scores = () => {
  const [assignments, setAssignments] = useState<GradeAssignmentModel[]>([]);
  const [students, setStudents] = useState<StudentModel[]>([]);
  const [rowGrades, setRowGrades] = useState<any[]>([]);

  const { sendRequest } = useHttp();

  const pathname = window.location.pathname;
  const classId = pathname.split("/")[2];

  const handleCellEditCommit = (e: GridCellEditCommitParams) => {
    if (e.value == null) return;

    const requestConfig = {
      url: `grades/${classId}/${classId}`,
      method: "patch",
    };

    const handleError = () => {};

    const handleSuccess = (data: any) => {
      const studentsData = data.map((item: any) => {
        return item as StudentModel;
      });
      setStudents(studentsData);
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
      const grades: StudentGradeModel[] = data.data.grades.map((item: any) => item as StudentGradeModel);
      const rows = generateDataRows(students, grades);
      setRowGrades(rows);
    };

    sendRequest(requestConfig, handleError, handleSuccess);
  }, [sendRequest]);

  const dataGridCols = columnsDefinition(assignments);

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
            rows={rowGrades}
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
