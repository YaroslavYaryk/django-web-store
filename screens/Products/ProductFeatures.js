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

const ProductFeatures = () => {
    return (
        <View style={styles.container}>
            <Text>Product Features</Text>
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
});

export default ProductFeatures;
