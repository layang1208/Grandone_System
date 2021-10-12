export default (products = [], action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return action.payload;
    case "ADD_PRODUCT":
      return [...products, action.payload];
    case "UPDATE_CART":
      return products.map();
    case "DELETE_CART":
      return products.filter();
    default:
      return products;
  }
};
