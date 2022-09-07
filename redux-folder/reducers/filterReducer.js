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

import {
   READ_BRANDS,
   READ_HARD_DRIVE,
   READ_MEMORY_SLOTS,
   READ_MEMORY_TYPE,
   READ_RAM,
   READ_OPER_SYSTEM,
   READ_PROCESSOR,
   READ_SCREEN_DIAGONAL,
   READ_SCREEN_TYPE,
   READ_VIDEO_CARD,
   READ_VIDEO_MEMORY,
} from "../actions/filterActions";

const initialState = {
   brands: brand,
   countries: country,
   hardDrives: hardDrive,
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
      case READ_BRANDS:
         return {
            ...state,
            brands: action.loadedBrands,
         };
      case READ_HARD_DRIVE:
         return {
            ...state,
            hardDrives: action.loadedHardDrive,
         };

      case READ_MEMORY_SLOTS:
         return {
            ...state,
            memorySlots: action.loadedMemSlots,
         };

      case READ_MEMORY_TYPE:
         return {
            ...state,
            memoryTypes: action.loadedMemTypes,
         };

      case READ_RAM:
         return {
            ...state,
            rams: action.loadedRam,
         };
      case READ_OPER_SYSTEM:
         return {
            ...state,
            operatSystems: action.loadedOperSystem,
         };
      case READ_PROCESSOR:
         return {
            ...state,
            processors: action.loadedProcessors,
         };
      case READ_SCREEN_DIAGONAL:
         return {
            ...state,
            screenDiagonals: action.loadedScDiagonals,
         };
      case READ_SCREEN_TYPE:
         return {
            ...state,
            screenTypes: action.loadedScTypes,
         };
      case READ_VIDEO_CARD:
         return {
            ...state,
            videoCards: action.loadedVCards,
         };
      case READ_VIDEO_MEMORY:
         return {
            ...state,
            videoMemories: action.loadedVMemory,
         };

      default:
         return state;
   }
};
