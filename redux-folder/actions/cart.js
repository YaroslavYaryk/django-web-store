import { HOST, PORT } from "../../constants/server";
import CART from "../../data/cart";
import Cart from "../../models/Cart/Cart";
import CartItem from "../../models/Cart/CartItem";

export const ADD_ONE_PRODUCT_TO_CART = "ADD_ONE_PRODUCT_TO_CART";
export const CREATE_CART = "CREATE_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";
export const READ_CART = "READ_CART";
export const DELETE_PRODUCT_FROM_CART = "DELETE_PRODUCT_FROM_CART";
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const DELETE_ONE_PRODUCT_FROM_CART = "DELETE_ONE_PRODUCT_FROM_CART";

export const fetchCart = () => {
   try {
      return async (dispatch, getState) => {
         const token = getState().auth.token;

         const response = await fetch(`${HOST}:${PORT}/api/get_cart/`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*",
               Authorization: `Token ${token}`,
            },
         });

         var resData = await response.json();
         var cart = [];
         if (resData && resData.length) {
            cart = new Cart(
               resData[0].id,
               resData[0].user,
               resData[0].total_products,
               resData[0].total_price,
               resData[0].products.map((elem) => elem)
            );
         }

         dispatch({
            type: READ_CART,
            cartProducts: cart,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const deleteProductFromCart = (productId, productPrice) => {
   try {
      return async (dispatch, getState) => {
         const token = getState().auth.token;
         console.log(productId);
         const response = await fetch(
            `${HOST}:${PORT}/api/product/${productId}/remove_from_cart/all/`,
            {
               method: "DELETE",
               headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Token ${token}`,
               },
            }
         );

         dispatch({
            type: DELETE_PRODUCT_FROM_CART,
            productId: productId,
            productPrice: productPrice,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const deleteOneProductFromCart = (productId, productPrice) => {
   try {
      return async (dispatch, getState) => {
         const token = getState().auth.token;
         const response = await fetch(
            `${HOST}:${PORT}/api/product/${productId}/remove_from_cart/one/`,
            {
               method: "DELETE",
               headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Token ${token}`,
               },
            }
         );

         dispatch({
            type: DELETE_ONE_PRODUCT_FROM_CART,
            productId: productId,
            productPrice: productPrice,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const deleteAllFromCart = () => {
   try {
      return async (dispatch, getState) => {
         const token = getState().auth.token;
         const response = await fetch(`${HOST}:${PORT}/api/delete_cart/`, {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*",
               Authorization: `Token ${token}`,
            },
         });

         dispatch({
            type: DELETE_ALL_FROM_CART,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const addOneProductToCart = (productId, price) => {
   try {
      return async (dispatch, getState) => {
         const token = getState().auth.token;
         console.log(productId);
         const response = await fetch(
            `${HOST}:${PORT}/api/product/${productId}/add_to_cart/`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Token ${token}`,
               },
            }
         );

         dispatch({
            type: ADD_ONE_PRODUCT_TO_CART,
            productId,
            productPrice: price,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const addProductToCart = (productId, fullName, image, price) => {
   try {
      return async (dispatch, getState) => {
         const token = getState().auth.token;

         console.log(productId, "wrong");

         const response = await fetch(
            `${HOST}:${PORT}/api/product/${productId}/add_to_cart/`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Token ${token}`,
               },
            }
         );

         var resData = await response.json();

         dispatch({
            type: ADD_PRODUCT_TO_CART,
            productObject: {
               productId,
               fullName,
               image,
               price,
               owner: resData.user,
            },
         });
      };
   } catch (err) {
      throw err;
   }
};
