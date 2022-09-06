import CATEGORIES from "../../data/categories";
import { READ_CATEGORIES } from "../actions/categoryActions";
const initialState = {
   categories: CATEGORIES,
};

export default (state = initialState, action) => {
   switch (action.type) {
      case READ_CATEGORIES:
         return {
            ...state,
            categories: action.loadedCategories,
         };

      default:
         return state;
   }
};
