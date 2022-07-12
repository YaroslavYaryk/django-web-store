export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const READ_CHARACTERISTIC = "READ_CHARACTERISTIC";

export const fetchproductCharacteristic = () => {
   try {
      return async (dispatch, getState) => {
         // const token = getState().auth.token;

         // const a = "http://192.168.0.109:8000/event/api/list/";

         // const response = await fetch(`${HOST}:${PORT}/event/api/list/`, {
         //     method: "GET",
         //     headers: {
         //         "Content-Type": "application/json",
         //         "Access-Control-Allow-Origin": "*",
         //         Authorization: `Token ${token}`,
         //     },
         // });
         // if (!response.ok) {
         //     throw new Error("Something went wrong!");
         // }
         // const resData = await response.json();
         // const loadedEvents = [];
         // for (const key in resData) {
         //     loadedEvents.push(
         //         new Event(
         //             resData[key].id,
         //             resData[key].company,
         //             resData[key].customer,
         //             resData[key].artist,
         //             resData[key].venue,
         //             resData[key].price,
         //             resData[key].payment_methods,
         //             resData[key].date,
         //             resData[key].comment,
         //             resData[key].visible,
         //             resData[key].signed,
         //             resData[key].aditional_staff,
         //             resData[key].contract_pdf_url,
         //             resData[key].venue_image
         //         )
         //     );
         // }
         dispatch({
            type: READ_CHARACTERISTIC,
            characteristic: [],
         });
      };
   } catch (err) {
      throw err;
   }
};
