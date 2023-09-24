import { getInitialData } from '../utils/api';
import { onReceiveQuestions } from './questions';
import { onReceiveUsers } from './users';

export function initialData() {
  return dispatch => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(onReceiveQuestions(questions));
      dispatch(onReceiveUsers(users));
    });
  };
}