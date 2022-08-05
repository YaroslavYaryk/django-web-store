class User {
   constructor(
      id,
      email,
      username,
      firstName,
      lastName = "",
      middleName = "",
      livingPlace = "",
      wareHouse = "",
      deliveryType = "",
      phone = ""
   ) {
      this.id = id;
      this.email = email;
      this.username = username;
      this.firstName = firstName;
      this.lastName = lastName;
      this.middleName = middleName;
      this.livingPlace = livingPlace;
      this.wareHouse = wareHouse;
      this.deliveryType = deliveryType;
      this.phone = phone;
   }
}
export default User;
