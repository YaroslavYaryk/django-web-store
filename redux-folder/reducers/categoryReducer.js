import CATEGORIES from "../../data/categories";

const initialState = {
   categories: CATEGORIES,
};

export default (state = initialState, action) => {
   switch (action.type) {
      default:
         return state;
   }
};
