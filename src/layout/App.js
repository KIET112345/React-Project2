import React, { Component, Fragment } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { initialData } from '../actionsStore/shared';
import { connect } from 'react-redux';
import Login from './Login';
import Nav from './Nav';
import Home from './Home';
import UserCard from './UserCard';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import NoMatchQuestion from './NoMatchQuestion';

class App extends Component {
  componentDidMount() {
    this.props.initialData();
  }
  render() {
    const { authUser } = this.props;
    return (
      <div className="App">
        <Routes>
          {authUser === null ? (
            <Fragment>
              <Route path = "*" element = {<Login />} />
            </Fragment>
          ) : (
            <Fragment>
                <Route path="/" element={<LayoutsWithNavbar />}>
                    <Route path = "/" element = {<Home />} />
                    <Route path = "/questions/wrong_id" element = {<NoMatchQuestion />} />
                    <Route path = "/questions/:question_id" element = {<UserCard />} />
                    <Route path = "/add" element = {<NewQuestion />} />
                    <Route path = "/leaderboard" element = {<Leaderboard />} />
                </Route>
            </Fragment>
          )}
        </Routes>
      </div>
    );
  }
}

function LayoutsWithNavbar() {
    return (
        <div>
            <Nav />
            <Outlet />
        </div>
    );
}

function mapStateToProps({authUser}) {
  return {
    authUser
  };
}

export default connect(mapStateToProps, {initialData})(App);