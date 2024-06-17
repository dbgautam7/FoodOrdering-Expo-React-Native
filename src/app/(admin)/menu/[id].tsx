import { Image, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Text, View } from '../../../components/Themed'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@/assets/data/products'
import Button from '@/src/components/Button'
import { useCartContext } from '@/src/providers/CartProvider'
import { PizzaSize } from '@/src/types'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/src/constants/Colors'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailScreen = () => {
  const { addItem } = useCartContext()
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')
  const { id } = useLocalSearchParams()
  const product = products?.find((item) => item.id.toString() === id)

  if (!product) {
    return <Text>No Products Found!</Text>
  }

  const addToCart = () => {
    if (!product) return
    addItem(product, selectedSize)
    router.push('cart')
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: product.name,
          headerTitleAlign: 'center',
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Image
        source={{
          uri: product.image || '',
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
    </View>
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 'auto',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 'auto',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  sizes: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '600',
  },
})
