import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Segment, Header, Grid, Image } from "semantic-ui-react";
import QuestionPoll from "./QuestionPoll";
import ResultPoll from "./ResultPoll";
import TeaserPoll from "./TeaserPoll";
import { withRouterHandle } from "../utils/helper";

const COLORS = {
  yellow: {
    name: "yellow",
    hex: "#FFFF00",
  },
  olive: {
    name: "olive",
    hex: "#808000",
  },
  grey: {
    name: null,
    hex: "#d4d4d5",
  },
};

const POLL_TYPES = {
  POLL_TEASER: "POLL_TEASER",
  POLL_QUESTION: "POLL_QUESTION",
  POLL_RESULT: "POLL_RESULT",
};

const PollContent = (props) => {
  const { pollType, question, unanswered } = props;

  switch (pollType) {
    case POLL_TYPES.POLL_TEASER:
      return <TeaserPoll question={question} unanswered={unanswered} />;
    case POLL_TYPES.POLL_QUESTION:
      return <QuestionPoll question={question} />;
    case POLL_TYPES.POLL_RESULT:
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
  const tabColor = unanswered ? COLORS.yellow : COLORS.olive;
  const borderTop = !unanswered
    ? `1 px solid ${COLORS.grey}`
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
  { router, questionId }
) {
  let question,
    pollType,
    author,
    wrongPath = false;

  if (questionId !== undefined) {
    question = questions[questionId];
    pollType = POLL_TYPES.POLL_TEASER;
    author = users[question.author];
  } else {
    const { questionId } = router.params;
    question = questions[questionId];
    const user = users[authUser];

    if (question === undefined) {
      wrongPath = true;
    } else {
      pollType = POLL_TYPES.POLL_QUESTION;
      if (Object.keys(user.answers).includes(question.id)) {
        pollType = POLL_TYPES.POLL_RESULT;
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

export default withRouterHandle(connect(mapStateToProps)(UserCard));
