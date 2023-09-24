import { combineReducers } from 'redux';
import authUser from '../store/authUser';
import questions from '../store/questions';
import users from '../store/users';

export default combineReducers({
  authUser,
  questions,
  users
});