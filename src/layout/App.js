import { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import Login from "./Login";
import Home from "./Home";
import UserCard from "./UserCard";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import NoMatchQuestion from "./NoMatchQuestion";
import LayoutsWithNavbar from "./LayoutsWithNavbar";

const App = (props) => {
  const { authUser } = props;
  useEffect(() => {
    props.handleInitialData();
  }, []);

  return (
    <div className="App">
      <Routes>
        {authUser === null ? (
          <Fragment>
            <Route path="*" element={<Login />} />
          </Fragment>
        ) : (
          <Fragment>
            <Route path="/" element={<LayoutsWithNavbar />}>
              <Route path="/" element={<Home />} />
              <Route path="/questions/wrongId" element={<NoMatchQuestion />} />
              <Route path="/questions/:questionId" element={<UserCard />} />
              <Route path="/add" element={<NewQuestion />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Route>
          </Fragment>
        )}
      </Routes>
    </div>
  );
};

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps, { handleInitialData })(App);
