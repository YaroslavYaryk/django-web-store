import AsyncStorage from "@react-native-async-storage/async-storage";

export const READ_CITIES = "READ_CITIES";
export const READ_CITY_POSTS = "READ_CITY_POSTS";

const apiKey = "423e339d62469f529b2b36ca9caa7b84";

export const fetchNovaPoshCities = (city) => {
   try {
      return async (dispatch, getState) => {
         const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               apiKey: apiKey,
               modelName: "Address",
               calledMethod: "getCities",
               methodProperties: {
                  FindByString: city,
                  Limit: 20,
               },
            }),
         });

         if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = "Something went wrong!";
            if (errorId === "EMAIL_EXISTS") {
               message = "This email exists already!";
            }
            throw new Error(message);
         }

         const resData = await response.json();

         dispatch({
            type: READ_CITIES,
            cities: resData,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const fetchCityPost = (city, limit = 20) => {
   try {
      return async (dispatch, getState) => {
         const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               apiKey: apiKey,
               modelName: "Address",
               calledMethod: "getWarehouses",
               methodProperties: {
                  CityName: city,
                  Limit: limit,
               },
            }),
         });

         if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = "Something went wrong!";
            if (errorId === "EMAIL_EXISTS") {
               message = "This email exists already!";
            }
            throw new Error(message);
         }

         const resData = await response.json();
         if (limit == 1) {
            saveDataToStorage(
               resData.data[0].CityDescription,
               resData.data[0].CityRef,
               resData.data[0].Description,
               resData.data[0].Ref
            );
         }

         dispatch({
            type: READ_CITY_POSTS,
            cityWareHouses: resData,
         });
      };
   } catch (err) {
      throw err;
   }
};

const saveDataToStorage = (CityDescription, CityRef, Description, Ref) => {
   AsyncStorage.setItem(
      "wareHouse",
      JSON.stringify({
         CityDescription: CityDescription,
         CityRef: CityRef,
         Description: Description,
         Ref: Ref,
      })
   );
};
