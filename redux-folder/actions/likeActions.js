import { HOST, PORT } from "../../constants/server";
import CategoryItem from "../../models/CategoryItem";
export const READ_LIKES = "READ_LIKES";
export const ADD_LIKE = "ADD_LIKE";

export const fetchLikes = () => {
   try {
      return async (dispatch, getState) => {
         const userId = getState();
         var token = getState().auth.token;
         const response = await fetch(`${HOST}:${PORT}/api/user_likes/`, {
            headers: {
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*",
               Authorization: `Token ${token}`,
            },
         });

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();
         const loadedLikes = [];
         for (const key in resData) {
            loadedLikes.push({
               ...resData[key],
            });
         }

         dispatch({
            type: READ_LIKES,
            loadedLikes: loadedLikes,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const addLike = (productId) => {
   try {
      return async (dispatch, getState) => {
         const userId = getState();
         var token = getState().auth.token;
         const response = await fetch(
            `${HOST}:${PORT}/api/product/${productId}/press_like/`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Token ${token}`,
               },
            }
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();

         dispatch({
            type: ADD_LIKE,
            like: resData,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const deleteLike = (productId, likeId) => {
   try {
      return async (dispatch, getState) => {
         const userId = getState();
         var token = getState().auth.token;
         const response = await fetch(
            `${HOST}:${PORT}/api/product/${productId}/delete_like/${likeId}/`,
            {
               method: "DELETE",
               headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Token ${token}`,
               },
            }
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         //   const resData = await response.json();

         //   dispatch({
         //      type: ADD_LIKE,
         //      like: resData,
         //   });
      };
   } catch (err) {
      throw err;
   }
};
