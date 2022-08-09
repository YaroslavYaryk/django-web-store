const sortDate = (array) => {
   array.sort((a, b) => (a.date < b.date ? 1 : -1));
   return array;
};

const sortPriceUp = (array) => {
   array.sort((a, b) => (a.price > b.price ? 1 : -1));
   return array;
};

const sortPriceDown = (array) => {
   array.sort((a, b) => (a.price < b.price ? 1 : -1));
   return array;
};

const sortCommentMax = (array) => {
   array.sort((a, b) => (a.commentCount < b.commentCount ? 1 : -1));
   return array;
};

const productSorting = {
   date: sortDate,
   priceUp: sortPriceUp,
   priceDown: sortPriceDown,
   commentMax: sortCommentMax,
};

export default productSorting;
