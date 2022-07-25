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
import { useWindowDimensions } from "react-native";
import { Audio, Video } from "expo-av";
import { useRef, useState } from "react";

const ProductVideos = (props) => {
   const productId = props.route.params.productId;
   const productDetails = useSelector((state) =>
      state.products.products.find((elem) => elem.id === productId)
   );
   const video = useRef(null);
   const [status, setStatus] = useState({});
   return (
      <View style={styles.container}>
         <Video
            ref={video}
            style={styles.video}
            source={{
               uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={setStatus}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
   video: {
      flex: 1,
      alignSelf: "stretch",
   },
   buttons: {
      margin: 16,
   },
});

export default ProductVideos;
