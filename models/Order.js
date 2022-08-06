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
      priceMethod = 2,
      recieverFirstName = "",
      recieverLastName = "",
      recieverMiddleName = "",
      recieverPhone = "",
      coupones = [],
      totalPrice
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
      this.recieverFirstName = recieverFirstName;
      this.recieverLastName = recieverLastName;
      this.recieverMiddleName = recieverMiddleName;
      this.recieverPhone = recieverPhone;
      this.coupones = coupones;
      this.totalPrice = totalPrice;
   }
}
export default Order;
