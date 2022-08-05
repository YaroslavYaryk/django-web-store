import PRODUCTS from "../../data/products";
import {
   //   CREATE_PRODUCT_REVIEWS,
   //   UPDATE_PRODUCT,
   //   DELETE_PRODUCT,
   READ_PRODUCT,
   SEARCH_PRODUCTS,
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
      case SEARCH_PRODUCTS:
         var new_prods = state.products.filter((elem) =>
            elem.name.toLowerCase().includes(action.word.toLowerCase())
         );
         return {
            products: new_prods,
         };
   }
   return state;
};

export default productReducer;
