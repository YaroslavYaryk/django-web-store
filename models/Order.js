class Order {
   constructor(id, ownerId, cartId, placeId, place, postId, postDescription) {
      this.id = id;
      this.ownerId = ownerId;
      this.cartId = cartId;
      this.placeId = placeId;
      this.place = place;
      this.postId = postId;
      this.postDescription = postDescription;
   }
}
export default Order;
