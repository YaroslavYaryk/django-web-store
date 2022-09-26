export const FETCH_ORDERS = "FETCH_ORDERS";
export const ADD_BASE_INFO_TO_ORDER = "ADD_BASE_INFO_TO_ORDER";
export const ADD_PLACE_TO_ORDER = "ADD_PLACE_TO_ORDER";
export const ADD_WARE_HOUSE_TO_ORDER = "ADD_WARE_HOUSE_TO_ORDER";
export const ADD_DELIVERY_TYPE_TO_ORDER = "ADD_DELIVERY_TYPE_TO_ORDER";
export const DISCARD_ORDER = "DISCARD_ORDER";
export const CHANGE_PAYMENT_METHOD = "CHANGE_pAYMENT_METHOD";
export const ADD_RECIEVER_INFO = "ADD_RECIEVER_INFO";
export const ADD_ORDER_COUPON = "ADD_ORDER_COUPON";
export const ADD_ORDER_TOTAL_PRICE = "ADD_ORDER_TOTAL_PRICE";
import { HOST, PORT } from "../../constants/server";

export const fetchOrders = (ownerId, cartId) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: FETCH_ORDERS,
            cartId,
            orders: [],
         });
      };
   } catch (err) {
      throw err;
   }
};

export const createOrder = (ownerId, cartId) => {
   try {
      return async (dispatch, getState) => {
         const token = getState().auth.token;
         const response = fetch(`${HOST}:${PORT}/api/orders/add/`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*",
               Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
               cart: cartId,
            }),
         });
         console.log("create order");
         dispatch({
            type: ADD_BASE_INFO_TO_ORDER,
            id: Math.random(),
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
      return (dispatch, getState) => {
         const token = getState().auth.token;
         const response = fetch(`${HOST}:${PORT}/api/orders/add_place/`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*",
               Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
               cart: cartId,
               place_id: placeId,
               place: place,
            }),
         });

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

export const addOrderTotalPrice = (cartId, totalPrice) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: ADD_ORDER_TOTAL_PRICE,
            cartId,
            totalPrice,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const addWareHouse = (cartId, wareHouse, wareHouseId, CityRef = 0) => {
   try {
      return async (dispatch, getState) => {
         const token = getState().auth.token;
         const response = fetch(`${HOST}:${PORT}/api/orders/add_warehouse/`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*",
               Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
               cart: cartId,
               ware_house: wareHouse,
            }),
         });
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
         const token = getState().auth.token;
         const response = fetch(
            `${HOST}:${PORT}/api/orders/add_delivery_type/`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Token ${token}`,
               },
               body: JSON.stringify({
                  cart: cartId,
                  delivery_type: deliveryType,
               }),
            }
         );

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

export const addOrderCoupon = (cartId, coupon) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: ADD_ORDER_COUPON,
            cartId,
            coupon,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const discartOrder = (cartId) => {
   try {
      return async (dispatch, getState) => {
         const token = getState().auth.token;
         const response = await fetch(
            `${HOST}:${PORT}/api/orders/discard/${cartId}/`,
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
