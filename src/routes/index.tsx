import React from "react";
import { BrowserRouter, Routes as Router, Route, Navigate } from "react-router";

import { Login } from "../pages/Login";
import { Main } from "../pages/Main";
import { useAuth } from "../context/Auth";

const Routes: React.FC = () => {
  const { isLogged } = useAuth();
  return (
    <BrowserRouter>
      <Router>
        <Route
          path="login"
          element={!isLogged ? <Login /> : <Navigate replace to="/" />}
        />
        <Route
          path="/"
          element={isLogged ? <Main /> : <Navigate replace to="/login" />}
        />
      </Router>
    </BrowserRouter>
  );
};

export default Routes;
