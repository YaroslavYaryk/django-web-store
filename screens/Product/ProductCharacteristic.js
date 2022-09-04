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
import * as characteristicActions from "../../redux-folder/actions/productCharacteristicActions";
import { useState, useEffect, useCallback } from "react";
import Colors from "../../constants/Colors";

const ProductCharacteristic = (props) => {
   const [error, setError] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

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

   const dispatch = useDispatch();

   const loadCharacteristic = useCallback(async () => {
      setError(null);
      setIsLoading(true);
      try {
         await dispatch(
            characteristicActions.fetchproductCharacteristic(productId)
         );
      } catch (err) {
         setError(err.message);
      }
      setIsLoading(false);
   }, [dispatch, setError, setIsLoading]);

   useEffect(() => {
      const onFocusSub = props.navigation.addListener(
         "focus",
         loadCharacteristic
      );

      return () => {
         onFocusSub;
      };
   }, [loadCharacteristic]);

   useEffect(() => {
      loadCharacteristic();
   }, [dispatch, loadCharacteristic]);

   const source = {
      html: productDetails.description,
   };
   const { width } = useWindowDimensions();

   if (error) {
      return (
         <View style={styles.centered}>
            <Text>An error occured</Text>
            <Button
               title="Try Again"
               onPress={loadCharacteristic}
               color={Colors.primaryColor}
            />
         </View>
      );
   }

   if (isLoading) {
      return (
         <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
         </View>
      );
   }

   return (
      <View style={styles.container}>
         <ScrollView>
            {characteristicArray.map((item) => (
               <CharacteristicItem
                  key={item.label + Math.random()}
                  item={item}
                  navigation={props.navigation}
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
   centered: { flex: 1, justifyContent: "center", alignItems: "center" },
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
