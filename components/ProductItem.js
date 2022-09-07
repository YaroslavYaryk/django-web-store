import React, { useState } from "react";
import {
   View,
   Text,
   Image,
   StyleSheet,
   TouchableOpacity,
   TouchableNativeFeedback,
   Platform,
} from "react-native";
// import { HOST, PORT } from "../constants/server";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import RatingItem from "./RatingItem";

const ProductItem = (props) => {
   let TouchableCmp = TouchableOpacity;

   const [likeImage, setLikeImage] = useState("hearto");

   if (Platform.OS === "android" && Platform.Version >= 21) {
      TouchableCmp = TouchableNativeFeedback;
   }

   const likeProduct = () => {
      if (likeImage == "hearto") {
         setLikeImage("heart");
      } else {
         setLikeImage("hearto");
      }
   };
   return (
      <View
         key={props.item.id}
         style={[
            styles.product,
            {
               marginVertical:
                  props.showMethod == "vertical" ? props.margVert : 0,
               paddingVertical: props.showMethod == "vertical" ? 20 : 0,
            },
         ]}
      >
         <View style={styles.touchable}>
            <TouchableCmp onPress={props.onSelect} useForeground>
               <View style={{ alignItems: "center" }}>
                  <View
                     style={[
                        styles.imageContainer,
                        { paddingBottom: 10, marginBottom: 3 },
                     ]}
                  >
                     <Image
                        style={styles.image}
                        source={{
                           uri: `${props.item.photo}`,
                        }}
                     />
                     <View
                        style={{
                           position: "absolute",
                           right: -5,
                           top: 5,
                        }}
                     >
                        <TouchableOpacity
                           onPress={() => {
                              props.likeProduct(props.item.id);
                           }}
                        >
                           <View>
                              <AntDesign
                                 name={
                                    props.likes &&
                                    props.likes.length &&
                                    props.likes.find(
                                       (elem) => elem.post === props.item.id
                                    )
                                       ? "heart"
                                       : "hearto"
                                 }
                                 size={24}
                                 color="red"
                              />
                           </View>
                        </TouchableOpacity>
                        {/* <FontAwesome.Button
                                    name={"-heart"}
                                    backgroundColor="#fff"
                                    color="red"
                                    onPress={{}}
                                ></FontAwesome.Button> */}
                     </View>
                  </View>
                  <View style={styles.productName}>
                     <View>
                        <Text>{props.item.onlyName}</Text>
                     </View>
                  </View>
                  <View style={styles.rating}>
                     <View
                        style={{
                           alignContent: "flex-start",
                           flexDirection: "row",
                        }}
                     >
                        <RatingItem
                           stars={props.item.rating}
                           reviews={props.item.commentCount}
                        />
                        <Text style={{ fontSize: 11, paddingTop: 3 }}>
                           {" "}
                           Відгуки
                        </Text>
                     </View>
                  </View>
                  <View style={styles.details}>
                     <View style={styles.titleBlock}>
                        <Text style={styles.price}>
                           {props.item.price}
                           <Text style={{ fontSize: 16 }}> ₴</Text>
                        </Text>
                        <TouchableOpacity
                           onPress={() => {
                              props.addProductToCart(
                                 props.item.id,
                                 props.item.name,
                                 props.item.photo,
                                 props.item.price
                              );
                              props.setVisible(true);
                           }}
                        >
                           <View>
                              <Feather
                                 name="shopping-cart"
                                 size={24}
                                 color="green"
                              />
                           </View>
                        </TouchableOpacity>
                     </View>
                  </View>
                  <View style={styles.actions}>{props.children}</View>
               </View>
            </TouchableCmp>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   product: {
      shadowColor: "black",
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
      borderRadius: 10,
      backgroundColor: "white",
      height: 250,
      width: "100%",
   },
   titleBlock: {
      // flex: 1,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      // gap: "20px",
      height: 35,
   },
   touchable: {
      borderRadius: 10,
      overflow: "hidden",
      height: "100%",
   },
   imageContainer: {
      // borderWidth: 3,
      width: "80%",
      height: "60%",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: "center",
      // overflow: "hidden",
   },
   image: {
      width: "100%",
      resizeMode: "contain",
      height: "100%",
      position: "relative",
   },
   productName: {
      marginTop: -20,
   },
   rating: {
      marginTop: 10,
   },
   details: {
      alignItems: "center",
      width: "90%",
      height: "15%",
      padding: 10,
   },
   title: {
      fontSize: 18,
   },
   price: {
      fontSize: 20,
      // color: "#888",
   },
   bottomTitle: {
      justifyContent: "space-around",
      flexDirection: "row",
      width: "100%",
   },
   actions: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: "25%",
      paddingHorizontal: 20,
   },
});

export default ProductItem;
