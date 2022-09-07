import {
   READ_LIKES,
   ADD_LIKE,
   READ_COMMENT_LIKES,
   ADD_COMMENT_LIKE,
   DELETE_COMMENT_LIKE,
   DELETE_LIKE,
} from "../actions/likeActions";

const initialState = {
   productLikes: [],
   commentLikes: [],
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
      case DELETE_LIKE:
         var newLikes = state.productLikes.filter(
            (elem) => elem.id !== action.likeId
         );

         return {
            ...state,
            productLikes: newLikes,
         };

      case READ_COMMENT_LIKES:
         return {
            ...state,
            commentLikes: action.loadedLikes,
         };

      case ADD_COMMENT_LIKE:
         var likes = state.commentLikes;
         var newLikes = likes.push(action.like);

         return {
            ...state,
            commentLikes: newLikes,
         };
      case DELETE_COMMENT_LIKE:
         var newCommentLikes = state.commentLikes.filter(
            (elem) => elem.id !== action.likeId
         );

         return {
            ...state,
            commentLikes: newCommentLikes,
         };
      default:
         return state;
   }
};
