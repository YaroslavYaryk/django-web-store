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

const Categories = (props) => {
   return (
      <View style={styles.container}>
         <Text>Product Categories</Text>
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
