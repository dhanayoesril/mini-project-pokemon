import React from "react";
import "./styles.scss";
import { Col, Card } from "react-bootstrap";

const CardList = ({ imageUrl, nickname, name, onClick }) => {
  const displayName = nickname ? `(${name})` : name;
  return (
    <Col md={4} sm={4} xs={4} className="card-list-wrapper">
      <Card className="mb-4 card-wrapper" onClick={onClick}>
        <img src={imageUrl} alt="logo_image" className="image" />
        <div className="name">{nickname}</div>
        <div className="name">{displayName}</div>
      </Card>
    </Col>
  );
};

export default CardList;
