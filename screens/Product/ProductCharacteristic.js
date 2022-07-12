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
import TitleSlider from "../../components/TitleSlider";
import { useSelector, useDispatch } from "react-redux";
import getCharacteristicArray from "../../static/getCharacteristicArray";
import CharacteristicItem from "../../components/CharacteristicItem";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";

const ProductCharacteristic = (props) => {
   const productId = props.route.params.productId;
   const productDetails = useSelector((state) =>
      state.products.products.find((elem) => elem.id === productId)
   );
   const prodCharacteristic = useSelector(
      (state) => state.prodCharacteristic.characteristics
   );
   var characteristicArray = getCharacteristicArray(
      prodCharacteristic,
      productDetails
   );

   const source = {
      html: productDetails.description,
   };
   const { width } = useWindowDimensions();

   return (
      <View style={styles.container}>
         <ScrollView>
            {characteristicArray.map((item) => (
               <CharacteristicItem
                  key={item.label}
                  item={item}
               ></CharacteristicItem>
            ))}
            <View style={styles.fullInfo}>
               <View style={styles.fullInfoInner}>
                  <Text
                     style={{
                        fontWeight: "700",
                        marginBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: "grey",
                     }}
                  >
                     ОПИС
                  </Text>
                  <RenderHtml source={source} contentWidth={width} />
               </View>
            </View>
         </ScrollView>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
   fullInfo: {
      marginTop: 10,
   },
   fullInfoInner: {
      paddingHorizontal: 20,
   },
});

export default ProductCharacteristic;
