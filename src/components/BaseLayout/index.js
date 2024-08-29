import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import * as ImageAssets from "../../constants/imageAssets";
import "./styles.scss";

const BaseLayout = ({
  children,
  loading,
  previous,
  next,
  onClickPageAction,
  showPagination,
}) => {
  return (
    <div className="wrapper container-fluid">
      <Row className="d-flex justify-content-center">
        <Col md={6} className={`content ${loading ? "bg-full" : "bg-normal"}`}>
          <div className="header">
            <img
              src={ImageAssets.imagePokemon}
              alt="logo_image"
              className="logo"
            />
            <div>Get your pokemon now!</div>
          </div>
          {showPagination && (
            <div className="d-flex flex-row justify-content-center align-items-center">
              <Button
                className="btn-pagination"
                variant="warning"
                onClick={() => onClickPageAction(previous)}
                disabled={!previous}
              >
                <div className="font-14 fw-500">Previous</div>
              </Button>
              <div className="mx-4 font-14 fw-500">Page</div>
              <Button
                className="btn-pagination"
                variant="warning"
                onClick={() => onClickPageAction(next)}
                disabled={!next}
              >
                <div className="font-14 fw-500">Next</div>
              </Button>
            </div>
          )}
          <div className="children-wrapper">{children}</div>
        </Col>
      </Row>
    </div>
  );
};

export default BaseLayout;
