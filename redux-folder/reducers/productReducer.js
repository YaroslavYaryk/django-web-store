import PRODUCTS from "../../data/products";
import {
   //   CREATE_PRODUCT_REVIEWS,
   //   UPDATE_PRODUCT,
   READ_CHARACTERISTIC_PRODUCT,
   READ_PRODUCT,
   SEARCH_PRODUCTS,
   SORT_PRODUCTS,
} from "../actions/productActions";
import productSorting from "../../constants/productSorting";

const initialState = {
   products: PRODUCTS,
   searchProducts: [],
   characteristicProducts: [],
};
// import Product from "../../models/Product";

const productReducer = (state = initialState, action) => {
   switch (action.type) {
      case READ_PRODUCT:
         return {
            ...state,
            products: action.products,
         };
      case READ_CHARACTERISTIC_PRODUCT:
         return {
            ...state,
            characteristicProducts: action.characteristicProducts,
         };
      case SEARCH_PRODUCTS:
         if (action.word == "all") {
            var new_prods = state.products;
         } else {
            var new_prods = state.products.filter((elem) =>
               elem.name.toLowerCase().includes(action.word.toLowerCase())
            );
         }
         return {
            ...state,
            searchProducts: new_prods,
         };

      case SORT_PRODUCTS:
         return {
            ...state,
            searchProducts: productSorting[action.orderMethod](
               state.searchProducts
            ),
            products: productSorting[action.orderMethod](state.products),
         };
   }
   return state;
};

export default productReducer;
