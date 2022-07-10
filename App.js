import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import ReduxThunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, applyMiddleware } from "redux";
import BaseFullNavigator from "./navigations/ProductNavigator";
import { Provider } from "react-redux";
import productReducer from "./redux-folder/reducers/productReducer";
import ProductsNavigator from "./navigations/ProductNavigator";

const rootReducer = combineReducers({
   products: productReducer,
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
   return (
      <Provider store={store}>
         <BaseFullNavigator />
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
