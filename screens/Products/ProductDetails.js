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
import { SliderBox } from "react-native-image-slider-box";
import { Platform } from "react-native";
import { ViewPropTypes } from "deprecated-react-native-prop-types";

const ProductDetails = (props) => {
    const productId = props.route.params.productId;
    const eventDetails = useSelector((state) =>
        state.products.products.find((elem) => elem.id === productId)
    );
    return (
        <View style={styles.container}>
            <SliderBox
                images={[
                    "https://cdn11.bigcommerce.com/s-ss31ap/images/stencil/1280x1280/products/7739/27700/41oKylGa%25252ByL__23085.1630999913.jpg?c=2",
                    "https://content.rozetka.com.ua/goods/images/big/163386254.jpg",
                    "https://cdn11.bigcommerce.com/s-ss31ap/images/stencil/1280x1280/products/7739/27700/41oKylGa%25252ByL__23085.1630999913.jpg?c=2",
                ]}
            />
        </View>
    );
};

export const screenOptions = (navData) => {
    return {
        headerTitle: navData.route.params.productTitle,
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default ProductDetails;
