class ProductReview {
   constructor(
      id,
      productId,
      user,
      photos,
      comment,
      pros,
      cons,
      rating,
      date,
      likesCount,
      replies
   ) {
      this.id = id;
      this.productId = productId;
      this.user = user;
      this.photos = photos;
      this.comment = comment;
      this.pros = pros;
      this.cons = cons;
      this.rating = rating;
      this.date = date;
      this.likesCount = likesCount;
      this.replies = replies;
   }
}
export default ProductReview;
