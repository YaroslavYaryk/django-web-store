export const READ_USER_INFO = "READ_USER_INFO";
export const CHANGE_USER_INFO = "CHANGE_USER_INFO";
export const CHANGE_USER_LIVING_PLACE = "CHANGE_USER_LIVING_PLACE";
export const CHANGE_USER_WARE_HOUSE = "CHANGE_USER_WARE_HOUSE";
export const CHANGE_USER_DELIVERY_TYPE = "CHANGE_USER_DELIVERY_TYPE";

export const fetchUserInfo = (userId) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: READ_USER_INFO,
            email: "duhanov2003@gmail.com",
            firstName: "Ярослав",
            id: userId,
            lastName: "Диханов ",
            livingPlace: "Володимирець",
            wareHouse: "Відділення №1: вул. Повстанців, 68",
            middleName: "Юрійович ",
            deliveryType: "Доставка до пункту видачі",
            phone: "+38073737383",
            username: "yaryk31",
         });
      };
   } catch (err) {
      throw err;
   }
};

export const changeUserInfo = (
   userId,
   firstName,
   lastName,
   middleName,
   phone,
   livingPlace
) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: CHANGE_USER_INFO,
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            livingPlace: livingPlace,
            phone: phone,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const changeUserLivingPlace = (userId, livingPlace) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: CHANGE_USER_LIVING_PLACE,
            livingPlace: livingPlace,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const changeUserWareHouse = (userId, wareHouse) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: CHANGE_USER_WARE_HOUSE,
            wareHouse: wareHouse,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const changeUserDeliveryType = (userId, deliveryType) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: CHANGE_USER_DELIVERY_TYPE,
            deliveryType: deliveryType,
         });
      };
   } catch (err) {
      throw err;
   }
};
