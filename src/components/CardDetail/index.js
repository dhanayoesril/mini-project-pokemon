import React, { useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import "./styles.scss";
import { getLocalStorage } from "../../helper/localStorageAction";

const CardDetail = ({
  isCatched,
  id,
  name,
  types,
  moves,
  setShowModalMoves,
}) => {
  let localData = {};
  const existingPokemonList = getLocalStorage("myPokemonList");
  if (existingPokemonList) {
    const parsedData = JSON.parse(existingPokemonList);
    localData = parsedData.find((item) => item?.id === id);
  }

  return (
    <Card className="card-detail-wrapper p-3 text-center">
      {isCatched && (
        <>
          <div className="font-12 fw-600 mb-2 font-white">Nickname</div>
          <Row className="px-3 mb-3 d-flex justify-content-center">
            <Col
              md={2}
              sm={2}
              xs={2}
              className="detail-wrapper bg-warning mr-1"
            >
              <div className="name"> {localData?.nickname}</div>
            </Col>
          </Row>
        </>
      )}
      <div className="font-12 fw-600 mb-2 font-white">Name</div>
      <Row className="px-3 mb-3 d-flex justify-content-center">
        <Col md={2} sm={2} xs={2} className="detail-wrapper bg-warning mr-1">
          <div className="name">{name}</div>
        </Col>
      </Row>

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
          <div
            className="other-wrapper mb-3 bg-success"
            onClick={setShowModalMoves}
          >
            See other moves
          </div>
        </div>
      )}
    </Card>
  );
};

export default CardDetail;
