export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const READ_PRODUCT = "READ_PRODUCT";

export const fetchEvents = () => {
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
