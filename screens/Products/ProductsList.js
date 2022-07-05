import {
    Text,
    View,
    ScrollView,
    Image,
    FlatList,
    StyleSheet,
    Button,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/ProductItem";
import Colors from "../../constants/Colors";
import { FlatGrid } from "react-native-super-grid";

const ProductsList = () => {
    const products = useSelector((state) => state.products.products);

    return (
        <View style={styles.wrapper}>
            <FlatGrid
                data={products}
                keyExtractor={(item) => item.id}
                spacing={20}
                renderItem={(itemData) => (
                    <ProductItem
                        item={itemData.item}
                        onSelect={() => {
                            selectItemHandler(
                                itemData.item.id,
                                itemData.item.title
                            );
                        }}
                    ></ProductItem>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
    },
});

export default ProductsList;
