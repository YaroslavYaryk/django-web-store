import brand from "../../data/Filter/brand";
import country from "../../data/Filter/country";
import hardDrive from "../../data/Filter/hardDrive";
import memorySlots from "../../data/Filter/memorySlots";
import memoryType from "../../data/Filter/memoryType";
import operatSystem from "../../data/Filter/operatSystem";
import processors from "../../data/Filter/processors";
import ram from "../../data/Filter/ram";
import screenDiagonals from "../../data/Filter/screenDiagonals";
import screenTypes from "../../data/Filter/screenTypes";
import videoCard from "../../data/Filter/videoCards";
import videoMemory from "../../data/Filter/videoMemories";

const initialState = {
   brands: brand,
   countries: country,
   handDrives: hardDrive,
   memorySlots: memorySlots,
   memoryTypes: memoryType,
   operatSystems: operatSystem,
   processors: processors,
   rams: ram,
   screenDiagonals: screenDiagonals,
   screenTypes: screenTypes,
   videoCards: videoCard,
   videoMemories: videoMemory,
};

export default (state = initialState, action) => {
   switch (action.type) {
      default:
         return state;
   }
};
