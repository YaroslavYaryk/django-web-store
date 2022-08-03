class User {
   constructor(
      id,
      email,
      username,
      firstName,
      lastName = "",
      middleName = "",
      livingPlace = "",
      phone = ""
   ) {
      this.id = id;
      this.email = email;
      this.username = username;
      this.firstName = firstName;
      this.lastName = lastName;
      this.middleName = middleName;
      this.livingPlace = livingPlace;
      this.phone = phone;
   }
}
export default User;
