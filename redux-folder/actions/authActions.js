import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from "react-native";
import { HOST, PORT } from "../../constants/server";

LogBox.ignoreLogs(["Setting a timer"]);

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = (token, email, expiryTime) => {
   return (dispatch) => {
      dispatch(setLogoutTimer(expiryTime));
      dispatch({ type: AUTHENTICATE, token: token, userId: email });
   };
};

export const signUp = (email, firstName, lastName, password) => {
   return async (dispatch) => {
      const response = await fetch(`${HOST}:${PORT}/users/api/auth/register/`, {
         method: "post",
         headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
         },
         body: JSON.stringify({
            email: email,
            first_name: firstName,
            last_name: lastName,
            password: password,
         }),
      });
      if (!response.ok) {
         const errorResData = await response.json();
         let message = "Something went wrong!";
         if (
            errorResData.message == "UNIQUE constraint failed: users_user.email"
         ) {
            message = "This email already exists";
         }

         throw new Error(message);
      }
      const resData = await response.json();
      dispatch(authenticate(resData.token, resData.user_id, 1800 * 100000));
      const expirationDate = new Date(new Date().getTime() + 1800 * 100000);
      saveDataToStorage(resData.token, resData.user_id, expirationDate);
   };
};

export const login = (email, password) => {
   return async (dispatch) => {
      const response = await fetch(`${HOST}:${PORT}/users/api/auth/login/`, {
         method: "post",
         headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
         },
         body: JSON.stringify({
            email: email,
            password: password,
         }),
      });
      if (!response.ok) {
         const errorResData = await response.json();
         let message = "Something went wrong!";
         if (errorResData.non_field_errors) {
            message = errorResData.non_field_errors[0];
         }

         throw new Error(message);
      }
      const resData = await response.json();
      dispatch(authenticate(resData.token, resData.user_id, 1800 * 100000));
      const expirationDate = new Date(new Date().getTime() + 1800 * 100000);
      saveDataToStorage(resData.token, resData.user_id, expirationDate);
   };
};

export const logout = () => {
   clearLogoutTimer();
   AsyncStorage.removeItem("userData");
   return { type: LOGOUT };
};

const clearLogoutTimer = () => {
   if (timer) {
      clearTimeout(timer);
   }
};

const setLogoutTimer = (expirationTime) => {
   return (dispatch) => {
      timer = setTimeout(() => {
         dispatch(logout());
      }, expirationTime);
   };
};

const saveDataToStorage = (token, email, expirationDate) => {
   AsyncStorage.setItem(
      "userData",
      JSON.stringify({
         token: token,
         userEmail: email,
         expiryDate: expirationDate.toISOString(),
      })
   );
};
