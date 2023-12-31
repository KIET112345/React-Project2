import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Header, Button, Form, Radio } from "semantic-ui-react";
import { handleSaveQuestionAnswer } from "../actions/users";

const QuestionPoll = (props) => {
  const [value, setValue] = useState("");
  const { question } = props;
  const disabled = value === "" ? true : false;
  const handleChange = (e, { value }) => {
    setValue(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value !== "") {
      const { authUser, question, handleSaveQuestionAnswer } = props;
      handleSaveQuestionAnswer(authUser, question.id, value);
    }
  };
  return (
    <Fragment>
      <Header as="h4">Would You Rather</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <Radio
            label={question.optionOne.text}
            name="radioGroup"
            value="optionOne"
            checked={value === "optionOne"}
            onChange={handleChange}
          />
          <br />
          <Radio
            label={question.optionTwo.text}
            name="radioGroup"
            value="optionTwo"
            checked={value === "optionTwo"}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Button
            color="yellow"
            size="tiny"
            fluid
            positive
            disabled={disabled}
            content="Submit"
          />
        </Form.Field>
      </Form>
    </Fragment>
  );
};

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps, { handleSaveQuestionAnswer })(QuestionPoll);
