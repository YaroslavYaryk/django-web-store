import {
   CREATE_PRODUCT_REVIEWS,
   CREATE_REVIEW_REPLY, //   DELETE_PRODUCT,
   READ_PRODUCT_REVIEWS,
   READ_USER_COMMENTS,
   EDIT_COMMENT,
   DELETE_COMMENT,
} from "../actions/productReviewsActions";
import { ADD_COMMENT_LIKE, DELETE_COMMENT_LIKE } from "../actions/likeActions";
import PRODUCT_REVIEWS from "../../data/productReviews";
import ProductReview from "../../models/ProductReview";
import ProductReply from "../../models/ProductReply";
import User from "../../models/User";
const initialState = {
   productReviews: [],
   userReviews: [],
};
// import Product from "../../models/Product";

const prReviewsReducer = (state = initialState, action) => {
   switch (action.type) {
      case READ_PRODUCT_REVIEWS:
         return {
            ...state,
            productReviews: action.productReviews,
         };

      case CREATE_PRODUCT_REVIEWS:
         return {
            userReviews: state.userReviews.concat({
               id: action.newComment.id,
               product: action.newComment.productId,
               user: action.newComment.user.id,
            }),
            productReviews: state.productReviews.concat(action.newComment),
         };
      case EDIT_COMMENT:
         var comments = state.productReviews;
         if (action.parent) {
            const reviewIndex1 = state.productReviews.findIndex(
               (prod) => prod.id === action.parent
            );
            var review = comments[reviewIndex1];
            const replyIndex = review.replies.findIndex(
               (elem) => (elem.id = action.commentId)
            );
            var replyItem = review.replies[replyIndex];
            replyItem.comment = action.comment;
            replyItem.rating = action.rating;
            replyItem.photos = action.photos;
            review.replies[replyIndex] = replyItem;
            comments[reviewIndex1] = review;
         } else {
            const reviewIndex1 = state.productReviews.findIndex(
               (prod) => prod.id === action.commentId
            );
            var prevComment = comments[reviewIndex1];
            prevComment.comment = action.comment;
            prevComment.pros = action.pros;
            prevComment.cons = action.cons;
            prevComment.rating = action.rating;
            prevComment.photos = action.photos;
            comments[reviewIndex1] = prevComment;
         }
         return {
            ...state,
            productReviews: comments,
         };
      case DELETE_COMMENT:
         var newComments;
         if (action.parent) {
            newComments = state.productReviews;
            var commentIndex = state.productReviews.findIndex(
               (elem) => elem.id == action.parent
            );
            var commentItem = newComments[commentIndex];
            commentItem.replies = commentItem.replies.filter(
               (elem) => elem.id != action.commentId
            );
            newComments[commentIndex] = commentItem;
         } else {
            newComments = state.productReviews.filter(
               (elem) => elem.id != action.commentId
            );
         }
         return {
            ...state,
            productReviews: newComments,
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
      case READ_USER_COMMENTS:
         return {
            ...state,
            userReviews: action.comments,
         };
      case ADD_COMMENT_LIKE:
         var newComments = state.productReviews;
         if (action.like.parent) {
            const reviewIndex2 = state.productReviews.findIndex(
               (elem) => elem.id == action.like.parent
            );
            var reviewItem2 = state.productReviews[reviewIndex2];
            const replyIndex = reviewItem2.replies.findIndex(
               (elem) => elem.id == action.like.post_comment
            );

            var replyItem = reviewItem2.replies[replyIndex];

            replyItem.likesCount += 1;
            reviewItem2.replies[replyIndex] = replyItem;
            newComments[reviewIndex2] = reviewItem2;
         } else {
            const reviewIndex2 = state.productReviews.findIndex(
               (elem) => elem.id == action.like.post_comment
            );
            var reviewItem2 = state.productReviews[reviewIndex2];
            reviewItem2.likesCount += 1;
            newComments[reviewIndex2] = reviewItem2;
         }

         return {
            ...state,
            productReviews: newComments,
         };
      case DELETE_COMMENT_LIKE:
         var newComments = state.productReviews;
         if (action.like.parent) {
            const reviewIndex2 = state.productReviews.findIndex(
               (elem) => elem.id == action.like.parent
            );
            var reviewItem2 = state.productReviews[reviewIndex2];
            const replyIndex = reviewItem2.replies.findIndex(
               (elem) => elem.id == action.like.post_comment
            );
            var replyItem = reviewItem2.replies[replyIndex];
            replyItem.likesCount -= 1;
            reviewItem2.replies[replyIndex] = replyItem;
            newComments[reviewIndex2] = reviewItem2;
         } else {
            const reviewIndex2 = state.productReviews.findIndex(
               (elem) => elem.id == action.like.post_comment
            );
            var reviewItem2 = state.productReviews[reviewIndex2];
            reviewItem2.likesCount -= 1;
            newComments[reviewIndex2] = reviewItem2;
         }

         return {
            ...state,
            productReviews: newComments,
         };
   }
   return state;
};

export default prReviewsReducer;
