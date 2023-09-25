import { ADD_ANSWER_TO_QUESTION, ADD_QUESTION, RECEIVE_QUESTIONS } from "../actions/questions";
export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return { ...state, ...action.questions };
    case ADD_ANSWER_TO_QUESTION:
      const { authUser, questionId, answer } = action;
      return {
        ...state,
        [questionId]: {
          ...state[questionId],
          [answer]: {
            ...state[questionId][answer],
            votes: state[questionId][answer].votes.concat(authUser)
          }
        }
      };
    case ADD_QUESTION:
      const { question } = action;
      return {
        ...state,
        [question.id]: question
      };
    default:
      return state;
  }
}