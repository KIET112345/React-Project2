import { Fragment } from "react";
import { connect } from "react-redux";
import {
  Segment,
  Grid,
  Header,
  Image,
  Label,
  Divider,
} from "semantic-ui-react";

const trophyColor = ["yellow", "grey", "orange"];
const Leaderboard = (props) => {
  const { leaderboardData } = props;
  return (
    <Fragment>
      {leaderboardData.map((user, idx) => (
        <Segment.Group key={user.id}>
          <Label corner="left" icon="trophy" color={trophyColor[idx]} />
          <Grid divided padded>
            <Grid.Row>
              <Grid.Column
                width={2}
                verticalAlign="middle"
                style={{ height: 85 + "%" }}
              >
                <Image
                  src={user.avatarURL}
                  style={{ borderRadius: 50 + "%", height: 100 + "%" }}
                />
              </Grid.Column>

              <Grid.Column width={8}>
                <Header as="h3" textAlign="left">
                  {user.name}
                </Header>
                <Grid>
                  <Grid.Column width={12}>Answered questions</Grid.Column>
                  <Grid.Column width={4}>
                    <b>{user.answerCount}</b>
                  </Grid.Column>
                </Grid>
                <Divider />
                <Grid>
                  <Grid.Column width={12}>Created questions</Grid.Column>
                  <Grid.Column width={4}>
                    <b>{user.questionCount}</b>
                  </Grid.Column>
                </Grid>
              </Grid.Column>

              <Grid.Column width={6} textAlign="center">
                <Segment.Group>
                  <Header as="h5" block attached="top" content="Score" />
                  <Segment>
                    <Label circular color="olive" size="big">
                      {user.questionCount + user.answerCount}
                    </Label>
                  </Segment>
                </Segment.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment.Group>
      ))}
    </Fragment>
  );
};

function mapStateToProps({ users }) {
  const leaderboardData = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answerCount: Object.values(user.answers).length,
      questionCount: user.questions.length,
      total: Object.values(user.answers).length + user.questions.length,
    }))
    .sort((a, b) => a.total - b.total)
    .reverse()
    .slice(0, 3);
  return {
    leaderboardData,
  };
}

export default connect(mapStateToProps)(Leaderboard);
