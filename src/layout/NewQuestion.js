import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  Segment,
  Header,
  Grid,
  Divider,
  Form,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { onSaveQuestion } from "../actions/questions";
import { useState } from "react";

const NewQuestion = (props) => {
  const [validSubmit, setValidSubmit] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [option_1, setOption_1] = useState("");
  const [option_2, setOption_2] = useState("");
  const disabledSubmit = option_1 === "" || option_2 === "";
  const handleChange1 = (e) => {
    setOption_1(e.target.value);
  };
  const handleChange2 = (e) => {
    setOption_2(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { authUser, onSaveQuestion } = props;
    new Promise((res, rej) => {
      setIsloading(true);
      onSaveQuestion(option_1, option_2, authUser);
      setTimeout(() => res("success"), 1000);
    }).then(() => {
      setValidSubmit(true);
      setOption_1("");
      setOption_2("");
    });
  };

  if (validSubmit) {
    return <Navigate to="/" />;
  }

  return (
    <Segment.Group>
      <Header as="h3" textAlign="left" block attached="top">
        Create a New Question
      </Header>

      <Grid padded>
        <Grid.Column>
          {isLoading && (
            <Dimmer active inverted>
              <Loader content="Updating" />
            </Dimmer>
          )}
          <p>Add a new question:</p>
          <p>
            <strong>Would you rather to</strong>
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              id="option_1"
              placeholder="Enter first option"
              value={option_1}
              onChange={handleChange1}
              required
            />
            <Divider horizontal>OR</Divider>
            <Form.Input
              id="option_2"
              placeholder="Enter second option"
              value={option_2}
              onChange={handleChange2}
              required
            />
            <Form.Button positive size="tiny" fluid disabled={disabledSubmit}>
              Submit
            </Form.Button>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment.Group>
  );
};

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps, { onSaveQuestion })(NewQuestion);
