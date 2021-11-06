import React from "react";
import Card from "../../layouts/card/Card";
import Container from "../../layouts/container/Container";

const HomeLogged = () => {
  return (
    <Container>
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
