const getCommentId = (commentArray, replyId) => {
   console.log(replyId);
   for (var i = 0; i < commentArray.length; i++) {
      console.log(commentArray[i].replies);
      for (var j = 0; j < commentArray[i].replies.length; j++) {
         if (commentArray[i].replies[j].id == replyId) {
            return commentArray[i].id;
         }
      }
   }
};

export default getCommentId;
