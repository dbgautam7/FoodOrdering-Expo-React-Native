import { Image, Pressable, StyleSheet, Vibration } from 'react-native'
import { Text } from '@/src/components/Themed'
import Colors from '@/src/constants/Colors'
import { Product } from '@/src/types'
import { Link } from 'expo-router'

const ProductListItem = ({ product }: { product: Product }) => {
  return (
    <Link href={`/menu/${product.id}`} asChild>
      <Pressable
        onPress={() => Vibration.vibrate(100)}
        style={styles.container}
      >
        <Image
          source={{
            uri: product.image || '',
          }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  )
}

export default ProductListItem

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    flex: 1,
    borderRadius: 20,
    maxWidth: '50%',
    backgroundColor: Colors.light.tabIconSelected,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.light.text,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
})
