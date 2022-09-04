import { HOST, PORT } from "../../constants/server";
import Product from "../../models/Product";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
export const READ_PRODUCT = "READ_PRODUCT";
export const READ_CHARACTERISTIC_PRODUCT = "READ_CHARACTERISTIC_PRODUCT";

export const SORT_PRODUCTS = "SORT_PRODUCTS";

export const fetchProducts = () => {
   try {
      return async (dispatch, getState) => {
         const userId = getState();

         const response = await fetch(`${HOST}:${PORT}/api/get_products/`);

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();
         const loadedProducts = [];
         for (const key in resData) {
            loadedProducts.push(
               new Product(
                  resData[key].id,
                  resData[key].slug,
                  resData[key].name,
                  resData[key].only_name,
                  resData[key].brand_name,
                  resData[key].product_type,
                  resData[key].country_made,
                  resData[key].country_brand,
                  resData[key].photo,
                  resData[key].photos,
                  resData[key].videos,
                  resData[key].description,
                  resData[key].short_description,
                  resData[key].creation_date,
                  resData[key].video,
                  resData[key].warranty,
                  resData[key].price,
                  resData[key].is_available,
                  resData[key].comment_count,
                  resData[key].rating
               )
            );
         }

         dispatch({
            type: READ_PRODUCT,
            products: loadedProducts,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const fetchCharacteristicProducts = (type, slug) => {
   try {
      return async (dispatch, getState) => {
         const userId = getState();

         const response = await fetch(
            `${HOST}:${PORT}/api/specific_characteristics/${type}/${slug}/`
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();
         const loadedProducts = [];
         for (const key in resData) {
            loadedProducts.push(
               new Product(
                  resData[key].id,
                  resData[key].slug,
                  resData[key].name,
                  resData[key].only_name,
                  resData[key].brand_name,
                  resData[key].product_type,
                  resData[key].country_made,
                  resData[key].country_brand,
                  resData[key].photo,
                  resData[key].photos,
                  resData[key].videos,
                  resData[key].description,
                  resData[key].short_description,
                  resData[key].creation_date,
                  resData[key].video,
                  resData[key].warranty,
                  resData[key].price,
                  resData[key].is_available,
                  resData[key].comment_count,
                  resData[key].rating
               )
            );
         }

         dispatch({
            type: READ_CHARACTERISTIC_PRODUCT,
            characteristicProducts: loadedProducts,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const SearchProducts = (word) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: SEARCH_PRODUCTS,
            products: [],
            word,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const sortProducts = (orderMethod, array) => {
   try {
      return async (dispatch, getState) => {
         dispatch({
            type: SORT_PRODUCTS,
            orderMethod: orderMethod,
         });
      };
   } catch (err) {
      throw err;
   }
};
