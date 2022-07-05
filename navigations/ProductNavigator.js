import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import {
    createDrawerNavigator,
    DrawerItemList,
} from "@react-navigation/drawer";
import { Platform, SafeAreaView, Button, View } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
import ProductDetails from "../screens/Products/ProductDetails";
import ProductFeatures from "../screens/Products/ProductFeatures";
import ProductImages from "../screens/Products/ProductImages";
import ProductReview from "../screens/Products/ProductReviews";
import ProductList from "../screens/Products/ProductsList";
import ProductSearch from "../screens/Products/ProductsSearch";
import ProductVideos from "../screens/Products/ProductVideos";

import Colors from "../constants/Colors";

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

const ProductDetailsStackNavigator = createStackNavigator();

export const ProductDetailsNavigator = () => {
    return (
        <ProductDetailsStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <ProductsStackNavigator.Screen
                name="ProductDetails"
                component={ProductDetails}
                // options={productsOverviewScreenOptions}
            />
            <ProductDetailsStackNavigator.Screen
                name="ProductFeatures"
                component={ProductFeatures}
                // options={productDetailScreenOptions}
            />
            <ProductDetailsStackNavigator.Screen
                name="ProductReview"
                component={ProductReview}
                // options={cartScreenOptions}
            />
            <ProductDetailsStackNavigator.Screen
                name="ProductImages"
                component={ProductImages}
                // options={cartScreenOptions}
            />
            <ProductDetailsStackNavigator.Screen
                name="ProductVideos"
                component={ProductVideos}
                // options={cartScreenOptions}
            />
        </ProductDetailsStackNavigator.Navigator>
    );
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
    return (
        <NavigationContainer>
            <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
                <ProductsStackNavigator.Screen
                    name="ProductsOverview"
                    component={ProductList}
                    // options={productsOverviewScreenOptions}
                />
                <ProductsStackNavigator.Screen
                    name="ProductDetails"
                    component={ProductDetailsNavigator}
                    // options={productDetailScreenOptions}
                />
                <ProductsStackNavigator.Screen
                    name="ProductSearch"
                    component={ProductSearch}
                    // options={cartScreenOptions}
                />
            </ProductsStackNavigator.Navigator>
        </NavigationContainer>
    );
};

export default ProductsNavigator;

// // const ProductsNavigator = createStackNavigator(
// //   {
// //     ProductsOverview: ProductsOverviewScreen,
// //     ProductDetail: ProductDetailScreen,
// //     Cart: CartScreen
// //   },
// //   {
// //     navigationOptions: {
// //       drawerIcon: drawerConfig => (
// //         <Ionicons
// //           name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
// //           size={23}
// //           color={drawerConfig.tintColor}
// //         />
// //       )
// //     },
// //     defaultNavigationOptions: defaultNavOptions
// //   }
// // );

// const OrdersStackNavigator = createStackNavigator();

// export const OrdersNavigator = () => {
//     return (
//         <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
//             <OrdersStackNavigator.Screen
//                 name="Orders"
//                 component={OrdersScreen}
//                 options={ordersScreenOptions}
//             />
//         </OrdersStackNavigator.Navigator>
//     );
// };

// // const OrdersNavigator = createStackNavigator(
// //   {
// //     Orders: OrdersScreen
// //   },
// //   {
// //     navigationOptions: {
// //       drawerIcon: drawerConfig => (
// //         <Ionicons
// //           name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
// //           size={23}
// //           color={drawerConfig.tintColor}
// //         />
// //       )
// //     },
// //     defaultNavigationOptions: defaultNavOptions
// //   }
// // );

// const AdminStackNavigator = createStackNavigator();

// export const AdminNavigator = () => {
//     return (
//         <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
//             <AdminStackNavigator.Screen
//                 name="UserProducts"
//                 component={UserProductsScreen}
//                 options={userProductsScreenOptions}
//             />
//             <AdminStackNavigator.Screen
//                 name="EditProduct"
//                 component={EditProductScreen}
//                 options={editProductScreenOptions}
//             />
//         </AdminStackNavigator.Navigator>
//     );
// };

