import { Image, StyleSheet } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import { Product } from '@/src/types';



const ProductListItem = ({ product }: {product:Product}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: product.image || '',
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default ProductListItem

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.light.tint,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});
