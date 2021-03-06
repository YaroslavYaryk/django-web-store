import {
   Text,
   View,
   ScrollView,
   Image,
   StyleSheet,
   Button,
   TouchableOpacity,
   ActivityIndicator,
   FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useWindowDimensions } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import { Entypo } from "@expo/vector-icons";
import { useState, useCallback, useEffect } from "react";
import CartProductItem from "../../components/CartProductItem";
import Colors from "../../constants/Colors";
import * as cartActions from "../../redux-folder/actions/cart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const Cart = (props) => {
   const cart = useSelector((state) => state.cart.cartProducts);
   const [isLoading, setIsLoading] = useState(false);
   const [productDelete, setProductDelete] = useState(null);
   const [fetch, setfetch] = useState(0);
   const dispatch = useDispatch();

   const fetchCart = () => {
      setIsLoading(true);
      try {
         dispatch(cartActions.fetchCart());
      } catch {}
      setIsLoading(false);
   };

   const isFocused = useIsFocused();

   const removeProductFromCart = (productId, productPrice) => {
      setIsLoading(true);
      try {
         dispatch(cartActions.deleteProductFromCart(productId, productPrice));
      } catch (err) {}
      setIsLoading(false);
   };

   useEffect(() => {
      console.log(cart);
      fetchCart();
   }, [dispatch, fetchCart, cart, productDelete, fetch, isFocused]);

   useEffect(() => {
      props.navigation.setParams({
         dispatch: dispatch,
         setdeleteAll: setfetch,
         deleteAll: fetch,
      });
   }, [dispatch]);

   if (isLoading) {
      return (
         <View style={styles.center}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
         </View>
      );
   }
   if (!cart.totalProducts) {
      return (
         <View style={styles.center}>
            <Text>Cart is empty!</Text>
         </View>
      );
   }

   return (
      <View style={styles.container}>
         <View>
            {cart.products && (
               <FlatList
                  data={cart.products}
                  keyExtractor={(item) => item.productId}
                  renderItem={(itemData) => (
                     <View
                        style={{
                           borderWidth: 0,
                           shadowColor: "grey",
                           shadowOpacity: 0.26,
                           shadowOffset: { width: 2, height: 2 },
                           shadowRadius: 8,
                           elevation: 5,
                           marginVertical: 5,
                           paddingTop: 20,
                           paddingBottom: 10,
                           paddingHorizontal: 10,
                           marginHorizontal: 10,
                        }}
                     >
                        <CartProductItem
                           item={itemData.item}
                           removeProductFromCart={removeProductFromCart}
                           setProductDelete={setProductDelete}
                        />
                     </View>
                  )}
                  fetchCart
               />
            )}
         </View>
         <View style={{ alignItems: "center" }}>
            <View
               style={{
                  backgroundColor: Colors.primaryColor,
                  width: "95%",
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 10,
               }}
            >
               <TouchableOpacity
                  onPress={() => {
                     console.log("order");
                  }}
                  style={{ flexDirection: "row", alignItems: "flex-end" }}
               >
                  <Text style={styles.orderItem}>
                     ???????????????? ???????????????????? ???? ????????
                  </Text>
                  <View
                     style={{ flexDirection: "row", alignItems: "flex-end" }}
                  >
                     <Text
                        style={[
                           styles.orderItem,
                           { marginLeft: 10, fontSize: 15 },
                        ]}
                     >
                        {cart.totalPrice}
                     </Text>
                     <Text style={[styles.orderItem, { marginLeft: 3 }]}>
                        ???
                     </Text>
                  </View>
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
};

export const screenOptions = (navData) => {
   const [menuVisible, setMenuVisible] = useState(false);
   const props = navData.navigation.getState();
   var dispatch;
   var setdeleteAll;
   var deleteAll;
   if (props.routes[0].params) {
      dispatch = props.routes[0].params.dispatch;
      setdeleteAll = props.routes[0].params.setdeleteAll;
      deleteAll = props.routes[0].params.deleteAll;
   }
   const deleteAllFromCart = () => {
      try {
         dispatch(cartActions.deleteAllFromCart());
      } catch (err) {}
      setdeleteAll(deleteAll + 0.000000000001);
   };

   if (menuVisible) {
      return {
         headerTitle: "Cart",
         headerRight: () => (
            <View
               style={{
                  // flex: 1,
                  height: 100,
                  width: 300,
                  marginTop: 75,
               }}
            >
               <View style={{ position: "absolute", right: 0 }}>
                  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                     <Item
                        icon={Entypo}
                        title="dots-three-vertical"
                        color={"white"}
                        iconName="dots-three-vertical"
                        onPress={() => {
                           setMenuVisible(!menuVisible);
                        }}
                     />
                  </HeaderButtons>
               </View>
               <View
                  style={{
                     backgroundColor: "white",
                     position: "absolute",
                     top: 30,
                     width: 200,
                     right: 25,
                     borderWidth: 0.5,
                     borderColor: "grey",
                     padding: 10,
                     borderRadius: 10,
                  }}
               >
                  <View>
                     <TouchableOpacity
                        onPress={() => {
                           deleteAllFromCart();

                           setMenuVisible(!menuVisible);
                        }}
                     >
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>
                           ???????????????? ??????
                        </Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         ),
      };
   }

   return {
      headerTitle: "Cart",
      headerRight: () => (
         <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
               icon={Entypo}
               title="dots-three-vertical"
               color={"white"}
               iconName="dots-three-vertical"
               onPress={() => setMenuVisible(!menuVisible)}
            />
         </HeaderButtons>
      ),
   };
};

const styles = StyleSheet.create({
   center: { flex: 1, justifyContent: "center", alignItems: "center" },
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
   buttonRightContainer: {
      marginRight: 20,
      flexDirection: "row",
   },
   buttonRightItem: {
      marginHorizontal: 5,
      color: "white",
      fontWeight: "700",
   },
   buttonRightItemActive: {
      color: "yellow",
   },
   cartItem: {},
   orderItem: {
      color: "white",
      fontWeight: "500",
   },
});

export default Cart;
