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
import CustomHeaderButton from "../../../components/CustomHeaderButton";
import { Entypo } from "@expo/vector-icons";
import { useState, useCallback, useEffect } from "react";
import CartProductItem from "../../../components/CartProductItem";
import Colors from "../../../constants/Colors";
import * as cartActions from "../../../redux-folder/actions/cart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartArea from "../../../components/wrappers/CartArea";
import * as novaPoshtaAction from "../../../redux-folder/actions/novaPoshtaActions";
import * as orderActions from "../../../redux-folder/actions/orderActions";
import * as authActions from "../../../redux-folder/actions/userActions";
import { useIsFocused } from "@react-navigation/native";

const OrderSecond = (props) => {
   const cart = useSelector((state) => state.cart.cartProducts);
   const [isLoading, setIsLoading] = useState(false);
   const [productDelete, setProductDelete] = useState(null);
   const [fetch, setfetch] = useState(0);

   const userId = useSelector((state) => state.auth.userId);

   // useEffect(() => {
   //    dispatch(authActions.fetchUserInfo(userId));
   // }, [userId]);

   const user = useSelector((state) => state.auth.user);
   const dispatch = useDispatch();
   // console.log(user);

   const cartId = props.route.params.cartId
      ? props.route.params.cartId
      : props.route.params.params.cartId;

   const order = useSelector((state) =>
      state.orders.orders.find((elem) => elem.cartId === cartId)
   );
   console.log(user);
   const cityWarehousFirst = useSelector(
      (state) => state.cities.cityWareHouses
   );
   const isFocused = useIsFocused();

   const setWareHouse = async () => {
      const wareHouse = await AsyncStorage.getItem("wareHouse");
      const transformedData = JSON.parse(wareHouse);
      const { CityDescription, CityRef, Description, Ref } = transformedData;
      console.log(order.place, CityDescription);
      if (order.place != CityDescription || !user.wareHouse) {
         dispatch(orderActions.addWareHouse(cartId, Description, Ref, CityRef));
         dispatch(authActions.changeUserWareHouse(1, Description));
      }
   };

   useEffect(() => {
      dispatch(novaPoshtaAction.fetchCityPost(order.place, 1));
      setWareHouse();
   }, [isFocused]);

   // console.log(order);

   const fetchCart = () => {
      setIsLoading(true);
      try {
         dispatch(cartActions.fetchCart());
      } catch {}
      setIsLoading(false);
   };

   const removeProductFromCart = (productId, productPrice) => {
      setIsLoading(true);
      try {
         dispatch(cartActions.deleteProductFromCart(productId, productPrice));
      } catch (err) {}
      setIsLoading(false);
   };

   const removeOneProductFromCart = (productId, productPrice) => {
      setIsLoading(true);
      try {
         dispatch(
            cartActions.deleteOneProductFromCart(productId, productPrice)
         );
      } catch (err) {
         console.log(err);
      }
      setIsLoading(false);
   };

   const addOneProductFromCart = (productId, productPrice) => {
      setIsLoading(true);
      try {
         dispatch(cartActions.addOneProductToCart(productId, productPrice));
      } catch (err) {
         console.log(err);
      }
      setIsLoading(false);
   };

   useEffect(() => {
      fetchCart();
   }, [dispatch, fetchCart, cart, productDelete, fetch]);

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
         <ScrollView>
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
                              removeOneProductFromCart={
                                 removeOneProductFromCart
                              }
                              addOneProductFromCart={addOneProductFromCart}
                              orderScreen={true}
                           />
                        </View>
                     )}
                     fetchCart
                  />
               )}
            </View>
            <CartArea>
               <View style={styles.deliveryBlock}>
                  <View style={styles.deliveryHeder}>
                     <View style={styles.headerLabel}>
                        <Text style={styles.labelHeaderText}>
                           Споссіб доставки
                        </Text>
                     </View>
                     <View style={styles.headerBottomLabel}>
                        <Text style={styles.headerBottomText}>
                           Самовивіз із відділень поштових операторів
                        </Text>
                     </View>
                  </View>
                  <View style={styles.deliveryBody}>
                     <View style={styles.postAddressBlock}>
                        <View style={styles.imageBlock}>
                           <Image
                              style={styles.image}
                              source={{
                                 uri: `https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/inr0g8d49b8tp3sk70hd`,
                              }}
                           />
                        </View>
                        <View style={styles.postAddressTextBlock}>
                           <Text style={styles.postAddressTextBlockText}>
                              {user.livingPlace}, {user.wareHouse}
                           </Text>
                        </View>
                     </View>
                     <View style={styles.deliveryPrice}>
                        <Text style={{ fontSize: 15 }}>100</Text>
                        <Text> ₴ </Text>
                     </View>
                     <View style={styles.timeToSending}>
                        <Text>Відправим завтра</Text>
                     </View>
                  </View>
                  <View style={styles.deliveryFooter}>
                     <TouchableOpacity
                        onPress={() => {
                           props.navigation.navigate("DeliveryScreen", {
                              params: {
                                 cartId: cartId,
                              },
                           });
                        }}
                     >
                        <View style={styles.buttonChange}>
                           <Text style={styles.buttonChangeText}>Змінити</Text>
                        </View>
                     </TouchableOpacity>
                  </View>
               </View>
            </CartArea>
         </ScrollView>
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
                           Видалити всі
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

   deliveryHeder: { marginBottom: 10 },
   headerLabel: { marginBottom: 5 },
   labelHeaderText: {
      color: "grey",
      fontSize: 13,
   },
   headerBottomLabel: {},
   headerBottomText: { fontSize: 15 },
   deliveryBody: {
      marginBottom: 10,
   },
   postAddressBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 5,
   },
   postAddressTextBlock: { marginLeft: 20 },
   postAddressTextBlockText: {
      width: "65%",
   },
   imageBlock: {
      height: 40,
      width: 40,
   },
   image: {
      height: "100%",
      width: "100%",
   },
   deliveryPrice: {
      flexDirection: "row",
      marginVertical: 5,
      alignItems: "flex-end",
   },
   timeToSending: {
      marginTop: 5,
   },
   deliveryFooter: {
      marginTop: -5,
      paddingHorizontal: 5,
      paddingBottom: 5,
   },
   buttonChange: {
      alignItems: "flex-end",
   },
   buttonChangeText: {
      color: Colors.primaryColor,
      fontWeight: "700",
      fontSize: 17,
   },
});

export default OrderSecond;
