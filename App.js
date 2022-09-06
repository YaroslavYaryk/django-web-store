import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import ReduxThunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, applyMiddleware } from "redux";
import ProductsNavigator from "./navigations/ProductNavigator";
import { Provider } from "react-redux";
import productReducer from "./redux-folder/reducers/productReducer";
import productCharacteristicReducer from "./redux-folder/reducers/productCharacteristicReducer";
import prReviewsReducer from "./redux-folder/reducers/prReviewsReducer";
import cartReducer from "./redux-folder/reducers/cartReducer";
import novaPoshtaReducer from "./redux-folder/reducers/novaPoshtaReducer";
import orderReducer from "./redux-folder/reducers/orderReducer";
import userReducer from "./redux-folder/reducers/userReducer";
import couponReducer from "./redux-folder/reducers/couponReducer";
import filterReducer from "./redux-folder/reducers/filterReducer";
import categoryReducer from "./redux-folder/reducers/categoryReducer";
import authReducer from "./redux-folder/reducers/authReducer";
import likeReducer from "./redux-folder/reducers/likeReducer";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";

const rootReducer = combineReducers({
   products: productReducer,
   prodCharacteristic: productCharacteristicReducer,
   productReviews: prReviewsReducer,
   cart: cartReducer,
   cities: novaPoshtaReducer,
   orders: orderReducer,
   user: userReducer,
   coupones: couponReducer,
   filter: filterReducer,
   categories: categoryReducer,
   auth: authReducer,
   likes: likeReducer,
});

const store = configureStore(
   {
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
         }),
   },
   applyMiddleware(ReduxThunk)
);

export default function App() {
   LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
   LogBox.ignoreAllLogs(); //Ignore all log notifications

   return (
      <Provider store={store}>
         <NavigationContainer>
            <ProductsNavigator />
         </NavigationContainer>
      </Provider>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
});
