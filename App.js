import { StatusBar } from "expo-status-bar";
import { useState, useCallback } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
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
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { AntDesign } from "@expo/vector-icons";

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

   const minValue = 5;
   const maxValue = 25;

   const [price, setPrice] = useState([5, 25]);
   const multiSliderValuesChange = (values) => {
      setPrice(values);
   };

   return (
      <Provider store={store}>
         <NavigationContainer>
            <ProductsNavigator />
         </NavigationContainer>
      </Provider>
      // <View style={styles.container}>
      //    <View style={{ width: "90%", height: "90%", marginTop: 200 }}>
      //       <View
      //          style={{
      //             flexDirection: "row",
      //             width: 300,
      //             justifyContent: "space-between",
      //          }}
      //       >
      //          <TextInput
      //             label={"До"}
      //             keyboardType="numeric"
      //             style={{
      //                height: 40,
      //                fontSize: 15,
      //                width: 100,
      //                backgroundColor: "red",
      //             }}
      //             defaultValue={String(price[0])}
      //             mode="outlined"
      //             value={String(price[0])}
      //             onChangeText={(value) => {
      //                try {
      //                   if (parseInt(value)) {
      //                      if (parseInt(value) > price[1]) {
      //                         if (parseInt(value) > maxValue) {
      //                            console.log("hereNow");
      //                            setPrice([price[1], maxValue]);
      //                         } else {
      //                            setPrice([price[1], parseInt(value)]);
      //                         }
      //                      } else {
      //                         setPrice([parseInt(value), price[1]]);
      //                      }
      //                   } else {
      //                      setPrice([0, price[1]]);
      //                   }
      //                } catch (error) {
      //                   console.log(error);
      //                }
      //             }}
      //             // label={"Search"}
      //             // underlineColor="#F2F2F2"
      //             activeOutlineColor="green"
      //             // color="red"
      //             // activeUnderlineColor="#F3F5F6"
      //             selectionColor="black"
      //             maxLength={5}
      //          />
      //          <TextInput
      //             label={"До"}
      //             keyboardType="numeric"
      //             style={{
      //                height: 40,
      //                width: 100,
      //                fontSize: 15,
      //                backgroundColor: "red",
      //             }}
      //             defaultValue={String(price[1])}
      //             mode="outlined"
      //             value={String(price[1])}
      //             onChangeText={(value) => {
      //                try {
      //                   if (parseInt(value)) {
      //                      if (parseInt(value) > maxValue) {
      //                         setPrice([price[0], maxValue]);
      //                      } else {
      //                         setPrice([price[0], parseInt(value)]);
      //                      }
      //                   } else {
      //                      setPrice([price[0], 0]);
      //                   }
      //                } catch (error) {
      //                   console.log(error);
      //                }
      //             }}
      //             // label={"Search"}
      //             // underlineColor="#F2F2F2"
      //             activeOutlineColor="green"
      //             // color="red"
      //             // activeUnderlineColor="#F3F5F6"
      //             selectionColor="black"
      //             maxLength={5}
      //          />
      //       </View>
      //       <View style={{ marginTop: 0, marginLeft: 20 }}>
      //          <MultiSlider
      //             values={price}
      //             sliderLength={150}
      //             onValuesChange={multiSliderValuesChange}
      //             min={minValue}
      //             max={maxValue}
      //             step={1}
      //          />
      //       </View>
      //       <Text>{price[0]}</Text>
      //       <Text>{price[1]}</Text>
      //    </View>
      // </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "pink",
      alignItems: "center",
      justifyContent: "center",
   },
});
