import {
   READ_CART,
   DELETE_PRODUCT_FROM_CART,
   DELETE_ALL_FROM_CART,
   ADD_PRODUCT_TO_CART,
} from "../actions/cart";
import CART from "../../data/cart";
import CartItem from "../../models/Cart/CartItem";
import Cart from "../../models/Cart/Cart";

const initialState = {
   cartProducts: {},
};
// import Product from "../../models/Product";

const cartReducer = (state = initialState, action) => {
   switch (action.type) {
      case READ_CART:
         return {
            cartProducts: action.cartProducts,
         };

      case DELETE_PRODUCT_FROM_CART:
         const cart_products = state.cartProducts.products.filter(
            (product) => product.productId !== action.productId
         );
         const cart = state.cartProducts;
         cart.products = cart_products;
         cart.totalProducts -= 1;
         cart.totalPrice -= action.productPrice;
         console.log(cart);
         return {
            ...state,
            cartProducts: cart,
         };
      case DELETE_ALL_FROM_CART:
         const newCart = state.cartProducts;
         newCart.products = [];
         newCart.totalProducts = 0;
         newCart.totalPrice = 0;
         return {
            ...state,
            cartProducts: newCart,
         };
      case ADD_PRODUCT_TO_CART:
         var cartObj1;
         const newProduct = new CartItem(
            action.productObject.productId,
            action.productObject.fullName,
            1,
            action.productObject.image,
            action.productObject.price
         );
         if (state.cartProducts.length) {
            cartObj1 = state.cartProducts;

            const prodInCart = cartObj1.products.find(
               (el) => el.productId == action.productObject.productId
            );

            if (prodInCart) {
               const productIndex = cartObj1.products.findIndex(
                  (prod) => prod.productId === action.productObject.productId
               );
               const ProductItem = cartObj1.products[productIndex];
               ProductItem.count += 1;
               cartObj1.products[productIndex] = ProductItem;
            } else {
               cartObj1.products.push(newProduct);
               cartObj1.totalProducts += 1;
            }
            cartObj1.totalPrice += action.productObject.price;
         } else {
            cartObj1 = new Cart(
               Math.random() * (100000000000000 - 3) + 3,
               action.productObject.owner,
               1,
               action.productObject.price,
               newProduct
            );
         }
         return {
            ...state,
            cartProducts: cartObj1,
         };
   }
   return state;
};

export default cartReducer;
