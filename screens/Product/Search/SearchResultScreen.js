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
   Animated,
   SafeAreaView,
} from "react-native";
import Colors from "../../../constants/Colors";
import { useState, useEffect, useCallback, useRef } from "react";
import * as productActions from "../../../redux-folder/actions/productActions";
import ProductItem from "../../../components/ProductItem";
import { FlatGrid } from "react-native-super-grid";
import { useSelector, useDispatch } from "react-redux";
import { Feather, Octicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import BottomPopup from "../../../components/BottomPopup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWindowDimensions } from "react-native";
import DrawerFilter from "../Filter/DrawerFilter";

const popupList = [
   { id: 0, name: "За датою", action: "date" },
   { id: 1, name: "Від дешевих до дорогих", action: "priceUp" },
   { id: 2, name: "Від дорогих до дешевих", action: "priceDown" },
   { id: 3, name: "Найбільш коментовані", action: "commentMax" },
];

const SearchResultScreen = (props) => {
   const [isShow, setIsShow] = useState(false);
   const [sortMethod, setSortMethod] = useState({
      action: "date",
      name: "За датою",
   });
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const [visible, setVisible] = useState(false);
   const [showMethod, setShowMethod] = useState(2);

   const [currentTab, setCurrentTab] = useState("Home");
   // To get the curretn Status of menu ...
   const [showMenu, setShowMenu] = useState(false);

   const { width } = useWindowDimensions();

   const close = () => {
      setIsShow(false);
   };

   const searchProducts = useSelector((state) => state.products.searchProducts);

   const dispatch = useDispatch();

   const getProductDetails = (id, title) => {
      props.navigation.navigate("ProductDetailsNavigator", {
         screen: "ProductDetails",
         params: {
            productId: id,
            productTitle: title,
         },
      });
   };

   const addProductToCart = (productId, fullName, image, price) => {
      try {
         dispatch(
            cartActions.addProductToCart(productId, fullName, image, price)
         );
      } catch (err) {}
   };

   const searchValue = props.route.params.searchValue;

   useEffect(() => {
      dispatch(productActions.SearchProducts(searchValue));
   }, [searchValue]);

   const scrollY = new Animated.Value(0);
   const diffClamp = Animated.diffClamp(scrollY, -5, 55);
   const translateY = diffClamp.interpolate({
      inputRange: [0, 45],
      outputRange: [0, -45],
   });

   if (isLoading) {
      return (
         <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
         </View>
      );
   }

   if (!isLoading && searchProducts.length === 0) {
      return (
         <View style={styles.centered}>
            <Text>There is no any product!</Text>
         </View>
      );
   }

   const HandleSortProducts = async (sortAction) => {
      await dispatch(productActions.sortProducts(sortAction, searchProducts));
   };

   const closeSideBar = () => {
      Animated.timing(offsetValue, {
         // YOur Random Value...
         toValue: showMenu ? 0 : -230,
         duration: 300,
         useNativeDriver: true,
      }).start();
      setShowMenu(!showMenu);
   };

   const offsetValue = useRef(new Animated.Value(0)).current;
   return (
      <View style={{ flex: 1 }}>
         <SafeAreaView style={[styles.container]}>
            <DrawerFilter
               width={width}
               closeSideBar={closeSideBar}
               resultCount={searchProducts.length}
            />

            <Animated.View
               style={{
                  flexGrow: 1,
                  backgroundColor: "white",
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  paddingHorizontal: 15,
                  paddingVertical: 20,
                  borderRadius: showMenu ? 15 : 0,
                  // Transforming View...
                  transform: [{ translateX: offsetValue }],
               }}
            >
               <Animated.View
                  style={{
                     transform: [{ translateY: translateY }],
                     // elevation: 4,
                     zIndex: 0,
                     marginTop: -20,
                     width: width,
                     marginLeft: -15,
                     // borderWidth: 1,
                  }}
               >
                  <View
                     style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderBottomWidth: 1,
                        borderBottomColor: "grey",
                        paddingVertical: 5,
                        paddingHorizontal: 20,
                        alignItems: "center",
                     }}
                  >
                     <View>
                        <TouchableOpacity
                           style={{}}
                           onPress={() => {
                              setIsShow(!isShow);
                           }}
                        >
                           <View style={styles.stickyBottomOrderBlockInner}>
                              <FontAwesome
                                 name="unsorted"
                                 size={24}
                                 color={Colors.primaryColor}
                              />
                              <View
                                 style={styles.stickyBottomOrderBlockInnerText}
                              >
                                 <Text style={styles.stickyBottomOrderText}>
                                    Сортувати
                                 </Text>
                                 <Text
                                    style={
                                       styles.stickyBottomOrderTextSortMethod
                                    }
                                 >
                                    {sortMethod.name}
                                 </Text>
                              </View>
                           </View>
                        </TouchableOpacity>
                     </View>
                     <View>
                        <TouchableOpacity
                           style={{}}
                           onPress={() => {
                              Animated.timing(offsetValue, {
                                 // YOur Random Value...
                                 toValue: showMenu ? 0 : -230,
                                 duration: 300,
                                 useNativeDriver: true,
                              }).start();

                              //

                              setShowMenu(!showMenu);
                           }}
                        >
                           <View style={styles.stickyBottomOrderBlockInner}>
                              <AntDesign
                                 name="filter"
                                 size={24}
                                 color={Colors.primaryColor}
                              />
                              <View
                                 style={styles.stickyBottomOrderBlockInnerText}
                              >
                                 <Text style={styles.stickyBottomOrderText}>
                                    Фільтр
                                 </Text>
                                 <Text
                                    style={
                                       styles.stickyBottomOrderTextSortMethod
                                    }
                                 >
                                    Знайдено {searchProducts.length} тов...
                                 </Text>
                              </View>
                           </View>
                        </TouchableOpacity>
                     </View>
                     <View>
                        {showMethod == 1 ? (
                           <Octicons
                              name="three-bars"
                              size={24}
                              color={Colors.primaryColor}
                              onPress={() => setShowMethod(2)}
                           />
                        ) : (
                           <Feather
                              name="square"
                              size={24}
                              color={Colors.primaryColor}
                              onPress={() => setShowMethod(1)}
                           />
                        )}
                     </View>
                  </View>
               </Animated.View>
               <View style={{ marginLeft: -15, width }}>
                  {showMethod == 2 ? (
                     <FlatGrid
                        data={searchProducts}
                        keyExtractor={(item) => item.id}
                        spacing={20}
                        renderItem={(itemData) => (
                           <ProductItem
                              item={itemData.item}
                              addProductToCart={addProductToCart}
                              setVisible={setVisible}
                              onSelect={() => {
                                 getProductDetails(
                                    itemData.item.id,
                                    itemData.item.onlyName
                                 );
                              }}
                           ></ProductItem>
                        )}
                     />
                  ) : (
                     <FlatList
                        data={searchProducts}
                        keyExtractor={(item) => item.id}
                        spacing={20}
                        renderItem={(itemData) => (
                           <ProductItem
                              item={itemData.item}
                              addProductToCart={addProductToCart}
                              setVisible={setVisible}
                              onSelect={() => {
                                 getProductDetails(
                                    itemData.item.id,
                                    itemData.item.onlyName
                                 );
                              }}
                              margVert={10}
                              showMethod={
                                 showMethod == 1 ? "vertical" : "horisontal"
                              }
                           ></ProductItem>
                        )}
                     />
                  )}
               </View>
               <SafeAreaView style={{ flex: 1 }}>
                  <BottomPopup
                     show={isShow}
                     title={"Сортування"}
                     animationType={"fade"}
                     closePopup={close}
                     data={popupList}
                     haveOutsideTouch={true}
                     setSortMethod={setSortMethod}
                     sortProducts={HandleSortProducts}
                  />
               </SafeAreaView>
            </Animated.View>
         </SafeAreaView>
      </View>
   );
};

