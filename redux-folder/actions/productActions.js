export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
export const READ_PRODUCT = "READ_PRODUCT";
export const SORT_PRODUCTS = "SORT_PRODUCTS";

export const fetchProducts = () => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: READ_PRODUCT,
            products: [],
         });
      };
   } catch (err) {
      throw err;
   }
};

export const SearchProducts = (word) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: SEARCH_PRODUCTS,
            products: [],
            word,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const sortProducts = (orderMethod, array) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: SORT_PRODUCTS,
            orderMethod: orderMethod,
         });
      };
   } catch (err) {
      throw err;
   }
};
