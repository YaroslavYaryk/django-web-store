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

      // case CREATE_PRODUCT:
      //   const newProduct = new Product(
      //     action.productData.id,
      //     action.productData.ownerId,
      //     action.productData.title,
      //     action.productData.imageUrl,
      //     action.productData.description,
      //     action.productData.price
      //   );
      //   return {
      //     ...state,
      //     availableProducts: state.availableProducts.concat(newProduct),
      //     userProducts: state.userProducts.concat(newProduct),
      //   };
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

export default productCharacteristicReducer;
