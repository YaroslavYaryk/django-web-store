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
import TitleSlider from "../../components/TitleSlider";

const ProductVideos = (props) => {
   const productId = props.route.params.productId;

   return (
      <View style={styles.container}>
         <Text>Product Videos</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
});

export default ProductVideos;
