import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import {
   createDrawerNavigator,
   DrawerItemList,
} from "@react-navigation/drawer";
import { Platform, SafeAreaView, Button, View } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
import ProductDetails from "../screens/Product/ProductDetails";
import ProductFeatures from "../screens/Product/ProductFeatures";
import ProductImages from "../screens/Product/ProductImages";
import ProductReview from "../screens/Product/Reviews/ProductReviews";
import ProductList from "../screens/Product/ProductsList";
import ProductsSearch from "../screens/Product/ProductsSearch";
import ProductVideos from "../screens/Product/ProductVideos";
import ProductCharacteristic from "../screens/Product/ProductCharacteristic";
import ProductFullDescription from "../screens/Product/ProductFullDescription";
import ProductReviewsList from "../screens/Product/Reviews/ProductReviewsList";
import ReviewReply from "../screens/Product/Reviews/ReviewReply";
import { screenOptions as prDetalsScreenOptions } from "../screens/Product/ProductDetails";
import { screenOptions as cartScreenOptions } from "../screens/Product/Cart";
import { screenOptions as categoriesScreenOptions } from "../screens/Product/Categories";
import { screenOptions as authScreenOptions } from "../screens/Auth/AuthScreen";
import { screenOptions as loginScreenOptions } from "../screens/Auth/Login";
import { screenOptions as productListScreenOptions } from "../screens/Product/ProductsList";
import Colors from "../constants/Colors";
import Categories from "../screens/Product/Categories";
import Cart from "../screens/Product/Cart";
import Icon, { Icons } from "../components/Icon";
import Login from "../screens/Auth/Login";
import Registration from "../screens/Auth/Registration";
import AuthScreen from "../screens/Auth/AuthScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const defaultNavOptions = {
   headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
   },
   headerTitleStyle: {
      fontFamily: "Roboto",
      fontWeight: "700",
   },
   headerBackTitleStyle: {
      fontFamily: "Roboto",
   },
   headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};

const defaultIconNavigationOption = {
   headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
   },
   headerTitleStyle: {
      fontFamily: "Roboto",
      fontWeight: "700",
      marginLeft: -20,
   },
   headerBackTitleStyle: {
      fontFamily: "Roboto",
   },
   headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};

const defaultHideNavigationOption = {
   headerShown: false,
   headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
   },
   headerTitleStyle: {
      fontFamily: "Roboto",
      fontWeight: "700",
      marginLeft: -20,
   },
   headerBackTitleStyle: {
      fontFamily: "Roboto",
   },
   headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};

const ReviewStackNavigator = createStackNavigator();

export const ReviewNavigator = (props) => {
   const productId = props.route.params.productId;
   return (
      <ReviewStackNavigator.Navigator screenOptions={{ headerShown: false }}>
         <ReviewStackNavigator.Screen
            name="ProductReviewsList"
            component={ProductReviewsList}
            options={{}}
            initialParams={{ productId: productId }}
         />
         <ReviewStackNavigator.Screen
            name="ProductReview"
            component={ProductReview}
            initialParams={{ productId: productId }}
         />
         <ReviewStackNavigator.Screen
            name="ReviewReply"
            component={ReviewReply}
            initialParams={{ productId: productId }}
         />
      </ReviewStackNavigator.Navigator>
   );
};

const productTopTabNavigatorContainer = createMaterialTopTabNavigator();

