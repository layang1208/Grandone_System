import * as actions from "../constants/actionTypes";
export default (posts = [], action) => {
  switch (action.type) {
    case actions.FETCH_POSTS:
      return action.payload;
    case actions.CREATE_POST:
      // spread previous post and save new post inside the payload
      return [...posts, action.payload];
    case actions.UPDATE_POST:
    case actions.UPDATE_LIKE:
      return posts.map((post) =>
        //update(replace) the newPost if the post in payload's id is equal to the previous post's in posts
        //the rest of posts will remain the same
        post._id === action.payload._id ? action.payload : post
      );
    case actions.DELETE_POST:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};
