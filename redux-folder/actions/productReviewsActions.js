import sortingDict from "../../constants/productsReviewsSort";
import PRODUCT_REVIEWS from "../../data/productReviews";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT_REVIEWS = "CREATE_PRODUCT_REVIEWS";
export const CREATE_REVIEW_REPLY = "CREATE_REVIEW_REPLY";
export const READ_PRODUCT_REVIEWS = "READ_PRODUCT_REVIEWS";

export const fetchReviews = () => {
   try {
      return async (dispatch, getState) => {
         // const token = getState().auth.token;

         // const a = "http://192.168.0.109:8000/event/api/list/";

         // const response = await fetch(`${HOST}:${PORT}/event/api/list/`, {
         //     method: "GET",
         //     headers: {
         //         "Content-Type": "application/json",
         //         "Access-Control-Allow-Origin": "*",
         //         Authorization: `Token ${token}`,
         //     },
         // });
         // if (!response.ok) {
         //     throw new Error("Something went wrong!");
         // }
         // const resData = await response.json();
         // const loadedEvents = [];
         // for (const key in resData) {
         //     loadedEvents.push(
         //         new Event(
         //             resData[key].id,
         //             resData[key].company,
         //             resData[key].customer,
         //             resData[key].artist,
         //             resData[key].venue,
         //             resData[key].price,
         //             resData[key].payment_methods,
         //             resData[key].date,
         //             resData[key].comment,
         //             resData[key].visible,
         //             resData[key].signed,
         //             resData[key].aditional_staff,
         //             resData[key].contract_pdf_url,
         //             resData[key].venue_image
         //         )
         //     );
         // }

         dispatch({
            type: READ_PRODUCT_REVIEWS,
            productReviews: PRODUCT_REVIEWS,
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
