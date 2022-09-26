import { HOST, PORT } from "../../constants/server";
export const READ_USER_INFO = "READ_USER_INFO";
export const CHANGE_USER_INFO = "CHANGE_USER_INFO";
export const CHANGE_USER_LIVING_PLACE = "CHANGE_USER_LIVING_PLACE";
export const CHANGE_USER_WARE_HOUSE = "CHANGE_USER_WARE_HOUSE";
export const CHANGE_USER_DELIVERY_TYPE = "CHANGE_USER_DELIVERY_TYPE";
export const EDIT_USER_BASE_INFO = "EDIT_USER_BASE_INFO";

export const fetchUserInfo = (userId) => {
   try {
      return async (dispatch, getState) => {
         var token = getState().auth.token;
         const response = await fetch(
            `${HOST}:${PORT}/users/api/user_profile/`,
            {
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
            type: READ_USER_INFO,
            email: resData.email,
            firstName: resData.first_name,
            id: resData.id,
            lastName: resData.last_name,
            livingPlace: resData.living_place,
            wareHouse: resData.ware_house,
            middleName: resData.middle_name,
            deliveryType: resData.delivery_type,
            phone: resData.phone,
            username: resData.username,
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

export const editUserBaseInfo = (
   email,
   firstName,
   lastName,
   middleName,
   phone
) => {
   try {
      return async (dispatch, getState) => {
         var token = getState().auth.token;
         const response = await fetch(
            `${HOST}:${PORT}/users/api/user_base_edit/`,
            {
               method: "PUT",
               headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Token ${token}`,
               },
               body: JSON.stringify({
                  email: email,
                  first_name: firstName,
                  last_name: lastName,
                  middle_name: middleName,
                  phone: phone,
               }),
            }
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         dispatch({
            type: EDIT_USER_BASE_INFO,
            email: email,
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            phone: phone,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const changeUserLivingPlace = (livingPlace) => {
   try {
      return async (dispatch, getState) => {
         var token = getState().auth.token;

         const response = await fetch(
            `${HOST}:${PORT}/users/api/edit_living_place/`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Token ${token}`,
               },
               body: JSON.stringify({
                  living_place: livingPlace,
               }),
            }
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         dispatch({
            type: CHANGE_USER_LIVING_PLACE,
            livingPlace: livingPlace,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const changeUserWareHouse = (wareHouse) => {
   try {
      return async (dispatch, getState) => {
         var token = getState().auth.token;

         const response = await fetch(
            `${HOST}:${PORT}/users/api/edit_warehouse/`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Token ${token}`,
               },
               body: JSON.stringify({
                  ware_house: wareHouse,
               }),
            }
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         dispatch({
            type: CHANGE_USER_WARE_HOUSE,
            wareHouse: wareHouse,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const changeUserDeliveryType = (deliveryType) => {
   try {
      return async (dispatch, getState) => {
         var token = getState().auth.token;

         const response = await fetch(
            `${HOST}:${PORT}/users/api/edit_delivery_type/`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Token ${token}`,
               },
               body: JSON.stringify({
                  delivery_type: deliveryType,
               }),
            }
         );
         console.log(deliveryType);

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         dispatch({
            type: CHANGE_USER_DELIVERY_TYPE,
            deliveryType: deliveryType,
         });
      };
   } catch (err) {
      throw err;
   }
};
