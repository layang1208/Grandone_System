import * as api from "../api";

const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProducts();
    dispatch({ type: "FETCH_PRODUCTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export { getProducts };
