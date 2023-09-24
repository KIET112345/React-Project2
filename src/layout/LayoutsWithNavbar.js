import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const LayoutsWithNavbar = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};
export default LayoutsWithNavbar;
