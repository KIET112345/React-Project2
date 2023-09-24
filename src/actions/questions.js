import { saveQuestion } from '../utils/api';
import { addQuestionToUser } from '../actions/users';

export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';

export function handleAddNewAnswerToQuestion(authedUser, questionId, answer) {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    authedUser,
    questionId,
    answer
  };
}

export function handleSaveQuestion(optionOneText, optionTwoText, author) {
  return dispatch => {
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      question => {
        dispatch(onAddQuestion(question));
        dispatch(addQuestionToUser(question));
      }
    );
  };
}

export function onAddQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function onReceiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}



