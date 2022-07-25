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
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";

const CartProductItem = (props) => {
   const [dropdownVisible, setDropdownVisible] = useState(false);
   const [productCount, setProductCount] = useState(props.item.count);
   const changeProductCount = (operation) => {
      if (operation == "plus") {
         setProductCount(productCount + 1);
      } else {
         if (productCount > 1) {
            setProductCount(productCount - 1);
         }
      }
   };

   return (
      <View style={styles.container}>
         <View style={styles.headerBlock}>
            <View style={styles.imageContainer}>
               <Image
                  style={styles.image}
                  source={{
                     uri: `${props.item.image}`,
                  }}
               />
            </View>
            <View style={styles.productNameBlock}>
               <View style={styles.productNameBlockInner}>
                  <Text>{props.item.fullName}</Text>
               </View>
            </View>
         </View>
         <View style={styles.countPriceBlock}>
            <View style={styles.countBlock}>
               <TouchableOpacity
                  style={[styles.countItem]}
                  onPress={() => {
                     changeProductCount("minus");
                  }}
               >
                  <AntDesign name="minus" size={20} color="grey" />
               </TouchableOpacity>
               <Text style={[styles.countItem]}>{props.item.count}</Text>

               <TouchableOpacity
                  style={[styles.countItem]}
                  onPress={() => {
                     changeProductCount("plus");
                  }}
               >
                  <AntDesign name="plus" size={20} color={"green"} />
               </TouchableOpacity>
            </View>
            <View style={styles.PriceBlock}>
               <Text style={styles.priceText}>
                  {props.item.price * props.item.count}
               </Text>
               <Text style={{ fontSize: 13 }}>₴</Text>
            </View>
         </View>
         <View style={styles.eventButtonBlock}>
            <TouchableOpacity
               onPress={() => {
                  setDropdownVisible(!dropdownVisible);
               }}
            >
               <Entypo name="dots-three-vertical" size={18} color={"green"} />
            </TouchableOpacity>
         </View>
         {dropdownVisible && (
            <View style={styles.dropDownBlock}>
               <View>
                  <View>
                     <TouchableOpacity
                        onPress={() => {
                           props.removeProductFromCart(
                              props.item.productId,
                              props.item.price * props.item.count
                           );
                           setDropdownVisible(!dropdownVisible);
                           props.setProductDelete(props.item.productId);
                        }}
                     >
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>
                           Видалити з корзини
                        </Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      // marginVertical: 10,
      // paddingTop: 20,
      // paddingBottom: 10,
      // paddingHorizontal: 10,
      marginHorizontal: 10,
      // borderWidth: 1,
      position: "relative",
   },
   headerBlock: { flexDirection: "row" },
   imageContainer: {
      width: "50%",
      height: 100,
      // borderTopLeftRadius: 10,
      // borderTopRightRadius: 10,
      alignItems: "center",
      // overflow: "hidden",
   },
   image: {
      width: "100%",
      resizeMode: "contain",
      height: "100%",
   },
   productNameBlock: { width: "45%" },
   productNameBlockInner: {
      width: "100%",
   },
   countPriceBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
   },
   countBlock: {
      flexDirection: "row",
      padding: 5,
      alignItems: "center",
   },
   countItem: {
      marginHorizontal: 10,
   },
   PriceBlock: {
      flexDirection: "row",
      alignItems: "flex-end",
   },
   priceText: {
      marginRight: 3,
      fontSize: 16,
      fontWeight: "700",
   },
   eventButtonBlock: {
      position: "absolute",
      top: 0,
      right: -5,
   },
   dropDownBlock: {
      position: "absolute",
      top: 20,
      right: -5,
      width: 170,
      borderWidth: 1,
      borderColor: "grey",
      backgroundColor: "white",
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius: 10,
   },
});

export default CartProductItem;
