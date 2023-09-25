import { Fragment } from "react";
import { connect } from "react-redux";
import { Header, Segment, Progress } from "semantic-ui-react";
import { withRouterHandle } from "../utils/helper";
import YourVoteLabel from "./YourVoteLabel";

const styles = {
  primary: {
    color: "green",
    bgColor: "honeydew",
  },
  secondary: {
    color: "grey",
    bgColor: "#f4f4f4",
  },
};

const ResultPoll = (props) => {
  const { question, user } = props;
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;
  const userOfVote = user.answers[question.id];
  let option_1 = styles.secondary;
  let option_2 = styles.secondary;
  if (optionOneVotes > optionTwoVotes) {
    option_1 = styles.primary;
  } else {
    option_2 = styles.primary;
  }
  return (
    <Fragment>
      <Header as="h3">
        Result:
        <Header.Subheader style={{ fontWeight: "bold" }}>
          Would you rather to:
        </Header.Subheader>
      </Header>

      <Segment
        color={option_1.color}
        style={{ backgroundColor: `${option_1.bgColor}` }}
      >
        {userOfVote === "optionOne" && <YourVoteLabel />}
        <p style={{ fontWeight: "bold" }}>{question.optionOne.text}</p>
        <Progress
          percent={((optionOneVotes / totalVotes) * 100).toFixed(2)}
          progress
          color={option_1.color}
        >
          {optionOneVotes} out of {totalVotes} votes
        </Progress>
      </Segment>

      <Segment
        color={option_2.color}
        style={{ backgroundColor: `${option_2.bgColor}` }}
      >
        {userOfVote === "optionTwo" && <YourVoteLabel />}
        <p style={{ fontWeight: "bold" }}>{question.optionTwo.text}</p>
        <Progress
          percent={((optionTwoVotes / totalVotes) * 100).toFixed(2)}
          progress
          color={option_2.color}
        >
          {optionTwoVotes} out of {totalVotes} votes
        </Progress>
      </Segment>
    </Fragment>
  );
};

function mapStateToProps({ users, authUser }) {
  const user = users[authUser];
  return {
    user,
  };
}

export default withRouterHandle(connect(mapStateToProps)(ResultPoll));
