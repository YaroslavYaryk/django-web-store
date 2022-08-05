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
import {
   priceMethods,
   priceMethodsList,
} from "../../../constants/priceMethods";
import Colors from "../../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import RadioButtonRN from "radio-buttons-react-native";
import * as orderActions from "../../../redux-folder/actions/orderActions";
import { useState } from "react";
import ButtonSave from "../../../components/ButtonSave";

const PaymentMethodsScreen = (props) => {
   const cartId = props.route.params.cartId
      ? props.route.params.cartId
      : props.route.params.params.cartId;
   const order = useSelector((state) =>
      state.orders.orders.find((elem) => elem.cartId === cartId)
   );
   const dispatch = useDispatch();

   const [pickedMethod, setPickedMethod] = useState(order.priceMethod);

   const saveResult = () => {
      dispatch(orderActions.changePaymentMethod(cartId, pickedMethod));
      props.navigation.navigate("OrderFull", { params: { cartId: cartId } });
   };

   return (
      <View style={{ marginHorizontal: 10, marginTop: 20, marginBottom: 10 }}>
         <RadioButtonRN
            initial={order.priceMethod ? order.priceMethod : 2}
            activeColor={Colors.primaryColor}
            circleSize={10}
            data={priceMethodsList}
            selectedBtn={(e) => {
               setPickedMethod(e.id);
            }}
         />
         <ButtonSave save={saveResult} />
      </View>
   );
};

const styles = StyleSheet.create({});

export default PaymentMethodsScreen;
