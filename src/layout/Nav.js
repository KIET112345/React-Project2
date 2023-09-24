import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Image, Button, Container } from 'semantic-ui-react';
import { setAuthUser } from '../actionsStore/authUser';

const Nav = (props) => {
  const { authUser, users, setAuthUser } = props;
  const logout = (e) => {
    e.preventDefault();
    setAuthUser(null);
  }
  return (
    <Container>
      <Menu pointing secondary>
        <Menu.Item name = "home" as = {NavLink} to = "/" />
        <Menu.Item name = "New Question" as = {NavLink} to = "/add" />
        <Menu.Item name = "Leaderboard" as = {NavLink} to = "/leaderboard" />
        <Menu.Menu position = "right">
          <Menu.Item>
            <span>
              {users[authUser].name}
              <Image src={users[authUser].avatarURL} avatar spaced = "right" verticalAlign = "bottom" />
            </span>
          </Menu.Item>
          <Menu.Item>
            <Button content="Logout" labelPosition="right" basic compact icon="log out" size="mini" onClick={logout} />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  );
}

function mapStateToProps({users, authUser}) {
  return {
    authUser,
    users
  };
}

export default connect(mapStateToProps, {setAuthUser})(Nav);