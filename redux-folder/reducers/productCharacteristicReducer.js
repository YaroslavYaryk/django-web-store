import PRODUCT_CHARACTERISTIC from "../../data/productCharacteristic";
import {
   //   CREATE_PRODUCT,
   //   UPDATE_PRODUCT,
   //   DELETE_PRODUCT,
   READ_CHARACTERISTIC,
} from "../actions/productActions";

const initialState = {
   characteristics: PRODUCT_CHARACTERISTIC,
};
// import Product from "../../models/Product";

const productCharacteristicReducer = (state = initialState, action) => {
   switch (action.type) {
      case READ_CHARACTERISTIC:
         return {
            characteristics: action.characteristic,
         };
   }
   return state;
};

export default productCharacteristicReducer;
