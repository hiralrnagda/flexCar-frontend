import axios from "axios";
export const getAllCars = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const res = await axios.get("/api/cars/getallcars");
    dispatch({ type: "GET_ALL_CARS", payload: res.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
