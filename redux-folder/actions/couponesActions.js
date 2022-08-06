export const READ_COUPONES = "READ_COUPONES";
export const CHANGE_USER_INFO = "CHANGE_USER_INFO";
export const CHANGE_USER_LIVING_PLACE = "CHANGE_USER_LIVING_PLACE";
export const CHANGE_USER_WARE_HOUSE = "CHANGE_USER_WARE_HOUSE";
export const CHANGE_USER_DELIVERY_TYPE = "CHANGE_USER_DELIVERY_TYPE";

export const fetchCoupones = (userId) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: READ_COUPONES,
            coupones: [],
         });
      };
   } catch (err) {
      throw err;
   }
};
