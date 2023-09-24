import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Segment, Header, Grid, Image } from "semantic-ui-react";
import QuestionPoll from "./QuestionPoll";
import ResultPoll from "./ResultPoll";
import TeaserPoll from "./TeaserPoll";
import { withRouter } from "../utils/helper";

const colors = {
  green: {
    name: "green",
    hex: "#21ba45",
  },
  blue: {
    name: "blue",
    hex: "#2185d0",
  },
  grey: {
    name: null,
    hex: "#d4d4d5",
  },
};

const pollTypes = {
  POLL_TEASER: "POLL_TEASER",
  POLL_QUESTION: "POLL_QUESTION",
  POLL_RESULT: "POLL_RESULT",
};

const PollContent = (props) => {
  const { pollType, question, unanswered } = props;

  switch (pollType) {
    case pollTypes.POLL_TEASER:
      return <TeaserPoll question={question} unanswered={unanswered} />;
    case pollTypes.POLL_QUESTION:
      return <QuestionPoll question={question} />;
    case pollTypes.POLL_RESULT:
      return <ResultPoll question={question} />;
    default:
      return;
  }
};

const UserCard = (props) => {
  const { author, question, pollType, wrongPath, unanswered = {} } = props;
  if (wrongPath) {
    return <Navigate to="questions/wrongId" />;
  }
  const tabColor = unanswered ? colors.green : colors.blue;
  const borderTop = !unanswered
    ? `1 px solid ${colors.grey}`
    : `2px solid ${tabColor.hex}`;
  return (
    <div>
      <Segment.Group>
        <Header
          as="h5"
          textAlign="left"
          block
          attached="top"
          style={{ borderTop: borderTop }}
        >
          {author.name} asks:
        </Header>

        <Grid padded>
          <Grid.Row verticalAlign="middle">
            <Grid.Column
              width={3}
              style={{
                height: pollType === "POLL_RESULT" ? 310 + "px" : "none",
              }}
            >
              {pollType === "POLL_RESULT" ? (
                <Image
                  src={author.avatarURL}
                  style={{ borderRadius: 50 + "%", height: 40 + "%" }}
                />
              ) : (
                <Image
                  src={author.avatarURL}
                  style={{ borderRadius: 50 + "%", height: 145 + "px" }}
                />
              )}
            </Grid.Column>
            <Grid.Column
              width={pollType === "POLL_RESULT" ? 1 : 2}
            ></Grid.Column>
            <Grid.Column width={pollType === "POLL_RESULT" ? 10 : 8}>
              <PollContent
                pollType={pollType}
                question={question}
                unanswered={unanswered}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    </div>
  );
};

function mapStateToProps(
  { users, questions, authUser },
  { router, question_id }
) {
  let question,
    pollType,
    author,
    wrongPath = false;

  if (question_id !== undefined) {
    question = questions[question_id];
    pollType = pollTypes.POLL_TEASER;
    author = users[question.author];
  } else {
    const { question_id } = router.params;
    question = questions[question_id];
    const user = users[authUser];

    if (question === undefined) {
      wrongPath = true;
    } else {
      pollType = pollTypes.POLL_QUESTION;
      if (Object.keys(user.answers).includes(question.id)) {
        pollType = pollTypes.POLL_RESULT;
      }
      author = users[question.author];
    }
  }

  return {
    wrongPath,
    question,
    author,
    pollType,
  };
}

export default withRouter(connect(mapStateToProps)(UserCard));
