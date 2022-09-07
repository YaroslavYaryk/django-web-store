import { HOST, PORT } from "../../constants/server";
import Brand from "../../models/Filter/Brand";
import HardDrive from "../../models/Filter/HardDrive";
import MemorySlots from "../../models/Filter/MemorySlots";
import MemoryType from "../../models/Filter/MemoryType";
import Ram from "../../models/Filter/Ram";
import OperatSystem from "../../models/Filter/OperatSystem";
import Processor from "../../models/Filter/Processor";
import ScreenDiagonal from "../../models/Filter/ScreenDiagonal";
import ScreenType from "../../models/Filter/ScreenType";
import VideoCard from "../../models/Filter/VideoCard";
import VideoMemory from "../../models/Filter/VideoMemory";

export const READ_BRANDS = "READ_BRANDS";
export const READ_HARD_DRIVE = "READ_HARD_DRIVE";
export const READ_MEMORY_SLOTS = "READ_MEMORY_SLOTS";
export const READ_MEMORY_TYPE = "READ_MEMORY_TYPE";
export const READ_RAM = "READ_RAM";
export const READ_OPER_SYSTEM = "READ_OPER_SYSTEM";
export const READ_PROCESSOR = "READ_PROCESSOR";
export const READ_SCREEN_DIAGONAL = "READ_SCREEN_DIAGONAL";
export const READ_SCREEN_TYPE = "READ_SCREEN_TYPE";
export const READ_VIDEO_CARD = "READ_VIDEO_CARD";
export const READ_VIDEO_MEMORY = "READ_VIDEO_MEMORY";

