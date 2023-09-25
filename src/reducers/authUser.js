import { SET_AUTH_USER } from "../actions/authUser";

export default function authUser(state = null, action) {
  switch (action.type) {
    case SET_AUTH_USER:
      console.log('action', action)
      return action.userId;
    default:
      return state;
  }
}