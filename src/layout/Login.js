import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import { setAuthUser } from "../actionsStore/authUser";
import BrandImage from "./login-sup-component/BrandImage";
import LoginHeader from "./login-sup-component/LoginHeader";
import LoginGridLayout from "./login-sup-component/LoginGridLayout";
import LoginForm from "./login-sup-component/LoginForm";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const handleLoading = () => {
    setLoading(true);
  };
  return (
    <Fragment>
      <Segment.Group>
        <LoginHeader />
        <LoginGridLayout
          image={<BrandImage />}
          form={<ConnectedLoginForm onLoading={handleLoading} />}
          loading={loading}
        />
      </Segment.Group>
    </Fragment>
  );
};

function mapStateToProps({ users }) {
  return {
    users: Object.values(users),
  };
}

const ConnectedLoginForm = connect(mapStateToProps, { setAuthUser })(LoginForm);

export default Login;
