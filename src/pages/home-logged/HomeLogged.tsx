import React from "react";
import Card from "../../components/UI/card/Card";
import Container from "../../components/layouts/container/Container";
import CreateClassForm from "../../components/UI/form/create-class/CreateClassForm";

const HomeLogged = () => {
  return (
    <Container>
      <CreateClassForm/>
      <div className="homeLogged">
        <h1 className="homeLogged__title">Danh sách lớp học</h1>
        <div className="homeLogged__classes">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </Container>
  );
};

export default HomeLogged;