function ProductTopTabNavigator(props) {
   const productId = props.route.params.params.productId;

   return (
      <productTopTabNavigatorContainer.Navigator
         screenOptions={{
            tabBarActiveTintColor: Colors.primaryColor,
            tabBarLabelStyle: { fontSize: 14, fontWeight: "700" },
            tabBarIndicatorStyle: {
               backgroundColor: Colors.primaryColor,
            },
            tabBarScrollEnabled: true,
         }}
      >
         <productTopTabNavigatorContainer.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{ tabBarLabel: "?????? ?????? ??????????" }}
            initialParams={{ productId: productId }}
         />
         <productTopTabNavigatorContainer.Screen
            name="ProductCharacteristic"
            component={ProductCharacteristic}
            options={{ tabBarLabel: "????????????????????????????" }}
            initialParams={{ productId: productId }}
         />
         <productTopTabNavigatorContainer.Screen
            name="ReviewNavigator"
            component={ReviewNavigator}
            options={{ tabBarLabel: "??????????????" }}
            initialParams={{ productId: productId }}
         />
         <productTopTabNavigatorContainer.Screen
            name="ProductImages"
            component={ProductImages}
            options={{ tabBarLabel: "????????" }}
            initialParams={{ productId: productId }}
         />
         <productTopTabNavigatorContainer.Screen
            name="ProductVideos"
            component={ProductVideos}
            options={{ tabBarLabel: "??????????" }}
            initialParams={{ productId: productId }}
         />
      </productTopTabNavigatorContainer.Navigator>
   );
}

const topTabNavigatorContainer = createMaterialTopTabNavigator();

function TopTabNavigator() {
   return (
      <topTabNavigatorContainer.Navigator
         screenOptions={{
            tabBarActiveTintColor: Colors.primaryColor,
            tabBarLabelStyle: { fontSize: 15, fontWeight: "700" },
            tabBarIndicatorStyle: { backgroundColor: Colors.primaryColor },
         }}
      >
         <topTabNavigatorContainer.Screen
            title="??????"
            name="Login"
            component={Login}
            options={{ tabBarLabel: "????????" }}
         />
         <topTabNavigatorContainer.Screen
            name="Registration"
            component={Registration}
            options={{ tabBarLabel: "????????????????????" }}
         />
      </topTabNavigatorContainer.Navigator>
   );
}

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
   return (
      <AuthStackNavigator.Navigator screenOptions={defaultIconNavigationOption}>
         <AuthStackNavigator.Screen
            name="Account"
            component={AuthScreen}
            options={authScreenOptions}
         />
         <AuthStackNavigator.Screen
            name="TopTabNavigator"
            component={TopTabNavigator}
            options={{ headerTitle: "??????????????????????" }}
         />
      </AuthStackNavigator.Navigator>
   );
};

const BaseStackNavigator = createStackNavigator();

export const BaseNavigator = () => {
   return (
      <BaseStackNavigator.Navigator screenOptions={{ headerShown: false }}>
         <BaseStackNavigator.Screen
            name="Product"
            component={ProductsNavigator}
            // options={productsOverviewScreenOptions}
         />
         <BaseStackNavigator.Screen
            name="Auth"
            component={AuthNavigator}
            // options={prDetalsScreenOptions}
         />
      </BaseStackNavigator.Navigator>
   );
};

const CategoryStackNavigator = createStackNavigator();

export const CategoryNavigator = () => {
   return (
      <CategoryStackNavigator.Navigator screenOptions={defaultNavOptions}>
         <CategoryStackNavigator.Screen
            name="CategoriesScreen"
            component={Categories}
            options={categoriesScreenOptions}
         />
         <CategoryStackNavigator.Screen
            name="Product"
            component={ProductsNavigator}
            // options={productsOverviewScreenOptions}
         />
      </CategoryStackNavigator.Navigator>
   );
};

const CartStackNavigator = createStackNavigator();

export const CartNavigator = () => {
   return (
      <CartStackNavigator.Navigator screenOptions={defaultNavOptions}>
         <CartStackNavigator.Screen
            name="CartScreen"
            component={Cart}
            options={cartScreenOptions}
         />
         <CartStackNavigator.Screen
            name="Product"
            component={ProductsNavigator}
            // options={productsOverviewScreenOptions}
         />
      </CartStackNavigator.Navigator>
   );
};

const ProductListStackNavigator = createStackNavigator();

export const ProductListNavigator = () => {
   return (
      <ProductListStackNavigator.Navigator screenOptions={defaultNavOptions}>
         <ProductListStackNavigator.Screen
            name="ProductList"
            component={ProductList}
            options={productListScreenOptions}
         />
      </ProductListStackNavigator.Navigator>
   );
};

