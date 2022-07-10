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

const Cart = (props) => {
   return (
      <View style={styles.container}>
         <Text>Cart</Text>
      </View>
   );
};

export const screenOptions = (navData) => {
   return {
      headerTitle: "Cart",
   };
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
});

export default Cart;
