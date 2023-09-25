import { Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import { Header, Button } from "semantic-ui-react";

const COLORS = {
  grey: {
    name: null,
    hex: "#d4d4d5",
  },
  yellow: {
    name: "yellow",
    hex: "#FFFF00",
  },
  olive: {
    name: "olive",
    hex: "#008080",
  }
};

const TeaserPoll = (props) => {
  const { question, unanswered } = props;
  const [viewPoll, setViewPoll] = useState(false);
  const BUTTON_COLOR = unanswered ? COLORS.yellow : COLORS.olive;
  const handleClick = (e) => {
    setViewPoll(!viewPoll);
  };
  if (viewPoll) {
    return <Navigate push to={`questions/${question.id}`} />;
  }
  return (
    <Fragment>
      <Header as="h5" textAlign="left">
        Would you rather to:
      </Header>
      <p style={{ textAlign: "center" }}>
        {question.optionOne.text} <br />
        or <br />
        {question.optionTwo.text}
      </p>
      <Button
        color={BUTTON_COLOR.name}
        size="tiny"
        fluid
        onClick={handleClick}
        content={unanswered === true ? "Answer Poll" : "Results"}
      />
    </Fragment>
  );
};

export default TeaserPoll;
