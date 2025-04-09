import React from "react";
import { BrowserRouter, Routes as Router, Route, Navigate } from "react-router";

import { Home } from "../pages/Home";
import { useAuth } from "../context/Auth";
import { Layout } from "../components/Layout";
import { Library } from "../pages/Library";
import { Registration } from "../pages/Registration";

const Routes: React.FC = () => {
  const { isLogged } = useAuth();
  return (
    <BrowserRouter>
      <Layout>
        <Router>
          <Route path="/" element={<Home />} />
          <Route
            path="/library"
            element={isLogged ? <Library /> : <Navigate replace to="/" />}
          />
          <Route path="/registration" element={<Registration />} />
        </Router>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;
