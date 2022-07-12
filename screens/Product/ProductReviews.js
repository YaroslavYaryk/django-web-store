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

const ProductReviews = (props) => {
   const productId = props.route.params;
   return (
      <View style={styles.container}>
         <Text>Product Reviews</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
});

export default ProductReviews;
