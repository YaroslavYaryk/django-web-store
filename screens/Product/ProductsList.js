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

const ProductsList = (props) => {
   const products = useSelector((state) => state.products.products);

   const getProductDetails = (id, title) => {
      props.navigation.navigate("ProductDetailsNavigator", {
         screen: "ProductDetails",
         params: {
            productId: id,
            productTitle: title,
         },
      });
   };

   return (
      <View style={styles.wrapper}>
         <FlatGrid
            data={products}
            keyExtractor={(item) => item.id}
            spacing={20}
            renderItem={(itemData) => (
               <ProductItem
                  item={itemData.item}
                  onSelect={() => {
                     getProductDetails(
                        itemData.item.id,
                        itemData.item.onlyName
                     );
                  }}
               ></ProductItem>
            )}
         />
      </View>
   );
};

export const screenOptions = (navData) => {
   return {
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
});

export default ProductsList;
