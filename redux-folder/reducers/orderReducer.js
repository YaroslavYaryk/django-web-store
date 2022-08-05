import {
   ADD_BASE_INFO_TO_ORDER,
   ADD_PLACE_TO_ORDER,
   DISCARD_ORDER,
   ADD_WARE_HOUSE_TO_ORDER,
   ADD_DELIVERY_TYPE_TO_ORDER,
   CHANGE_PAYMENT_METHOD,
   ADD_RECIEVER_INFO,
} from "../actions/orderActions";
import Order from "../../models/Order";

const initialState = {
   orders: [],
};

const orderReducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_BASE_INFO_TO_ORDER:
         const orderInstance = new Order(
            action.id,
            action.ownerId,
            action.cartId,
            "",
            "",
            ""
         );
         return {
            orders: state.orders.concat(orderInstance),
         };
      case ADD_PLACE_TO_ORDER:
         var orderInstance2 = state.orders;
         const orderIndex = orderInstance2.findIndex(
            (el) => el.cartId === action.cartId
         );
         const OrderItem = orderInstance2[orderIndex];
         OrderItem.placeId = action.placeId;
         OrderItem.place = action.place;

         orderInstance2[orderIndex] = OrderItem;
         // console.log(orderInstance2);
         return {
            orders: orderInstance2,
         };

      case ADD_WARE_HOUSE_TO_ORDER:
         var orderInstance3 = state.orders;
         const orderIndex2 = orderInstance3.findIndex(
            (el) => el.cartId === action.cartId
         );
         const OrderItem2 = orderInstance3[orderIndex2];
         OrderItem2.postId = action.wareHouseId;
         OrderItem2.postDescription = action.wareHouse;
         if (action.CityRef) {
            OrderItem2.placeId = action.CityRef;
         }

         orderInstance3[orderIndex2] = OrderItem2;
         return {
            ...state,
            orders: orderInstance3,
         };

      case ADD_DELIVERY_TYPE_TO_ORDER:
         var orderInstance3 = state.orders;
         const orderIndex3 = orderInstance3.findIndex(
            (el) => el.cartId === action.cartId
         );
         const OrderItem3 = orderInstance3[orderIndex3];
         OrderItem3.postId = action.wareHouseId;
         OrderItem3.postDescription = action.wareHouse;
         if (action.CityRef) {
            OrderItem3.placeId = action.CityRef;
         }

         orderInstance3[orderIndex3] = OrderItem3;
         return {
            ...state,
            orders: orderInstance3,
         };

      case CHANGE_PAYMENT_METHOD:
         var orderInstance3 = state.orders;
         const orderIndex4 = orderInstance3.findIndex(
            (el) => el.cartId === action.cartId
         );
         const OrderItem4 = orderInstance3[orderIndex4];
         OrderItem4.priceMethod = action.paymentMethodKod;

         orderInstance3[orderIndex4] = OrderItem4;
         return {
            ...state,
            orders: orderInstance3,
         };
      case ADD_RECIEVER_INFO:
         var orderInstance3 = state.orders;
         const orderIndex5 = orderInstance3.findIndex(
            (el) => el.cartId === action.cartId
         );
         const OrderItem5 = orderInstance3[orderIndex5];
         OrderItem5.recieverFirstName = action.recieverFirstName;
         OrderItem5.recieverLastName = action.recieverLastName;
         OrderItem5.recieverMiddleName = action.recieverMiddleName;
         OrderItem5.recieverPhone = action.recieverPhone;

         orderInstance3[orderIndex5] = OrderItem5;
         return {
            ...state,
            orders: orderInstance3,
         };

      case DISCARD_ORDER:
         var orderInstance3 = state.orders;

         const newOrders = orderInstance3.filter(
            (elem) => elem.cartId !== action.cartId
         );

         return {
            orders: newOrders,
         };
   }
   return state;
};

export default orderReducer;
