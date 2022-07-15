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
import { NavigationContainer } from "@react-navigation/native";

const rootReducer = combineReducers({
   products: productReducer,
   prodCharacteristic: productCharacteristicReducer,
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
