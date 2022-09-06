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
                           el.photos,
                           el.rating,
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
   image
) => {
   try {
      return async (dispatch, getState) => {
         const token = getState().auth.token;

         let formdata = new FormData();

         formdata.append("comment", comment);
         formdata.append("pros", pros);
         formdata.append("cons", cons);
         formdata.append("rating", rating);
         formdata.append("photo", {
            uri: image,
            name: "image.jpg",
            type: "image/jpeg",
         });

         const response = await fetch(
            `${HOST}:${PORT}/api/product/${productId}/add_comment/`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "multipart/form-data",
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Token ${token}`,
               },
               body: formdata,
            }
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();

         const response2 = await fetch(
            `${HOST}:${PORT}/users/api/user_profile/`,
            {
               headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Token ${token}`,
               },
            }
         );

         if (!response2.ok) {
            throw new Error("Something went wrong!");
         }

         const resData2 = await response2.json();
         var user = new User(
            resData2.id,
            resData2.email,
            resData2.username,
            resData2.first_name,
            resData2.last_name,
            resData2.middle_name,
            resData2.living_place,
            resData2.ware_house,
            resData2.delivery_type,
            resData2.phone
         );

         const newComment = new ProductReview(
            resData.id,
            resData.product,
            user,
            resData.photos,
            resData.comment,
            resData.pros,
            resData.cons,
            resData.rating,
            resData.creation_date,
            0,
            []
         );

         dispatch({
            type: CREATE_PRODUCT_REVIEWS,
            newComment: newComment,
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
   image,
   rating
) => {
   try {
      return async (dispatch, getState) => {
         const token = getState().auth.token;

         let formdata = new FormData();
         console.log(comment, "here");
         formdata.append("comment", comment);
         formdata.append("pros", "");
         formdata.append("cons", "");
         formdata.append("parent", commentId);
         formdata.append("rating", rating);
         formdata.append("photo", {
            uri: image,
            name: "image.jpg",
            type: "image/jpeg",
         });
         const response = await fetch(
            `${HOST}:${PORT}/api/product/${productId}/add_comment/`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "multipart/form-data",
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Token ${token}`,
               },
               body: formdata,
            }
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();

         const response2 = await fetch(
            `${HOST}:${PORT}/users/api/user_profile/`,
            {
               headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Token ${token}`,
               },
            }
         );

         if (!response2.ok) {
            throw new Error("Something went wrong!");
         }

         const resData2 = await response2.json();
         var user = new User(
            resData2.id,
            resData2.email,
            resData2.username,
            resData2.first_name,
            resData2.last_name,
            resData2.middle_name,
            resData2.living_place,
            resData2.ware_house,
            resData2.delivery_type,
            resData2.phone
         );

         var newReply = new ProductReply(
            resData.id,
            commentId,
            comment,
            user,
            resData.photos,
            rating,
            resData.creation_date
         );

         dispatch({
            type: CREATE_REVIEW_REPLY,
            newReply: newReply,
            commentId: commentId,
         });
      };
   } catch (err) {
      throw err;
   }
};
