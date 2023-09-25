import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const withRouterHandle = (Component) => {
  const ComponentWithRouter = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const param = useParams();
    return <Component {...props} router={{ location, navigate, param}} />;
  }
  return ComponentWithRouter;
}
