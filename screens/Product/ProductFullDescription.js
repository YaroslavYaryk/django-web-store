import {
   Text,
   View,
   ScrollView,
   Image,
   StyleSheet,
   Button,
   TouchableOpacity,
   ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";

const ProductFullDescription = (props) => {
   const productId = props.route.params.productId;
   const productDetails = useSelector((state) =>
      state.products.products.find((elem) => elem.id === productId)
   );

   const source = {
      html: productDetails.description,
   };

   const { width } = useWindowDimensions();

   return (
      <View style={styles.container}>
         <ScrollView>
            <RenderHtml source={source} contentWidth={width} />
         </ScrollView>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      margin: 10,
      flex: 1,
   },
});

export default ProductFullDescription;