export const fetchBrands = () => {
   try {
      return async (dispatch, getState) => {
         const userId = getState();

         const response = await fetch(
            `${HOST}:${PORT}/api/product/characteristics/brand/get_all/`
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();
         const loadedBrands = [];
         for (const key in resData) {
            loadedBrands.push(
               new Brand(
                  resData[key].id,
                  resData[key].name,
                  resData[key].slug,
                  resData[key].description
               )
            );
         }

         dispatch({
            type: READ_BRANDS,
            loadedBrands: loadedBrands,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const fetchHardDrive = () => {
   try {
      return async (dispatch, getState) => {
         const userId = getState();

         const response = await fetch(
            `${HOST}:${PORT}/api/product/characteristics/memory/get_data_storage/`
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();
         const loadedHardDrive = [];
         for (const key in resData) {
            loadedHardDrive.push(
               new HardDrive(
                  resData[key].id,
                  resData[key].hard_drive_capacity,
                  resData[key].hard_drive_type,
                  resData[key].slug
               )
            );
         }

         dispatch({
            type: READ_HARD_DRIVE,
            loadedHardDrive: loadedHardDrive,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const fetchMemorySlots = () => {
   try {
      return async (dispatch, getState) => {
         const userId = getState();

         const response = await fetch(
            `${HOST}:${PORT}/api/product/characteristics/memory/get_ram_slot/`
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();
         const loadedMemSlots = [];
         for (const key in resData) {
            loadedMemSlots.push(
               new MemorySlots(
                  resData[key].id,
                  resData[key].number_of_slots,
                  resData[key].slug,
                  null
               )
            );
         }

         dispatch({
            type: READ_MEMORY_SLOTS,
            loadedMemSlots: loadedMemSlots,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const fetchMemoryType = () => {
   try {
      return async (dispatch, getState) => {
         const userId = getState();

         const response = await fetch(
            `${HOST}:${PORT}/api/product/characteristics/memory/get_ram_type/`
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();
         const loadedMemTypes = [];
         for (const key in resData) {
            loadedMemTypes.push(
               new MemoryType(
                  resData[key].id,
                  resData[key].name,
                  resData[key].slug,
                  resData[key].description
               )
            );
         }

         dispatch({
            type: READ_MEMORY_TYPE,
            loadedMemTypes: loadedMemTypes,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const fetchRam = () => {
   try {
      return async (dispatch, getState) => {
         const userId = getState();

         const response = await fetch(
            `${HOST}:${PORT}/api/product/characteristics/memory/get_ram_capacity/`
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();
         const loadedRam = [];
         for (const key in resData) {
            loadedRam.push(
               new Ram(
                  resData[key].id,
                  resData[key].number_of_gigabite,
                  resData[key].slug
               )
            );
         }

         dispatch({
            type: READ_RAM,
            loadedRam: loadedRam,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const fetchOperSystem = () => {
   try {
      return async (dispatch, getState) => {
         const userId = getState();

         const response = await fetch(
            `${HOST}:${PORT}/api/product/characteristics/processor/get_oper_system/`
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();
         const loadedOperSystem = [];
         for (const key in resData) {
            loadedOperSystem.push(
               new OperatSystem(
                  resData[key].id,
                  resData[key].name,
                  resData[key].slug,
                  resData[key].description
               )
            );
         }

         dispatch({
            type: READ_OPER_SYSTEM,
            loadedOperSystem: loadedOperSystem,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const fetchProcessors = () => {
   try {
      return async (dispatch, getState) => {
         const userId = getState();

         const response = await fetch(
            `${HOST}:${PORT}/api/product/characteristics/processor/get_processor/`
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();
         const loadedProcessors = [];
         for (const key in resData) {
            loadedProcessors.push(
               new Processor(
                  resData[key].id,
                  resData[key].name,
                  resData[key].slug,
                  resData[key].description
               )
            );
         }

         dispatch({
            type: READ_PROCESSOR,
            loadedProcessors: loadedProcessors,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const fetchScreenDiagonals = () => {
   try {
      return async (dispatch, getState) => {
         const userId = getState();

         const response = await fetch(
            `${HOST}:${PORT}/api/product/characteristics/screen/get_screen_diagonal/`
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();
         const loadedScDiagonals = [];
         for (const key in resData) {
            loadedScDiagonals.push(
               new ScreenDiagonal(
                  resData[key].id,
                  resData[key].name,
                  resData[key].slug
               )
            );
         }

         dispatch({
            type: READ_SCREEN_DIAGONAL,
            loadedScDiagonals: loadedScDiagonals,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const fetchScreenTypes = () => {
   try {
      return async (dispatch, getState) => {
         const userId = getState();

         const response = await fetch(
            `${HOST}:${PORT}/api/product/characteristics/screen/get_screen_type/`
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();
         const loadedScTypes = [];
         for (const key in resData) {
            loadedScTypes.push(
               new ScreenType(
                  resData[key].id,
                  resData[key].name,
                  resData[key].slug,
                  resData[key].description
               )
            );
         }

         dispatch({
            type: READ_SCREEN_TYPE,
            loadedScTypes: loadedScTypes,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const fetchVideoCard = () => {
   try {
      return async (dispatch, getState) => {
         const userId = getState();

         const response = await fetch(
            `${HOST}:${PORT}/api/product/characteristics/video-card/get_card/`
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();
         const loadedVCards = [];
         for (const key in resData) {
            loadedVCards.push(
               new VideoCard(
                  resData[key].id,
                  resData[key].video_card,
                  resData[key].slug,
                  resData[key].description
               )
            );
         }

         dispatch({
            type: READ_VIDEO_CARD,
            loadedVCards: loadedVCards,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const fetchVideoMemory = () => {
   try {
      return async (dispatch, getState) => {
         const userId = getState();

         const response = await fetch(
            `${HOST}:${PORT}/api/product/characteristics/video-card/get_memory/`
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();
         const loadedVMemory = [];
         for (const key in resData) {
            loadedVMemory.push(
               new VideoMemory(
                  resData[key].id,
                  resData[key].video_card_capacity,
                  resData[key].slug
               )
            );
         }

         dispatch({
            type: READ_VIDEO_MEMORY,
            loadedVMemory: loadedVMemory,
         });
      };
   } catch (err) {
      throw err;
   }
};