// // const AdminNavigator = createStackNavigator(
// //   {
// //     UserProducts: UserProductsScreen,
// //     EditProduct: EditProductScreen
// //   },
// //   {
// //     navigationOptions: {
// //       drawerIcon: drawerConfig => (
// //         <Ionicons
// //           name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
// //           size={23}
// //           color={drawerConfig.tintColor}
// //         />
// //       )
// //     },
// //     defaultNavigationOptions: defaultNavOptions
// //   }
// // );

// const ShopDrawerNavigator = createDrawerNavigator();

// export const ShopNavigator = () => {
//     const dispatch = useDispatch();

//     return (
//         <ShopDrawerNavigator.Navigator
//             drawerContent={(props) => {
//                 return (
//                     <View style={{ flex: 1, paddingTop: 20 }}>
//                         <SafeAreaView
//                             forceInset={{ top: "always", horizontal: "never" }}
//                         >
//                             <DrawerItemList {...props} />
//                             <Button
//                                 title="Logout"
//                                 color={Colors.primaryColor}
//                                 onPress={() => {
//                                     dispatch(authActions.logout());
//                                     // props.navigation.navigate('Auth');
//                                 }}
//                             />
//                         </SafeAreaView>
//                     </View>
//                 );
//             }}
//             screenOptions={{
//                 drawerActiveTintColor: Colors.primaryColor,
//                 headerShown: false,
//             }}
//         >
//             <ShopDrawerNavigator.Screen
//                 name="Products"
//                 component={ProductsNavigator}
//                 options={{
//                     drawerIcon: (props) => (
//                         <Ionicons
//                             name={
//                                 Platform.OS === "android"
//                                     ? "md-cart"
//                                     : "ios-cart"
//                             }
//                             size={23}
//                             color={props.color}
//                         />
//                     ),
//                 }}
//             />
//             <ShopDrawerNavigator.Screen
//                 name="My Orders"
//                 component={OrdersNavigator}
//                 options={{
//                     drawerIcon: (props) => (
//                         <Ionicons
//                             name={
//                                 Platform.OS === "android"
//                                     ? "md-list"
//                                     : "ios-list"
//                             }
//                             size={23}
//                             color={props.color}
//                         />
//                     ),
//                 }}
//             />
//             <ShopDrawerNavigator.Screen
//                 name="Admin"
//                 component={AdminNavigator}
//                 options={{
//                     drawerIcon: (props) => (
//                         <Ionicons
//                             name={
//                                 Platform.OS === "android"
//                                     ? "md-create"
//                                     : "ios-create"
//                             }
//                             size={23}
//                             color={props.color}
//                         />
//                     ),
//                 }}
//             />
//         </ShopDrawerNavigator.Navigator>
//     );
// };

// // const ShopNavigator = createDrawerNavigator(
// //   {
// //     Products: ProductsNavigator,
// //     Orders: OrdersNavigator,
// //     Admin: AdminNavigator
// //   },
// //   {
// //     contentOptions: {
// //       activeTintColor: Colors.primary
// //     },
// //     contentComponent: props => {
// //       const dispatch = useDispatch();
// //       return (
// //         <View style={{ flex: 1, paddingTop: 20 }}>
// //           <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
// //             <DrawerItems {...props} />
// //             <Button
// //               title="Logout"
// //               color={Colors.primary}
// //               onPress={() => {
// //                 dispatch(authActions.logout());
// //                 // props.navigation.navigate('Auth');
// //               }}
// //             />
// //           </SafeAreaView>
// //         </View>
// //       );
// //     }
// //   }
// // );

// const AuthStackNavigator = createStackNavigator();

// export const AuthNavigator = () => {
//     return (
//         <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
//             <AuthStackNavigator.Screen
//                 name="Auth"
//                 component={AuthScreen}
//                 options={authScreenOptions}
//             />
//         </AuthStackNavigator.Navigator>
//     );
// };
