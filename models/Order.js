class Order {
   constructor(
      id,
      ownerId,
      cartId,
      placeId,
      place,
      postId,
      postDescription,
      deliveryType = "Доставка до пункту видачі",
      priceMethod = 2
   ) {
      this.id = id;
      this.ownerId = ownerId;
      this.cartId = cartId;
      this.placeId = placeId;
      this.place = place;
      this.postId = postId;
      this.postDescription = postDescription;
      this.deliveryType = deliveryType;
      this.priceMethod = priceMethod;
   }
}
export default Order;
