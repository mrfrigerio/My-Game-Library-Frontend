import { RoutesProps, Navigate, Route } from "react-router";
import { useAuth } from "../context/Auth";

interface RouteProp extends RoutesProps {
  path?: string;
  component: React.FC;
  isPrivate?: boolean;
}

const RouteWrapper = ({
  component: Component,
  isPrivate = false,
}: RouteProp) => {
  const { isLogged } = useAuth();

  if (!isLogged && isPrivate) {
    return <Navigate replace to="/login" />;
  }

  if (isLogged && !isPrivate) {
    return <Navigate replace to="/" />;
  }

  return <Route element={<Component />} />;
};

export default RouteWrapper;