const Tab = createMaterialBottomTabNavigator();

const BaseFullNavigator = () => {
   const [iconsColor, setIconsColors] = useState([
      Colors.primaryColor,
      "grey",
      "grey",
      "grey",
   ]);

   const handleActiveIconColor = (number) => {
      var allColors = ["grey", "grey", "grey", "grey"];
      allColors[number - 1] = Colors.primaryColor;
      setIconsColors(allColors);
   };

   return (
      <Tab.Navigator
         activeColor={Colors.primaryColor}
         barStyle={{
            backgroundColor: "white",
            color: "black",
         }}
      >
         <Tab.Screen
            name="ProductOverview"
            component={ProductListNavigator}
            listeners={{
               tabPress: (e) => {
                  // Prevent default action
                  // e.preventDefault();

                  //Any custom code here
                  handleActiveIconColor(1);
               },
            }}
            options={{
               tabBarLabelPosition: "beside-icon",

               tabBarLabel: "Home",
               tabBarIcon: () => (
                  <Icon
                     name="home-sharp"
                     type={Icons.Ionicons}
                     size={20}
                     color={iconsColor[0]}
                  />
               ),
            }}
         />
         <Tab.Screen
            name="Categories"
            component={CategoryNavigator}
            listeners={{
               tabPress: (e) => {
                  // e.preventDefault();
                  handleActiveIconColor(2);
               },
            }}
            options={{
               tabBarLabel: "Categories",
               tabBarStyle: { display: "none" },
               tabBarIcon: () => (
                  <Icon
                     name="swatchbook"
                     type={Icons.FontAwesome5}
                     size={20}
                     color={iconsColor[1]}
                  />
               ),
            }}
         />
         <Tab.Screen
            name="Cart"
            component={CartNavigator}
            listeners={{
               tabPress: (e) => {
                  // e.preventDefault();
                  handleActiveIconColor(3);
               },
            }}
            options={{
               headerShown: true,
               tabBarLabel: "Cart",
               tabBarIcon: () => (
                  <Icon
                     name="shopping-cart"
                     type={Icons.FontAwesome5}
                     size={20}
                     color={iconsColor[2]}
                  />
               ),
            }}
         />

         <Tab.Screen
            name="Auth"
            component={AuthNavigator}
            activeColor={Colors.primaryColor}
            options={{
               tabBarLabel: "Account",
               tabBarIcon: () => (
                  <Icon
                     name="account-circle"
                     type={Icons.MaterialIcons}
                     size={24}
                     color={iconsColor[3]}
                  />
               ),
            }}
            listeners={{
               tabPress: (e) => {
                  // e.preventDefault();
                  handleActiveIconColor(4);
               },
            }}
         />
      </Tab.Navigator>
   );
};

const ProductsStackNavigator = createStackNavigator();

export default ProductsNavigator = () => {
   return (
      <ProductsStackNavigator.Navigator
         screenOptions={defaultIconNavigationOption}
      >
         <ProductsStackNavigator.Screen
            name="BaseFullNavigator"
            component={BaseFullNavigator}
            options={{ headerShown: false }}
         />
         <ProductsStackNavigator.Screen
            name="ProductDetailsNavigator"
            component={ProductTopTabNavigator}
            options={prDetalsScreenOptions}
         />
         <ProductsStackNavigator.Screen
            name="ProductDescription"
            component={ProductFullDescription}
            // options={prDetalsScreenOptions}
         />
         <ProductsStackNavigator.Screen
            name="ProductSearch"
            component={ProductsSearch}
            // options={cartScreenOptions}
         />
         <ProductsStackNavigator.Screen
            name="ProductFeatures"
            component={ProductFeatures}
            // options={productDetailScreenOptions}
         />

         <ProductsStackNavigator.Screen
            name="ProductVideos"
            component={ProductVideos}
            // options={cartScreenOptions}
         />
      </ProductsStackNavigator.Navigator>
   );
};
