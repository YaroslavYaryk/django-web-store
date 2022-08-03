import PRODUCTS from "../../data/products";
import {
   //   CREATE_PRODUCT_REVIEWS,
   //   UPDATE_PRODUCT,
   //   DELETE_PRODUCT,
   READ_PRODUCT,
} from "../actions/productActions";

const initialState = {
   products: PRODUCTS,
};
// import Product from "../../models/Product";

const productReducer = (state = initialState, action) => {
   switch (action.type) {
      case READ_PRODUCT:
         return {
            products: action.products,
         };
   }
   return state;
};

export default productReducer;
