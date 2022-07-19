const sortDate = (array) => {
   array.sort((a, b) => (a.date < b.date ? 1 : -1));
   return array;
};

const sortMostLiked = (array) => {
   array.sort((a, b) => (a.likesCount < b.likesCount ? 1 : -1));
   return array;
};

const sortPhotoVideo = (array) => {
   array.sort((a, b) => (a.photos.length < b.photos.length ? 1 : -1));
   return array;
};

const sortingDict = {
   date: sortDate,
   likesCount: sortMostLiked,
   photos: sortPhotoVideo,
};

export default sortingDict;
