import {
   CREATE_PRODUCT_REVIEWS,
   CREATE_REVIEW_REPLY, //   DELETE_PRODUCT,
   READ_PRODUCT_REVIEWS,
} from "../actions/productReviewsActions";
import PRODUCT_REVIEWS from "../../data/productReviews";
import ProductReview from "../../models/ProductReview";
import ProductReply from "../../models/ProductReply";
import User from "../../models/User";
const initialState = {
   productReviews: [],
};
// import Product from "../../models/Product";

const prReviewsReducer = (state = initialState, action) => {
   switch (action.type) {
      case READ_PRODUCT_REVIEWS:
         return {
            productReviews: action.productReviews,
         };

      case CREATE_PRODUCT_REVIEWS:
         return {
            ...state,
            productReviews: state.productReviews.concat(action.newComment),
         };

      case CREATE_REVIEW_REPLY:
         const reviewIndex = state.productReviews.findIndex(
            (prod) => prod.id === action.commentId
         );
         const reviewItem = state.productReviews[reviewIndex];
         reviewItem.replies.push(action.newReply);
         const updatedAvailableReviews = [...state.productReviews];
         updatedAvailableReviews[reviewIndex] = reviewItem;
         return {
            ...state,
            productReviews: updatedAvailableReviews,
         };
   }
   return state;
};

export default prReviewsReducer;
