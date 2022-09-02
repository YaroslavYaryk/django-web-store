import {
   Text,
   View,
   ScrollView,
   Image,
   StyleSheet,
   Button,
   TouchableOpacity,
   ActivityIndicator,
   Animated,
} from "react-native";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FlatGrid } from "react-native-super-grid";
import CategoryItem from "../../../components/CategoryItem";
import Colors from "../../../constants/Colors";
import ButtonScrollToTop from "../../../components/Filter/ButtonScrollToTop";

const Categories = (props) => {
   const categories = useSelector((state) => state.categories.categories);

   const [isLoading, setIsLoading] = useState(false);
   const [visible, setVisible] = useState(false);
   const [buttonToTopVisible, setButtonToTopVisible] = useState(false);

   const fadeAnim = useRef(new Animated.Value(0)).current;

   const ref = useRef();

   if (isLoading) {
      return (
         <View style={styles.center}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
         </View>
      );
   }
   if (!categories) {
      return (
         <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
         >
            <Text>There are no category</Text>
         </View>
      );
   }

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

   const getCategoryProducts = (productType) => {
      props.navigation.navigate("CategoryProducts", {
         productType: productType,
      });
   };

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
         ></View>
         <FlatGrid
            onScroll={scrollHandler}
            data={categories}
            keyExtractor={(item) => item.id}
            spacing={20}
            renderItem={(itemData) => (
               <CategoryItem
                  item={itemData.item}
                  onSelect={() => {
                     getCategoryProducts(itemData.item.name);
                  }}
               ></CategoryItem>
            )}
         />
         {/* <CartPopup visible={visible} setVisible={setVisible} /> */}
         <ButtonScrollToTop fadeAnim={fadeAnim} scrollToTop={scrollToTop} />
      </View>
   );
};

export const screenOptions = (navData) => {
   return {
      headerTitle: "Categories",
   };
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
});

export default Categories;
