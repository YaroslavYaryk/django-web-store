import { READ_USER_INFO, CHANGE_USER_INFO } from "../actions/userActions";
import User from "../../models/User";

const initialState = {
   user: {},
   token: null,
   userId: 1,
   didTryToLogin: false,
};

export default (state = initialState, action) => {
   switch (action.type) {
      case READ_USER_INFO:
         return {
            ...state,
            user: new User(
               action.id,
               action.email,
               action.username,
               action.firstName,
               action.lastName,
               action.middleName,
               action.livingPlace,
               action.phone
            ),
         };
      case CHANGE_USER_INFO:
         const usss = state.user;
         usss.firstName = action.firstName;
         usss.lastName = action.lastName;
         usss.middleName = action.middleName;
         usss.phone = action.phone;
         usss.livingPlace = action.livingPlace;
         console.log(state.user, usss);
         return {
            ...state,
            user: usss,
         };

      default:
         return state;
   }
};
