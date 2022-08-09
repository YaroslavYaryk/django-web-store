import {
   Text,
   View,
   ScrollView,
   Image,
   FlatList,
   StyleSheet,
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
import { useState, useEffect } from "react";
import * as cartActions from "../../redux-folder/actions/cart";
import CartPopup from "../../components/wrappers/CartPopup";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as productActions from "../../redux-folder/actions/productActions";

const ProductsList = (props) => {
   const products = useSelector((state) => state.products.products);
   const [isLoading, setIsLoading] = useState(false);
   const [fetch, setArr] = useState(0);
   const [visible, setVisible] = useState(false);
   const [searchValue, setSearchValue] = useState("");

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
   const dispatch = useDispatch();
   const orders = useSelector((state) => state.orders.orders);

   const addProductToCart = (productId, fullName, image, price) => {
      try {
         dispatch(
            cartActions.addProductToCart(productId, fullName, image, price)
         );
      } catch (err) {}
   };

   if (isLoading) {
      return (
         <View style={styles.center}>
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
            data={products}
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
         <CartPopup visible={visible} setVisible={setVisible} />
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
   wrapper: {
      width: "100%",
   },
   center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
});

export default ProductsList;
