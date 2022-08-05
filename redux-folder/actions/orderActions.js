export const ADD_BASE_INFO_TO_ORDER = "ADD_BASE_INFO_TO_ORDER";
export const ADD_PLACE_TO_ORDER = "ADD_PLACE_TO_ORDER";
export const ADD_WARE_HOUSE_TO_ORDER = "ADD_WARE_HOUSE_TO_ORDER";
export const ADD_DELIVERY_TYPE_TO_ORDER = "ADD_DELIVERY_TYPE_TO_ORDER";
export const DISCARD_ORDER = "DISCARD_ORDER";
export const CHANGE_PAYMENT_METHOD = "CHANGE_pAYMENT_METHOD";
export const ADD_RECIEVER_INFO = "ADD_RECIEVER_INFO";

export const createOrder = (ownerId, cartId) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: ADD_BASE_INFO_TO_ORDER,
            id: 1,
            ownerId,
            cartId,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const addPlaceToOrder = (cartId, placeId, place) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: ADD_PLACE_TO_ORDER,
            cartId,
            placeId,
            place,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const addWareHouse = (cartId, wareHouse, wareHouseId, CityRef = 0) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: ADD_WARE_HOUSE_TO_ORDER,
            cartId,
            wareHouse,
            wareHouseId,
            CityRef,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const addDeliveryType = (cartId, deliveryType) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: ADD_DELIVERY_TYPE_TO_ORDER,
            cartId,
            deliveryType,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const changePaymentMethod = (cartId, paymentMethodKod) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: CHANGE_PAYMENT_METHOD,
            cartId,
            paymentMethodKod,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const discartOrder = (cartId) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: DISCARD_ORDER,
            cartId,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const addRecieverInfo = (
   cartId,
   lastName,
   firstName,
   middleName,
   phone
) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: ADD_RECIEVER_INFO,
            cartId,
            recieverFirstName: firstName,
            recieverLastName: lastName,
            recieverMiddleName: middleName,
            recieverPhone: phone,
         });
      };
   } catch (err) {
      throw err;
   }
};
