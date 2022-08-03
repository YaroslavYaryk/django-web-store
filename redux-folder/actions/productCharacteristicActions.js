export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const READ_CHARACTERISTIC = "READ_CHARACTERISTIC";

export const fetchproductCharacteristic = () => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: READ_CHARACTERISTIC,
            characteristic: [],
         });
      };
   } catch (err) {
      throw err;
   }
};
