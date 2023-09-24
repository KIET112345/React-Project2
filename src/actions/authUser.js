export const SET_AUTH_USER = "SET_AUTH_USER";
export function setAuthedUser(userId) {
  return {
    type: SET_AUTH_USER,
    userId,
  };
}
