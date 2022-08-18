import {
    Text,
    View,
    ScrollView,
    Image,
    FlatList,
    StyleSheet,
    Animated,
    Button,
    TouchableOpacity,
    ActivityIndicator,
 } from "react-native";
import { Feather } from '@expo/vector-icons'; 
import Colors from "../../constants/Colors";



const ButtonScrollToTop = (props) => {
   console.log(props.bottom)
    return ( <Animated.View style={[styles.buttonScrollToTop, {opacity:props.fadeAnim, bottom:props.bottom?props.bottom:70 }]}><TouchableOpacity onPress={()=>{
        props.scrollToTop()

     }}><Feather name="chevron-up" size={30} color="white" /></TouchableOpacity></Animated.View> );
}

const styles = StyleSheet.create({
   
    buttonScrollToTop:{
       position: 'absolute',
      //  bottom: 0,
       right: 20, 
       padding:10,
       // paddingVertical:18,
       backgroundColor:Colors.primaryColor,
       borderRadius:30
 
    }
 });
 
 
export default ButtonScrollToTop;