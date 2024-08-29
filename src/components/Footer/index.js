import React, { useEffect } from "react";
import * as ImageAssets from "../../constants/imageAssets";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.scss";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onClickNav = (route) => {
    navigate(route);
  };

  const isPathMyList = location?.pathname === "/my-list";

  return (
    <div className="footer-wrapper bg-warning">
      <div className="navbar">
        <div className="nav-wrapper" onClick={() => onClickNav("/")}>
          <img
            src={ImageAssets.imageBullbasaur}
            alt="icon-navbar"
            className="nav-icon"
          />
          <div className={`nav-title ${isPathMyList ? "" : "active"}`}>
            Pokemon List
          </div>
        </div>
        <div className="nav-wrapper" onClick={() => onClickNav("/my-list")}>
          <img
            src={ImageAssets.imagePokeBall}
            alt="icon-navbar"
            className="nav-icon"
          />
          <div className={`nav-title ${isPathMyList ? "active" : ""}`}>
            My Pokemon List
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
