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

const Login = (props) => {
   return (
      <View style={styles.container}>
         <Text>Login</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
});

export default Login;
