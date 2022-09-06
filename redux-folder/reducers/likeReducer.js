import { READ_LIKES, ADD_LIKE } from "../actions/likeActions";

const initialState = {
   productLikes: [],
};

export default (state = initialState, action) => {
   switch (action.type) {
      case READ_LIKES:
         return {
            ...state,
            productLikes: action.loadedLikes,
         };
      case ADD_LIKE:
         var likes = state.productLikes;
         var newLikes = likes.push(action.like);

         return {
            ...state,
            productLikes: newLikes,
         };

      default:
         return state;
   }
};
