import Cart from "../models/Cart/Cart";
import CartItem from "../models/Cart/CartItem";

const CART = new Cart(7, 14, 2, 162996, [
   new CartItem(
      1,
      "Google pixel 5 8/128 A15-5G Black",
      2,
      "https://cdn11.bigcommerce.com/s-ss31ap/images/stencil/1280x1280/products/7739/27700/41oKylGa%25252ByL__23085.1630999913.jpg?c=2",
      21500
   ),
   new CartItem(
      2,
      "Ноутбук Acer Aspire 7 A715-42G-R0VS (NH.QBFEU.00A) Charcoal Black",
      4,
      "https://content.rozetka.com.ua/goods/images/big/163386254.jpg",
      29999
   ),
]);

export default CART;
