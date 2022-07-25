export const DELETE_CART = "DELETE_CART";
export const CREATE_CART = "CREATE_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";
export const READ_CART = "READ_CART";
export const DELETE_PRODUCT_FROM_CART = "DELETE_PRODUCT_FROM_CART";
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";

import CART from "../../data/cart";

export const fetchCart = () => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: READ_CART,
            cartProducts: CART,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const deleteProductFromCart = (productId, productPrice) => {
   try {
      return async (dispatch, getState) => {
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

export const deleteAllFromCart = () => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: DELETE_ALL_FROM_CART,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const addProductToCart = (productId, fullName, image, price) => {
   console.log(productId);
   try {
      const owner = "14";

      return async (dispatch, getState) => {
         dispatch({
            type: ADD_PRODUCT_TO_CART,
            productObject: {
               productId,
               fullName,
               image,
               price,
               owner,
            },
         });
      };
   } catch (err) {
      throw err;
   }
};
