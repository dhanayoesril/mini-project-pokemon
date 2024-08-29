import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import "./styles.scss";

const CardDetail = ({ types, moves }) => {
  return (
    <Card className="card-detail-wrapper p-3 text-center">
      <div className="font-12 fw-600 mb-2 font-white">Types</div>
      <Row className="px-3 mb-3 d-flex justify-content-center">
        {types &&
          types.map((item, idx) => (
            <Col
              md={2}
              sm={2}
              xs={2}
              className="detail-wrapper bg-warning mr-1"
              key={idx}
            >
              <div className="name">{item?.type?.name}</div>
            </Col>
          ))}
      </Row>
      <div className="font-12 fw-600 mb-2 font-white">Moves</div>
      <Row
        className={`px-3 d-flex justify-content-center ${
          moves?.length > 10 ? "mb-1" : "mb-3"
        }`}
      >
        {moves &&
          moves.slice(0, 10).map((item, idx) => (
            <Col
              md={3}
              sm={6}
              xs={6}
              className="detail-wrapper bg-warning mr-1 mb-1"
              key={idx}
            >
              <div className="name">{item?.move?.name}</div>
            </Col>
          ))}
      </Row>
      {moves?.length > 10 && (
        <div className="d-flex justify-content-center">
          <div className="other-wrapper mb-3 bg-success">See other moves</div>
        </div>
      )}
    </Card>
  );
};

export default CardDetail;
