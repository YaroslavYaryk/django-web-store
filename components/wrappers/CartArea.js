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
} from "react-native";

const CartArea = (props) => {
   return <View style={styles.wrpper}>{props.children}</View>;
};

const styles = StyleSheet.create({
   wrpper: {
      borderWidth: 0.5,
      padding: 10,
      margin: 10,
      borderColor: "grey",
      borderRadius: 5,
   },
});

export default CartArea;
