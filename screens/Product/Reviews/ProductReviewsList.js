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
   ActivityIndicator,
   Animated,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useCallback } from "react";
import Colors from "../../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import ReviewItem from "../../../components/ReviewItem";
import BottomPopup from "../../../components/BottomPopup";
import sortingDict from "../../../constants/productsReviewsSort";
import * as reviewActions from "../../../redux-folder/actions/productReviewsActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const popupList = [
   { id: 0, name: "За датою", action: "date" },
   { id: 1, name: "Найбільш корисні", action: "likesCount" },
   { id: 2, name: "З фото та відео", action: "photos" },
];

const ProductReviewsList = (props) => {
   const [isShow, setIsShow] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(false);

   const [sortMethod, setSortMethod] = useState({
      action: "date",
      name: "За датою",
   });
   const productId = props.route.params.productId;
   var productReViews = useSelector(
      (state) => state.productReviews.productReviews
   );

   const dispatch = useDispatch();

   // const fetchReviews = useCallback(async () => {
   //    setError(null);
   //    setIsLoading(true);
   //    try {
   //       await dispatch(reviewActions.fetchReviews());
   //    } catch (err) {
   //       setError(err.message);
   //    }
   //    setIsLoading(false);
   // }, [dispatch, setError, setIsLoading]);

   // useEffect(() => {
   //    fetchReviews();
   // }, [dispatch, fetchReviews]);

   const sortReviews = useCallback(async () => {
      setError(null);
      setIsLoading(true);
      try {
         var orderMethod = await AsyncStorage.getItem("sortAction");

         await dispatch(reviewActions.sortReviews(orderMethod, productReViews));
      } catch (err) {
         setError(err.message);
      }
      setIsLoading(false);
   }, [dispatch, setError, setIsLoading]);

   useEffect(() => {
      sortReviews();
   }, [dispatch, sortReviews, sortMethod]);

   const scrollY = new Animated.Value(0);
   const diffClamp = Animated.diffClamp(scrollY, 0, 40);
   const translateY = diffClamp.interpolate({
      inputRange: [40, 40],
      outputRange: [0, -40],
   });

   const close = () => {
      setIsShow(false);
   };

   if (isLoading) {
      return (
         <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
         </View>
      );
   }

   // if (error) {
   //    return (
   //       <View style={styles.centered}>
   //          <Text>An error occured</Text>
   //          <Button
   //             title="Try Again"
   //             onPress={loadProducts}
   //             color={Colors.primaryColor}
   //          />
   //       </View>
   //    );
   // }

   if (!isLoading && productReViews.length === 0) {
      return (
         <View style={styles.centered}>
            <Text>There is no any product, please add some!</Text>
         </View>
      );
   }

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
   centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
});

export default ProductReviewsList;
