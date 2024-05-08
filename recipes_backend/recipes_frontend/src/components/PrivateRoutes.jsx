import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = (props) => {
  const { currentUser } = props;
  console.log(currentUser);

  return currentUser.token ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRoutes;
