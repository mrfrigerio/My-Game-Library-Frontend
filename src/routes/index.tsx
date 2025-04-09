import React from "react";
import { BrowserRouter, Routes as Router, Route, Navigate } from "react-router";

import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { useAuth } from "../context/Auth";
import { Layout } from "../components/Layout";
import { Library } from "../pages/Library";
import { Favorites } from "../pages/Favorites";

const Routes: React.FC = () => {
  const { isLogged } = useAuth();
  return (
    <BrowserRouter>
      <Layout>
        <Router>
          <Route
            path="login"
            element={!isLogged ? <Login /> : <Navigate replace to="/" />}
          />
          <Route
            path="/"
            element={isLogged ? <Home /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/library"
            element={isLogged ? <Library /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/favorites"
            element={
              isLogged ? <Favorites /> : <Navigate replace to="/login" />
            }
          />
        </Router>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;
