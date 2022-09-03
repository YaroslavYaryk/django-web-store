import { HOST, PORT } from "../../constants/server";
import Ram from "../../models/Filter/Ram";
import OperatSystem from "../../models/Filter/OperatSystem";
import VideoCard from "../../models/Filter/VideoCard";
import VideoMemory from "../../models/Filter/VideoMemory";
import Processor from "../../models/Filter/Processor";
import ScreenType from "../../models/Filter/ScreenType";
import ScreenDiagonal from "../../models/Filter/ScreenDiagonal";
import ScreenFrequency from "../../models/Filter/ScreenFrequency";
import ProductCharacteristic from "../../models/ProductCharacteristic";
import HardDriveCapacity from "../../models/Filter/HardDriveCapacity";
import MemoryType from "../../models/Filter/MemoryType";
import MemorySlots from "../../models/Filter/MemorySlots";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const READ_CHARACTERISTIC = "READ_CHARACTERISTIC";

export const fetchproductCharacteristic = (productId) => {
   try {
      return async (dispatch, getState) => {
         var link = "api/product/characteristics/product_characteristic";
         const response = await fetch(`${HOST}:${PORT}/${link}/${productId}/`);

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();
         const loadedCharacteristic = new ProductCharacteristic(
            resData.id,
            resData.product,
            new ScreenDiagonal(
               resData["diagonal_screen"].id,
               resData["diagonal_screen"].name,
               resData["diagonal_screen"].slug
            ),
            new ScreenType(
               resData["screen_type"].id,
               resData["screen_type"].name,
               resData["screen_type"].slug,
               resData["screen_type"].description
            ),
            new ScreenFrequency(
               resData["screen_frequency"].id,
               resData["screen_frequency"].frequency_number,
               resData["screen_frequency"].slug
            ),
            new Processor(
               resData["processor_name"].id,
               resData["processor_name"].name,
               resData["processor_name"].slug,
               resData["processor_name"].description
            ),
            new OperatSystem(
               resData["operation_system"].id,
               resData["operation_system"].name,
               resData["operation_system"].slug,
               resData["operation_system"].description
            ),
            new Ram(
               resData["memory_capacity"].id,
               resData["memory_capacity"].number_of_gigabite,
               resData["memory_capacity"].slug
            ),
            new MemorySlots(
               resData["memory_slots"].id,
               resData["memory_slots"].number_of_slots,
               resData["memory_slots"].slug
            ),

            new MemoryType(
               resData["memory_type"].id,
               resData["memory_type"].name,
               resData["memory_type"].slug
            ),
            new HardDriveCapacity(
               resData["data_storage"].id,
               resData["data_storage"].hard_drive_capacity,
               resData["data_storage"].slug
            ),
            new VideoCard(
               resData["video_card"].id,
               resData["video_card"].video_card,
               resData["video_card"].slug,
               resData["video_card"].description
            ),
            new VideoMemory(
               resData["video_card_memory"].id,
               resData["video_card_memory"].video_card_capacity,
               resData["video_card_memory"].slug
            ),
            resData.camera,
            resData.color,
            resData.weight,
            resData.battery,
            resData.manipulators,
            resData.height,
            resData.width,
            resData.depth,
            resData.corp_material,
            resData.network_adapters,
            resData.wireless_connection,
            resData.input_output
         );

         dispatch({
            type: READ_CHARACTERISTIC,
            characteristic: loadedCharacteristic,
         });
      };
   } catch (err) {
      throw err;
   }
};
