import { Image, Pressable, StyleSheet, Vibration } from 'react-native'
import { Text } from '@/src/components/Themed'
import Colors from '@/src/constants/Colors'
import { Product } from '@/src/types'
import { Link, useSegments } from 'expo-router'
import RemoteImage from './RemoteImage'

const ProductListItem = ({ product }: { product: Product }) => {
  const segments = useSegments()
  const defaultPizzaImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png'
  return (
    <Link href={`${segments[0]}/menu/${product.id}`} asChild>
      <Pressable
        onPress={() => Vibration.vibrate(100)}
        style={styles.container}
      >
        <RemoteImage
          path={product?.image}
          fallback={defaultPizzaImage}
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
    width: 100,
    height: 100,
    aspectRatio: 1,
  },
})
