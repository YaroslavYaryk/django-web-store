import {
   Text,
   View,
   ScrollView,
   Image,
   StyleSheet,
   Button,
   TouchableOpacity,
   SafeAreaView,
   FlatList,
   Animated,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import Colors from "../../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import ReviewItem from "../../../components/ReviewItem";
import BottomPopup from "../../../components/BottomPopup";
import sortingDict from "../../../constants/productsReviewsSort";

const popupList = [
   { id: 0, name: "За датою", action: "date" },
   { id: 1, name: "Найбільш корисні", action: "likesCount" },
   { id: 2, name: "З фото та відео", action: "photos" },
];

const ProductReviewsList = (props) => {
   const [isShow, setIsShow] = useState(false);
   const [sortMethod, setSortMethod] = useState({
      action: "date",
      name: "За датою",
   });
   const productId = props.route.params.productId;
   var [productReViews, setProductsReviews] = useState(
      useSelector((state) => state.productReviews.productReviews)
   );
   // productReViews.sort((a, b) => (a.date > b.date ? 1 : -1));
   useEffect(() => {
      setProductsReviews(sortingDict[sortMethod.action](productReViews));
   }, [sortMethod]);

   const scrollY = new Animated.Value(0);
   const diffClamp = Animated.diffClamp(scrollY, 0, 40);
   const translateY = diffClamp.interpolate({
      inputRange: [40, 40],
      outputRange: [0, -40],
   });

   const close = () => {
      setIsShow(false);
   };

   return (
      <View style={{ flex: 1 }}>
         {productReViews && (
            <FlatList
               data={productReViews}
               renderItem={(itemData) => (
                  <View
                     style={{
                        borderWidth: 0,
                        shadowColor: "grey",
                        shadowOpacity: 0.26,
                        shadowOffset: { width: 2, height: 2 },
                        shadowRadius: 8,
                        elevation: 5,
                     }}
                  >
                     <ReviewItem item={itemData.item}></ReviewItem>
                  </View>
               )}
               keyExtractor={(item) => Math.random()}
               onScroll={(e) => {
                  if (e.nativeEvent.contentOffset.y > 0) {
                     scrollY.setValue(e.nativeEvent.contentOffset.y);
                  }
               }}
            />
         )}
         <Animated.View
            style={{
               transform: [{ translateY: translateY }],
               elevation: 10,
               zIndex: 100,
            }}
         >
            <View style={styles.stickyBottomBlock}>
               <View style={styles.stickyBottomOrderBlock}>
                  <TouchableOpacity style={{}} onPress={() => setIsShow(true)}>
                     <View style={styles.stickyBottomOrderBlockInner}>
                        <FontAwesome
                           name="unsorted"
                           size={24}
                           color={Colors.primaryColor}
                        />
                        <View style={styles.stickyBottomOrderBlockInnerText}>
                           <Text style={styles.stickyBottomOrderText}>
                              Сортувати
                           </Text>
                           <Text style={styles.stickyBottomOrderTextSortMethod}>
                              {sortMethod.name}
                           </Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>
               <View style={styles.stickyBottomWriteReviewBlock}>
                  <TouchableOpacity
                     onPress={() => {
                        props.navigation.navigate("ProductReview", {
                           productId: productId,
                        });
                     }}
                  >
                     <Text style={styles.stickyBottomWriteReviewText}>
                        НАПИСАТИ ВІДГУК
                     </Text>
                  </TouchableOpacity>
               </View>
            </View>
         </Animated.View>
         <SafeAreaView style={{ flex: 1 }}>
            <BottomPopup
               show={isShow}
               title={"Сортування"}
               animationType={"fade"}
               closePopup={close}
               data={popupList}
               haveOutsideTouch={true}
               setSortMethod={setSortMethod}
            />
         </SafeAreaView>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
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
      justifyContent: "space-around",
      width: "50%",
      alignItems: "center",
   },
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
});

export default ProductReviewsList;
