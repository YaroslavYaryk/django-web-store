import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import {
   createDrawerNavigator,
   DrawerItemList,
} from "@react-navigation/drawer";
import { Platform, SafeAreaView, Button, View } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
import ProductDetails from "../screens/Product/ProductDetails";
import ProductFeatures from "../screens/Product/ProductFeatures";
import ProductImages from "../screens/Product/ProductImages";
import ProductReview from "../screens/Product/ProductReviews";
import ProductList from "../screens/Product/ProductsList";
import ProductsSearch from "../screens/Product/ProductsSearch";
import ProductVideos from "../screens/Product/ProductVideos";
import ProductCharacteristic from "../screens/Product/ProductCharacteristic";
import ProductFullDescription from "../screens/Product/ProductFullDescription";
import { screenOptions as prDetalsScreenOptions } from "../screens/Product/ProductDetails";
import { screenOptions as cartScreenOptions } from "../screens/Product/Cart";
import { screenOptions as categoriesScreenOptions } from "../screens/Product/Categories";
import Colors from "../constants/Colors";
import Categories from "../screens/Product/Categories";
import Cart from "../screens/Product/Cart";
import Icon, { Icons } from "../components/Icon";
import Login from "../screens/Auth/Login";
import Registration from "../screens/Auth/Registration";

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

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
   return (
      <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
         <ProductsStackNavigator.Screen
            name="ProductsOverview"
            component={ProductList}
         />
         <ProductsStackNavigator.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={prDetalsScreenOptions}
         />
         <ProductsStackNavigator.Screen
            name="ProductDescription"
            component={ProductFullDescription}
            // options={prDetalsScreenOptions}
         />
         <ProductsStackNavigator.Screen
            name="ProductCharacteristic"
            component={ProductCharacteristic}
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
            name="ProductReview"
            component={ProductReview}
            // options={cartScreenOptions}
         />
         <ProductsStackNavigator.Screen
            name="ProductImages"
            component={ProductImages}
            // options={cartScreenOptions}
         />
         <ProductsStackNavigator.Screen
            name="ProductVideos"
            component={ProductVideos}
            // options={cartScreenOptions}
         />
      </ProductsStackNavigator.Navigator>
   );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
   return (
      <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
         <AuthStackNavigator.Screen
            name="Login"
            component={Login}
            // options={productsOverviewScreenOptions}
         />
         <AuthStackNavigator.Screen
            name="Registration"
            component={Registration}
            // options={prDetalsScreenOptions}
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

const Tab = createMaterialBottomTabNavigator();

export default BaseFullNavigator = () => {
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
      <NavigationContainer>
         <Tab.Navigator
            activeColor={Colors.primaryColor}
            barStyle={{
               backgroundColor: "white",
               color: "black",
            }}
         >
            <Tab.Screen
               name="Product"
               component={ProductsNavigator}
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
                  tabBarLabel: "Categories",
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
      </NavigationContainer>
   );
};
