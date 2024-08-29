import React from "react";
import "./styles.scss";
import { Col, Card } from "react-bootstrap";

const CardList = ({ imageUrl, name, onClick }) => {
  return (
    <Col md={4} sm={4} xs={4} className="card-list-wrapper">
      <Card className="mb-4 card-wrapper" onClick={onClick}>
        <img src={imageUrl} alt="logo_image" className="image" />
        <div className="name">{name}</div>
      </Card>
    </Col>
  );
};

export default CardList;
