import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { TeacherModel } from "../@types/models/TeacherModel";
import useHttp from "./useHttp";

const useIsTeacher = () => {
  const [listTeachers, setListTeachers] = useState<TeacherModel[]>([]);
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const location = useLocation();

  const { sendRequest } = useHttp();

  const { pathname } = location;

  const userId = localStorage.getItem("userId");

  const isClassDetail = pathname.indexOf("class-detail") >= 0;

  //get teacher
  useEffect(() => {
    if (isClassDetail) {
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
        setListTeachers(memberInfoFormat);
      };
      sendRequest(requestConfig, handleError, getTeachers);
    }
  }, [sendRequest, pathname, isClassDetail]);

  //check teacher
  useEffect(() => {
    if (listTeachers.findIndex((teacher) => teacher.id === parseInt(userId ? userId : "")) >= 0) {
      setIsTeacher(true);
    }
  }, [listTeachers, userId]);

  return { isTeacher: isTeacher };
};

export default useIsTeacher;
