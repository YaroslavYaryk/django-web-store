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
   productReviews: PRODUCT_REVIEWS,
};
// import Product from "../../models/Product";

const prReviewsReducer = (state = initialState, action) => {
   switch (action.type) {
      case READ_PRODUCT_REVIEWS:
         return {
            productReviews: action.productReviews,
         };

      case CREATE_PRODUCT_REVIEWS:
         const newProductReview = new ProductReview(
            Math.round(Math.random() * (100000000000000 - 3) + 3),
            action.productData.productId,
            new User(14, "duhanov2003@gmail.com", "yaryk31", "Ярослав Диханов"),
            [],
            action.productData.comment,
            action.productData.pros,
            action.productData.cons,
            action.productData.rating,
            "2022-08-10T09:52:44.871486Z",
            0,
            null
         );
         return {
            ...state,
            productReviews: state.productReviews.concat(newProductReview),
         };
      case CREATE_REVIEW_REPLY:
         const reviewIndex = state.productReviews.findIndex(
            (prod) => prod.id === action.productData.commentId
         );
         const reviewItem = state.productReviews[reviewIndex];
         const review = new ProductReply(
            Math.round(Math.random() * (100000000000000 - 3) + 3),
            action.productData.commentId,
            action.productData.comment,
            new User(14, "duhanov2003@gmail.com", "yaryk31", "Ярослав Диханов"),
            "2022-08-10T09:52:44.871486Z"
         );
         reviewItem.replies.push(review);
         const updatedAvailableReviews = [...state.productReviews];
         updatedAvailableReviews[reviewIndex] = reviewItem;
         return {
            ...state,
            productReviews: updatedAvailableReviews,
         };
      // case CREATE_PRODUCT:
      //   const newProduct = new Product(
      //     action.productData.id,
      //     action.productData.ownerId,
      //     action.productData.title,
      //     action.productData.imageUrl,
      //     action.productData.description,
      //     action.productData.price
      //   );
      //   return {
      //     ...state,
      //     availableProducts: state.availableProducts.concat(newProduct),
      //     userProducts: state.userProducts.concat(newProduct),
      //   };
      // case UPDATE_PRODUCT:
      //   const productIndex = state.userProducts.findIndex(
      //     (prod) => prod.id === action.productId
      //   );
      //   const updatedProduct = new Product(
      //     action.productId,
      //     state.userProducts[productIndex].ownerId,
      //     action.productData.title,
      //     action.productData.imageUrl,
      //     action.productData.description,
      //     state.userProducts[productIndex].price
      //   );
      //   const updatedUserProducts = [...state.userProducts];
      //   updatedUserProducts[productIndex] = updatedProduct;
      //   const availableProductIndex = state.availableProducts.findIndex(
      //     (prod) => prod.id === action.pid
      //   );
      //   const updatedAvailableProducts = [...state.availableProducts];
      //   updatedAvailableProducts[availableProductIndex] = updatedProduct;
      //   return {
      //     ...state,
      //     availableProducts: updatedAvailableProducts,
      //     userProducts: updatedUserProducts,
      //   };
      // case DELETE_PRODUCT:
      //   return {
      //     ...state,
      //     userProducts: state.userProducts.filter(
      //       (product) => product.id !== action.productId
      //     ),
      //     availableProducts: state.availableProducts.filter(
      //       (product) => product.id !== action.productId
      //     ),
      //   };
   }
   return state;
};

export default prReviewsReducer;
