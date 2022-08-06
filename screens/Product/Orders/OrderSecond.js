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
import { useState, useCallback, useEffect, useRef } from "react";
import CartProductItem from "../../../components/CartProductItem";
import Colors from "../../../constants/Colors";
import * as cartActions from "../../../redux-folder/actions/cart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartArea from "../../../components/wrappers/CartArea";
import * as novaPoshtaAction from "../../../redux-folder/actions/novaPoshtaActions";
import * as orderActions from "../../../redux-folder/actions/orderActions";
import * as authActions from "../../../redux-folder/actions/userActions";
import { useIsFocused } from "@react-navigation/native";
import InputRating from "../../../components/InputRating";
import {
   priceMethods,
   priceMethodsList,
} from "../../../constants/priceMethods";
import { AntDesign } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
import CartPopup from "../../../components/wrappers/CartPopup";
import { FontAwesome5 } from "@expo/vector-icons";

const OrderSecond = (props) => {
   const { height, width } = useWindowDimensions();
   const cart = useSelector((state) => state.cart.cartProducts);
   const [isLoading, setIsLoading] = useState(false);
   const [productDelete, setProductDelete] = useState(null);
   const [fetch, setfetch] = useState(0);
   const [showInputCoupon, setShowInputCoupon] = useState(false);
   const [inpCoupon, setInpCoupon] = useState("");
   const [couponError, setCouponError] = useState("");
   const [couponErrorIcon, setCouponErrorIcon] = useState("");
   const [visible, setVisible] = useState(false);

   const [offset, setOffset] = useState(0);
   const scrollViewRef = useRef();

   const slowlyScrollDown = () => {
      const y = offset + 500;
      scrollViewRef.current.scrollTo({ x: offset, y, animated: true });
      setOffset(y);
   };
   const userId = useSelector((state) => state.auth.userId);

   // useEffect(() => {
   //    dispatch(authActions.fetchUserInfo(userId));
   // }, [userId]);

   const user = useSelector((state) => state.auth.user);
   const dispatch = useDispatch();

   const cartId = props.route.params.cartId
      ? props.route.params.cartId
      : props.route.params.params.cartId;

   const coupones = useSelector((state) => state.coupones.coupones);

   const order = useSelector((state) =>
      state.orders.orders.find((elem) => elem.cartId === cartId)
   );

   useEffect(() => {
      dispatch(orderActions.fetchOrders(1, cartId));
      console.log(order);
   }, [inpCoupon]);

   const isFocused = useIsFocused();

   const setWareHouse = async () => {
      const wareHouse = await AsyncStorage.getItem("wareHouse");
      const transformedData = JSON.parse(wareHouse);
      const { CityDescription, CityRef, Description, Ref } = transformedData;
      if (order.place != CityDescription || !user.wareHouse) {
         dispatch(orderActions.addWareHouse(cartId, Description, Ref, CityRef));
         dispatch(authActions.changeUserWareHouse(1, Description));
      }
      if (!order.postDescription) {
         dispatch(orderActions.addWareHouse(cartId, user.wareHouse, -1, -1));
      }
   };

   const deliveryPrice = 100;

   useEffect(() => {
      dispatch(novaPoshtaAction.fetchCityPost(order.place, 1));
      setWareHouse();
      if (
         !Boolean(
            order.recieverFirstName,
            order.recieverLastName,
            order.recieverMiddleName,
            order.recieverPhone
         )
      ) {
         dispatch(
            orderActions.addRecieverInfo(
               cartId,
               user.lastName,
               user.firstName,
               user.middleName,
               user.livingPlace
            )
         );
      }
   }, [isFocused]);

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

   const getTotalDiscount = () => {
      var a = 0;
      for (var i = 0; i < order.coupones.length; i++) {
         a += order.coupones[i].discount;
      }
      return a;
   };

   const answer1 = "Відправимо в понеділок";
   const answer2 = "Відправимо завтра";
   const answer3 = "Відправимо сьогодні";

   var sendingDelay;
   var currDate = new Date();
   var curHours = currDate.getHours();
   var curDayOfWeek = currDate.getDay();
   if (curDayOfWeek == 6 || curDayOfWeek == 7) {
      sendingDelay = answer1;
   } else if (curHours > 16) {
      if (curDayOfWeek == 5) {
         sendingDelay = answer1;
      } else {
         sendingDelay = answer2;
      }
   } else {
      sendingDelay = answer3;
   }

   return (
      <View style={styles.container}>
         <ScrollView ref={scrollViewRef}>
            <View>
               {cart.products && (
                  <FlatList
                     data={cart.products}
                     keyExtractor={(item) => item.productId + Math.random()}
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
                        <Text>{sendingDelay}</Text>
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
            <CartArea>
               <View style={styles.deliveryBlock}>
                  <View style={styles.deliveryHeder}>
                     <View style={styles.headerLabel}>
                        <Text style={styles.labelHeaderText}>Метод оплати</Text>
                     </View>
                  </View>
                  <View style={styles.deliveryBody}>
                     <View style={{ marginTop: -5 }}>
                        <View style={{}}>
                           <Text style={styles.postAddressTextBlockText}>
                              {priceMethods[order.priceMethod]}
                           </Text>
                        </View>
                     </View>
                  </View>
                  <View style={styles.deliveryFooter}>
                     <TouchableOpacity
                        onPress={() => {
                           props.navigation.navigate("PaymentMethodsScreen", {
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
            <CartArea>
               <View style={styles.deliveryBlock}>
                  <View style={styles.deliveryHeder}>
                     <View style={styles.headerLabel}>
                        <Text style={styles.labelHeaderText}>
                           Отримувач замовлення
                        </Text>
                     </View>
                  </View>
                  <View style={styles.deliveryBody}>
                     <View style={{ marginTop: -5 }}>
                        <View style={{ marginLeft: 5 }}>
                           <Text style={styles.postAddressTextBlockText}>
                              {order.recieverastName
                                 ? order.recieverLastName
                                 : user.lastName}{" "}
                              {order.recieverFirstName
                                 ? order.recieverFirstName
                                 : user.firstName}{" "}
                              {order.recieverMiddleName
                                 ? order.recieverMiddleName
                                 : user.middleName}
                           </Text>
                           <Text>
                              {order.recieverPhone
                                 ? order.recieverPhone
                                 : user.phone}
                           </Text>
                        </View>
                     </View>
                  </View>
                  <View style={styles.deliveryFooter}>
                     <TouchableOpacity
                        onPress={() => {
                           props.navigation.navigate("ChangeUserOrderInfo", {
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
            <View style={{ marginLeft: 10, marginTop: 10 }}>
               <View style={{}}>
                  <Text style={{ fontWeight: "600" }}>Купон на знижку</Text>
               </View>
            </View>
            <CartArea style={{}}>
               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "space-between",
                  }}
               >
                  <Text>Додати купон</Text>
                  <AntDesign
                     name={showInputCoupon ? "minus" : "plus"}
                     size={24}
                     color="black"
                     onPress={() => {
                        setShowInputCoupon(!showInputCoupon);
                        slowlyScrollDown();
                     }}
                  />
               </View>
               {showInputCoupon && (
                  <View
                     style={{
                        // marginBottom: 50,
                        marginTop: 20,
                        marginHorizontal: -15,
                        flexDirection: "row",
                     }}
                  >
                     <View style={{ width: "85%" }}>
                        <InputRating
                           id="coupon"
                           label="coupon"
                           keyboardType="default"
                           minLength={2}
                           //  alignTop
                           required
                           autoCapitalize="none"
                           //  errorText="Будь ласка введіть прізвище"
                           login={true}
                           height={50}
                           placeholder="Ваш купон"
                           maxLength={200}
                           ml={20}
                           wdt={"90%"}
                           setText={setInpCoupon}
                        />
                     </View>
                     <View
                        style={{
                           // marginTop: 11,
                           backgroundColor: Colors.primaryColor,
                           alignItems: "center",
                           justifyContent: "center",
                           height: 50,
                           padding: 10,
                           borderRadius: 10,
                        }}
                     >
                        <TouchableOpacity>
                           <AntDesign
                              name={"plus"}
                              size={24}
                              color="black"
                              onPress={() => {
                                 const couponValid = coupones.find(
                                    (elem) => elem.couponCode == inpCoupon
                                 );
                                 const couponInOrder = order.coupones.find(
                                    (elem) => elem.couponCode == inpCoupon
                                 );
                                 if (couponValid && !couponInOrder) {
                                    dispatch(
                                       orderActions.addOrderCoupon(
                                          cartId,
                                          couponValid
                                       )
                                    );
                                    setInpCoupon("");
                                    setShowInputCoupon(!showInputCoupon);
                                    console.log("added");
                                 } else if (couponInOrder) {
                                    setCouponError("Невірний купон");
                                    setCouponErrorIcon("times-circle");
                                    setVisible(!visible);
                                 } else {
                                    console.log("invalid");
                                    setCouponError(
                                       "Цей купон вже використаний"
                                    );
                                    setCouponErrorIcon("times-circle");
                                    setVisible(!visible);
                                 }
                              }}
                           />
                        </TouchableOpacity>
                     </View>
                  </View>
               )}
               {order.coupones.length > 0 && (
                  <View style={{ marginTop: 20 }}>
                     <Text style={{ fontWeight: "600" }}>
                        Використані купони:
                     </Text>
                     <DataTable style={{}}>
                        <DataTable.Header>
                           <DataTable.Title>Купон</DataTable.Title>
                           <DataTable.Title></DataTable.Title>
                           <DataTable.Title></DataTable.Title>

                           <DataTable.Title>Знижка, %</DataTable.Title>
                        </DataTable.Header>
                        {order.coupones.map((elem) => (
                           <View style={{ width: "100%" }}>
                              {/* <Text>{elem.couponCode}</Text>
                           <Text>{elem.discount}</Text> */}

                              <DataTable.Row>
                                 <DataTable.Cell>
                                    <Text>{elem.couponCode}</Text>
                                 </DataTable.Cell>
                                 <DataTable.Cell></DataTable.Cell>
                                 <DataTable.Cell></DataTable.Cell>
                                 <DataTable.Cell>
                                    <Text>{elem.discount}</Text>
                                 </DataTable.Cell>
                              </DataTable.Row>
                           </View>
                        ))}
                     </DataTable>
                  </View>
               )}
            </CartArea>
            <View style={{ margin: 10 }}>
               <Text style={{ fontWeight: "600" }}>
                  Загальна сума замовлення
               </Text>
               <View style={styles.priceBlock}>
                  <Text>Сума</Text>
                  <Text>{cart.totalPrice} ₴ </Text>
               </View>
               <View style={styles.priceBlock}>
                  <Text>Доставка</Text>
                  <Text>{deliveryPrice} ₴ </Text>
               </View>
               <View style={styles.priceBlock}>
                  <Text>Сума з доставкою</Text>
                  <Text>{cart.totalPrice + deliveryPrice} ₴ </Text>
               </View>
               {order.coupones.length > 0 && (
                  <View style={styles.priceBlock}>
                     <Text>Сума з купоном</Text>
                     <Text>
                        {parseFloat(
                           (cart.totalPrice + deliveryPrice) *
                              (1 - getTotalDiscount() / 100)
                        ).toFixed(2)}
                        ₴
                     </Text>
                  </View>
               )}
            </View>
            <View
               style={[
                  styles.buttonOrderBlock,
                  { backgroundColor: Colors.primaryColor, marginBottom: 20 },
               ]}
            >
               <TouchableOpacity
                  onPress={() => {
                     dispatch(
                        orderActions.addOrderTotalPrice(
                           cartId,
                           parseFloat(
                              (cart.totalPrice + deliveryPrice) *
                                 (1 - getTotalDiscount() / 100)
                           ).toFixed(2)
                        )
                     );
                     dispatch(cartActions.deleteAllFromCart());
                     props.navigation.push("BaseFullNavigator");
                  }}
                  style={{
                     flexDirection: "row",
                     alignItems: "flex-end",
                  }}
               >
                  <Text style={styles.orderItem}>Підтвердити замовлення</Text>
               </TouchableOpacity>
            </View>
         </ScrollView>
         <CartPopup
            visible={visible}
            setVisible={setVisible}
            text={couponError}
            iconName={couponErrorIcon}
            color="red"
         />
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
   priceBlock: {
      borderBottomWidth: 1,
      borderColor: "grey",
      padding: 15,
      flexDirection: "row",
      justifyContent: "space-between",
   },
   buttonOrderBlock: {
      // width: "95%",
      marginHorizontal: 20,
      alignItems: "center",
      padding: 10,
      borderRadius: 10,
   },
   orderItem: {
      color: "white",
      fontWeight: "500",
      fontSize: 18,
   },
});

export default OrderSecond;
