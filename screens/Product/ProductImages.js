import {
   Text,
   View,
   ScrollView,
   Image,
   StyleSheet,
   Button,
   FlatList,
   TouchableOpacity,
   ActivityIndicator,
} from "react-native";
import TitleSlider from "../../components/TitleSlider";
import { useSelector, useDispatch } from "react-redux";
import { useWindowDimensions } from "react-native";

const ProductImages = (props) => {
   const productId = props.route.params.productId;
   const productDetails = useSelector((state) =>
      state.products.products.find((elem) => elem.id === productId)
   );
   const { width, height } = useWindowDimensions();
   return (
      <View style={styles.container}>
         <View style={styles.imagesBlock}>
            <FlatList
               data={productDetails.photos}
               keyExtractor={(item) => item.image}
               spacing={20}
               renderItem={(itemData) => (
                  <View
                     style={{
                        height,
                        width,
                        justifyContent: "center",
                        alignItems: "center",
                     }}
                  >
                     <Image
                        source={{ uri: itemData.item }}
                        style={styles.imageScroll}
                     />
                  </View>
               )}
            />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
   imagesBlock: {
      height: "100%",
      width: "100%",
   },
   imageScroll: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
   },
});

export default ProductImages;
