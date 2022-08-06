import COUPONES from "../../data/coupones";
import { READ_COUPONES } from "../actions/couponesActions";

const initialState = {
   coupones: COUPONES,
};

export default (state = initialState, action) => {
   switch (action.type) {
      case READ_COUPONES:
         return {
            coupones: action.coupones,
         };

      default:
         return state;
   }
};
