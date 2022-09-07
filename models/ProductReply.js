class ProductReply {
   constructor(id, commentId, comment, user, photos, rating, likesCount, date) {
      this.id = id;
      this.commentId = commentId;
      this.comment = comment;
      this.photos = photos;
      this.rating = rating;
      this.user = user;
      this.likesCount = likesCount;
      this.date = date;
   }
}
export default ProductReply;
