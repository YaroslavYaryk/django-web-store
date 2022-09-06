class ProductReply {
   constructor(id, commentId, comment, user, photos, rating, date) {
      this.id = id;
      this.commentId = commentId;
      this.comment = comment;
      this.photos = photos;
      this.rating = rating;
      this.user = user;
      this.date = date;
   }
}
export default ProductReply;
