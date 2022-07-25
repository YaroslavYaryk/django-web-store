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

const ProductsList = (props) => {
   const products = useSelector((state) => state.products.products);
   const [isLoading, setIsLoading] = useState(false);
   const [fetch, setArr] = useState(0);
   const [visible, setVisible] = useState(true);

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

   return (
      <View style={styles.wrapper}>
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
         <CartPopup
            visible={visible}
            setVisible={setVisible}
            haveOutsideTouch={true}
         />
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
