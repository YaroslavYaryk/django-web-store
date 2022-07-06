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

const ProductCharacteristic = (props) => {
    const productId = props.route.params.productId;
    console.log(productId);
    return (
        <View style={styles.container}>
            <TitleSlider
                active={"characteristic"}
                productId={productId}
                navigation={props.navigation}
                // scrollTo={140}
            />
            <Text>Product Characteristic</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});

export default ProductCharacteristic;
