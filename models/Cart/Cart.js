class Cart {
   constructor(id, owner, total_products, total_price, products) {
      this.id = id;
      this.owner = owner;
      this.totalProducts = total_products;
      this.totalPrice = total_price;
      this.products = products;
   }
}
export default Cart;
