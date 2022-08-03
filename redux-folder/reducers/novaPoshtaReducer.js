import { READ_CITIES, READ_CITY_POSTS } from "../actions/novaPoshtaActions";

const initialState = {
   cities: [],
   cityWareHouses: [],
};

const novaPoshtaReducer = (state = initialState, action) => {
   switch (action.type) {
      case READ_CITIES:
         if (action.cities) {
            if (action.cities[0]) {
               console.log("here1");
               return { ...state, cities: action.cities[0].data };
            } else {
               return { ...state, cities: action.cities.data };
            }
         }
         return {
            cities: { cities: [] },
         };

      case READ_CITY_POSTS:
         if (action.cityWareHouses) {
            return { ...state, cityWareHouses: action.cityWareHouses.data };
         }
   }
   return state;
};

export default novaPoshtaReducer;
