import axios from "axios";
import { message } from "antd";
export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const res = await axios.post("/api/users/login", reqObj);
    localStorage.setItem("user", JSON.stringify(res.data));
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
    message.success("Login success!");
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong!");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const res = await axios.post("/api/users/register", reqObj);
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
    message.success("Registeration successful");
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong!");
    dispatch({ type: "LOADING", payload: false });
  }
};
