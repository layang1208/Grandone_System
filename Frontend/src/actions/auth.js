import * as actions from "../constants/actionTypes";
import * as api from "../api/index";

const signIn = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: actions.AUTH, data });
    history.push("/");
  } catch (error) {}
};
const signUp = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: actions.AUTH, data });
    history.push("/");
  } catch (error) {}
};
export { signIn, signUp };
