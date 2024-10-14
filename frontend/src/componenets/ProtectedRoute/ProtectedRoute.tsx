import React from "react";
import { Navigate } from "react-router-dom";
interface ProtectedRouteProps {
    children: React.ReactNode; // The children prop that is passed to the component
}
const ProtectedRoute = (props: ProtectedRouteProps) => {
    if (localStorage.getItem("token") == null)
        return <Navigate to={"/login"} />;
    else return <>{props.children}</>;
};

export default ProtectedRoute;
