import { saveQuestion } from '../utils/api';
import { addQuestionToUser } from '../actionsStore/users';

export function onAddNewAnswerToQuestion(authUser, question_id, answer) {
  return {
    type: 'ADD_ANSWER_TO_QUESTION',
    authUser,
    question_id,
    answer
  };
}

export function onSaveQuestion(optionOneText, optionTwoText, author) {
  return dispatch => {
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      question => {
        dispatch(onAddQuestion(question));
        dispatch(addQuestionToUser(question));
      }
    );
  };
}

export function onReceiveQuestions(questions) {
  return {
    type: 'RECEIVE_QUESTIONS',
    questions
  };
}



export function onAddQuestion(question) {
  return {
    type: 'ADD_QUESTION',
    question
  };
}