export const screenOptions = (navData) => {
   const props = navData.navigation.getState();

   // if (props.routes[0].params) {
   //    dispatch = props.routes[0].params.dispatch;
   //    setdeleteAll = props.routes[0].params.setdeleteAll;
   //    deleteAll = props.routes[0].params.deleteAll;
   // }

   return {
      headerTitle: "Search",
   };
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   centered: { flex: 1, justifyContent: "center", alignItems: "center" },
   stickyBottomBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
      height: 40,
   },
   stickyBottomOrderBlock: {
      width: "50%",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 0.5,
      borderColor: "grey",
      borderTopLeftRadius: 10,
   },
   stickyBottomOrderBlockInner: {
      flexDirection: "row",
      //   justifyContent: "space-around",
      //   width: "30%",
      alignItems: "center",
      //   marginLeft: 15,
   },
   stickyBottomOrderBlockInnerText: { marginLeft: 10 },
   stickyBottomWriteReviewBlock: {
      width: "50%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.primaryColor,
      borderTopRightRadius: 10,
   },
   stickyBottomOrderText: {
      fontSize: 12,
   },
   stickyBottomWriteReviewText: {
      color: "white",
      fontWeight: "700",
   },
   stickyBottomOrderTextSortMethod: {
      fontSize: 10,
   },
   centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   container: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "flex-start",
   },
});
export default SearchResultScreen;
