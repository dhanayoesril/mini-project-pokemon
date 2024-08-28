import React from "react";
import "./styles.scss";
import { Col, Card } from "react-bootstrap";

const CardList = ({ imageUrl, name }) => {
  return (
    <Col md={3} sm={4} xs={4} className="card-list-wrapper">
      <Card className="mb-4 card-wrapper">
        <img src={imageUrl} alt="logo_image" className="image" />
        <div className="name">{name}</div>
      </Card>
    </Col>
  );
};

export default CardList;
