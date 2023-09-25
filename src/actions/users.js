import { saveQuestionAnswer } from "../utils/api";
import { handleAddNewAnswerToQuestion } from "../actions/questions";

export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";
export function handleSaveQuestionAnswer(authedUser, questionId, answer) {
  return (dispatch) => {
    dispatch(onAddAnswerToUser(authedUser, questionId, answer));
    dispatch(handleAddNewAnswerToQuestion(authedUser, questionId, answer));
    return saveQuestionAnswer(authedUser, questionId, answer).catch((e) => {
      console.warn("Error in handleSaveQuestionAnswer: ", e);
    });
  };
}

export function onReceiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

function onAddAnswerToUser(authedUser, questionId, answer) {
  return {
    type: ADD_ANSWER_TO_USER,
    authedUser,
    questionId,
    answer,
  };
}

export function addQuestionToUser({ id, author }) {
  return {
    type: ADD_QUESTION_TO_USER,
    id,
    author,
  };
}
