import {
   Text,
   View,
   ScrollView,
   Image,
   FlatList,
   StyleSheet,
   Animated,
   Button,
   TouchableOpacity,
   ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/ProductItem";
import Colors from "../../constants/Colors";
import { FlatGrid } from "react-native-super-grid";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import { useState, useEffect, useRef, useCallback } from "react";
import * as cartActions from "../../redux-folder/actions/cart";
import CartPopup from "../../components/wrappers/CartPopup";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as productActions from "../../redux-folder/actions/productActions";
import * as likeActions from "../../redux-folder/actions/likeActions";
import { Feather } from "@expo/vector-icons";
import ButtonScrollToTop from "../../components/Filter/ButtonScrollToTop";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductsList = (props) => {
   const products = useSelector((state) => state.products.products);
   const [error, setError] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [fetch, setFetch] = useState(0);
   const [visible, setVisible] = useState(false);
   const [searchValue, setSearchValue] = useState("");
   const [buttonToTopVisible, setButtonToTopVisible] = useState(false);

   const auth = useSelector((state) => state.auth);
   const likes = useSelector((state) => state.likes.productLikes);

   const dispatch = useDispatch();

   const isFocused = useIsFocused();

   const loadProducts = useCallback(async () => {
      setError(null);
      setIsLoading(true);
      try {
         await dispatch(productActions.fetchProducts());
      } catch (err) {
         setError(err.message);
      }
      setIsLoading(false);
   }, [dispatch, setError, setIsLoading]);

   useEffect(() => {
      loadProducts();
   }, [dispatch, loadProducts, isFocused]);

   const loadLikes = useCallback(async () => {
      setError(null);
      setIsLoading(true);
      try {
         await dispatch(likeActions.fetchLikes());
      } catch (err) {
         setError(err.message);
      }
      setIsLoading(false);
   }, [dispatch, setError, setIsLoading]);

   useEffect(() => {
      if (auth.token) {
         loadLikes();
      }
   }, [dispatch, loadLikes, isFocused, fetch]);

   const fadeAnim = useRef(new Animated.Value(0)).current;

   const ref = useRef();

   useEffect(() => {
      props.navigation.setParams({
         fetch: fetch,
      });
   }, [dispatch]);

   const getProductDetails = (id, title) => {
      props.navigation.navigate("ProductDetailsNavigator", {
         screen: "ProductDetails",
         params: {
            productId: id,
            productTitle: title,
         },
      });
   };
   const orders = useSelector((state) => state.orders.orders);

   const addProductToCart = (productId, fullName, image, price) => {
      try {
         dispatch(
            cartActions.addProductToCart(productId, fullName, image, price)
         );
      } catch (err) {}
   };

   const scrollToTop = () => {
      ref.current.scrollToOffset({ offset: 0, animated: true });
   };

   const scrollHandler = (e) => {
      if (e.nativeEvent.contentOffset.y > 300) {
         setButtonToTopVisible(true);
      } else {
         setButtonToTopVisible(false);
      }
      Animated.timing(fadeAnim, {
         toValue: buttonToTopVisible ? 1 : 0, // Animate to opacity: 1 (opaque)
         duration: 200, // Make it take a while
         useNativeDriver: true,
      }).start();
   };

   const likeProductHandle = useCallback(async (productId) => {
      if (!auth.token) {
         AsyncStorage.setItem(
            "redirect",
            JSON.stringify({
               redirectUrl: "BaseFullNavigator",
               productId: "",
            })
         );

         props.navigation.navigate("AuthNavigator", {
            screen: "TopTabNavigator",
         });
      } else {
         setError(null);
         setIsLoading(true);
         try {
            if (likes && likes.find((elem) => elem.post === productId)) {
               var likeId = likes.find((elem) => elem.post === productId).id;
               await dispatch(likeActions.deleteLike(productId, likeId));
            } else {
               await dispatch(likeActions.addLike(productId));
            }
         } catch (err) {
            console.log(err.message);
            setError(err.message);
         }
         setIsLoading(false);
         setFetch(Math.random());
      }
   });

   if (error) {
      return (
         <View style={styles.centered}>
            <Text>An error occured</Text>
            <Button
               title="Try Again"
               onPress={loadProducts}
               color={Colors.primaryColor}
            />
         </View>
      );
   }

   if (isLoading) {
      return (
         <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
         </View>
      );
   }
   if (!products) {
      return (
         <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
         >
            <Text>There are no products</Text>
         </View>
      );
   }

   return (
      <View style={styles.wrapper}>
         <View
            style={{
               marginHorizontal: 10,
               marginTop: 10,
               flexDirection: "row",
               justifyContent: "space-between",
               alignItems: "center",
            }}
         >
            <View style={{ width: "100%" }}>
               <TextInput
                  mode="outlined"
                  value={searchValue}
                  onChangeText={(el) => setSearchValue(el)}
                  label={"Search"}
                  underlineColor="black"
                  onFocus={() => {
                     props.navigation.navigate("SearchNavigator");
                  }}
                  activeOutlineColor="green"
                  activeUnderlineColor="#F2F4F6"
                  left={<TextInput.Icon name="home-search-outline" />}
               />
            </View>
            {/* <View style={{ width: "19%" }}>
               <TouchableOpacity
                  onPress={() => {
                     dispatch(productActions.SearchProducts(searchValue));
                  }}
               >
                  <View
                     style={{
                        backgroundColor: Colors.primaryColor,
                        alignItems: "center",
                        paddingVertical: 20,
                        borderRadius: 10,
                        marginTop: 5,
                     }}
                  >
                     <Text style={{ color: "white", fontSize: 16 }}>
                        Search
                     </Text>
                  </View>
               </TouchableOpacity>
            </View> */}
         </View>
         <FlatGrid
            onScroll={scrollHandler}
            ref={ref}
            data={products}
            keyExtractor={(item) => item.id}
            spacing={20}
            renderItem={(itemData) => (
               <ProductItem
                  item={itemData.item}
                  addProductToCart={addProductToCart}
                  setVisible={setVisible}
                  likes={likes}
                  likeProduct={likeProductHandle}
                  onSelect={() => {
                     getProductDetails(
                        itemData.item.id,
                        itemData.item.onlyName
                     );
                  }}
               ></ProductItem>
            )}
         />
         <CartPopup visible={visible} setVisible={setVisible} />
         <ButtonScrollToTop fadeAnim={fadeAnim} scrollToTop={scrollToTop} />
      </View>
   );
};

export const screenOptions = (navData) => {
   return {
      // headerShown: false,
      headerTitleStyle: {
         fontFamily: "Roboto",
         fontWeight: "700",
         marginLeft: -20,
      },
      headerTitle: "Electron",
      headerLeft: () => (
         <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="electron" color={"white"} iconName="logo-electron" />
         </HeaderButtons>
      ),
   };
};

const styles = StyleSheet.create({
   centered: { flex: 1, justifyContent: "center", alignItems: "center" },
   wrapper: {
      width: "100%",
      marginBottom: 70,
   },
   center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
});

export default ProductsList;
