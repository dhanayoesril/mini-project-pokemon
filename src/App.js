import React from "react";
import { Link, RouterProvider } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import router from "./router";
import "./App.scss";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
