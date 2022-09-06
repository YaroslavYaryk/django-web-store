import { HOST, PORT } from "../../constants/server";
import CategoryItem from "../../models/CategoryItem";
export const READ_CATEGORIES = "READ_CATEGORIES";

export const fetchCategories = () => {
   try {
      return async (dispatch, getState) => {
         const userId = getState();

         const response = await fetch(
            `${HOST}:${PORT}/api/product/characteristics/product_type/get_all/`
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();
         const loadedCategories = [];
         for (const key in resData) {
            loadedCategories.push(
               new CategoryItem(
                  resData[key].id,
                  resData[key].name,
                  resData[key].slug,
                  resData[key].icon,
                  resData[key].photo
               )
            );
         }

         dispatch({
            type: READ_CATEGORIES,
            loadedCategories: loadedCategories,
         });
      };
   } catch (err) {
      throw err;
   }
};
