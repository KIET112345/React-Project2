import { useState } from "react";
import { Form, Header } from "semantic-ui-react";

const LoginForm = (props) => {
  const { users, onLoading, setAuthedUser } = props;
  const [value, setValue] = useState("");
  const disabled = value === "" ? true : false;

  const onChange = (e, { value }) => {
    setValue(value);
  };
  const generateDropdownData = () => {
    return users.map((user) => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL },
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const authUser = value;
    console.log(authUser);
    new Promise((resolve, reject) => {
      onLoading();
      setTimeout(() => resolve(), 500);
    }).then(() => setAuthedUser(authUser));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div data-testid="Test Component">
        <Header as="h2" color="yellow">
          Sign In
        </Header>
        <Form.Dropdown
          placeholder="Select an Employee"
          fluid
          selection
          scrolling
          options={generateDropdownData()}
          value={value}
          onChange={onChange}
          data-testid="dropdown"
          required
        />
        <Form.Button
          content="Login"
          positive
          fluid
          disabled={disabled}
          data-testid="button"
        />
      </div>
    </Form>
  );
};
export default LoginForm;
