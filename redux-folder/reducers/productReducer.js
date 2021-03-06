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

      // case UPDATE_PRODUCT:
      //   const productIndex = state.userProducts.findIndex(
      //     (prod) => prod.id === action.productId
      //   );
      //   const updatedProduct = new Product(
      //     action.productId,
      //     state.userProducts[productIndex].ownerId,
      //     action.productData.title,
      //     action.productData.imageUrl,
      //     action.productData.description,
      //     state.userProducts[productIndex].price
      //   );
      //   const updatedUserProducts = [...state.userProducts];
      //   updatedUserProducts[productIndex] = updatedProduct;
      //   const availableProductIndex = state.availableProducts.findIndex(
      //     (prod) => prod.id === action.pid
      //   );
      //   const updatedAvailableProducts = [...state.availableProducts];
      //   updatedAvailableProducts[availableProductIndex] = updatedProduct;
      //   return {
      //     ...state,
      //     availableProducts: updatedAvailableProducts,
      //     userProducts: updatedUserProducts,
      //   };
      // case DELETE_PRODUCT:
      //   return {
      //     ...state,
      //     userProducts: state.userProducts.filter(
      //       (product) => product.id !== action.productId
      //     ),
      //     availableProducts: state.availableProducts.filter(
      //       (product) => product.id !== action.productId
      //     ),
      //   };
   }
   return state;
};

export default productReducer;
