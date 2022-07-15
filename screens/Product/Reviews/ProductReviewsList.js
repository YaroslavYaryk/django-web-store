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
} from "react-native";
import Colors from "../../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

const ProductReviewsList = (props) => {
   const scrollY = new Animated.Value(0);
   const diffClamp = Animated.diffClamp(scrollY, 0, 40);
   const translateY = diffClamp.interpolate({
      inputRange: [40, 40],
      outputRange: [0, -40],
   });
   var arrayText = [
      1,
      1,
      1,
      12,
      122,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      22,
      2,
      2,
      2,
      2,
      2,
      22,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
   ];

   return (
      <View style={{ flex: 1 }}>
         <FlatList
            data={arrayText}
            renderItem={({ item }) => <Text>{item}</Text>}
            keyExtractor={(item) => Math.random()}
            onScroll={(e) => {
               if (e.nativeEvent.contentOffset.y > 0) {
                  scrollY.setValue(e.nativeEvent.contentOffset.y);
               }
            }}
         />
         <Animated.View
            style={{
               transform: [{ translateY: translateY }],
               elevation: 10,
               zIndex: 100,
            }}
         >
            <View style={styles.stickyBottomBlock}>
               <View style={styles.stickyBottomOrderBlock}>
                  <TouchableOpacity style={{}}>
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
                              За датою
                           </Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>
               <View style={styles.stickyBottomWriteReviewBlock}>
                  <TouchableOpacity
                     onPress={() => {
                        props.navigation.navigate("ProductReview", {
                           productId: id,
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
      borderWidth: 1,
      borderColor: "red",
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
