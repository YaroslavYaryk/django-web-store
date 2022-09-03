import sortingDict from "../../constants/productsReviewsSort";
import PRODUCT_REVIEWS from "../../data/productReviews";
import { HOST, PORT } from "../../constants/server";
import User from "../../models/User";
import ProductReview from "../../models/ProductReview";
import ProductReply from "../../models/ProductReply";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT_REVIEWS = "CREATE_PRODUCT_REVIEWS";
export const CREATE_REVIEW_REPLY = "CREATE_REVIEW_REPLY";
export const READ_PRODUCT_REVIEWS = "READ_PRODUCT_REVIEWS";

export const fetchReviews = (productId) => {
   try {
      return async (dispatch, getState) => {
         // const token = getState().auth.token;

         const link = `api/product/${productId}/get_comments/`;
         const response = await fetch(`${HOST}:${PORT}/${link}`);

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();
         const productReviews = [];
         for (const key in resData) {
            productReviews.push(
               new ProductReview(
                  resData[key].id,
                  resData[key].product,
                  new User(
                     resData[key]["user"].id,
                     resData[key]["user"].email,
                     resData[key]["user"].username,
                     resData[key]["user"].first_name,
                     resData[key]["user"].last_name,
                     resData[key]["user"].middle_name,
                     resData[key]["user"].living_place,
                     resData[key]["user"].ware_house,
                     resData[key]["user"].delivery_type,
                     resData[key]["user"].phone
                  ),
                  resData[key].photos,
                  resData[key].comment,
                  resData[key].pros,
                  resData[key].cons,
                  resData[key].rating,
                  resData[key].creation_date,
                  resData[key].comment_likes,
                  resData[key]["replies"].map(
                     (el) =>
                        new ProductReply(
                           el.id,
                           el.comment_id,
                           el.comment,
                           new User(
                              el["user"].id,
                              resData[key]["user"].email,
                              el["user"].username,
                              el["user"].first_name,
                              el["user"].last_name,
                              el["user"].middle_name,
                              el["user"].living_place,
                              el["user"].ware_house,
                              el["user"].delivery_type,
                              el["user"].phone
                           ),
                           el.date
                        )
                  )
               )
            );
         }

         dispatch({
            type: READ_PRODUCT_REVIEWS,
            productReviews: productReviews,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const sortReviews = (orderMethid, array) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: READ_PRODUCT_REVIEWS,
            productReviews: sortingDict[orderMethid](array),
         });
      };
   } catch (err) {
      throw err;
   }
};

export const createReviewToProduct = (
   productId,
   rating,
   comment,
   pros,
   cons,
   fullName,
   email
) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: CREATE_PRODUCT_REVIEWS,
            productData: {
               productId,
               rating,
               comment,
               pros,
               cons,
               fullName,
               email,
            },
         });
      };
   } catch (err) {
      throw err;
   }
};

export const createReviewReply = (
   productId,
   commentId,
   comment,
   fullName,
   email
) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: CREATE_REVIEW_REPLY,
            productData: {
               productId,
               commentId,
               comment,
               fullName,
               email,
            },
         });
      };
   } catch (err) {
      throw err;
   }
};
