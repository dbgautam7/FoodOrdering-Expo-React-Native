import { ActivityIndicator, Image, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Text, View } from '../../../components/Themed'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import Button from '@/src/components/Button'
import { useCartContext } from '@/src/providers/CartProvider'
import { PizzaSize } from '@/src/types'
import { useProductDetail } from '../../api/products'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailScreen = () => {
  const { addItem } = useCartContext()
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')
  const { id } = useLocalSearchParams()

  const { data: product, error, isLoading } = useProductDetail(Number(id))

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to load Products.</Text>
  }

  if (!product) {
    return <Text>No Products Found!</Text>
  }

  const addToCart = () => {
    if (!product) {
      return
    }
    addItem(product, selectedSize)
    router.push('cart')
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `${product?.name}` }} />
      <Image
        source={{
          uri: product.image || '',
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text>Select Size</Text>
      <View style={styles.sizes}>
        {sizes.map((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => setSelectedSize(item)}
              style={[
                styles.size,
                { backgroundColor: selectedSize === item ? 'green' : 'gray' },
              ]}
            >
              <Text style={styles.sizeText} key={item}>
                {item}
              </Text>
            </Pressable>
          )
        })}
      </View>
      <Text style={styles.title}>{product.price}</Text>
      <Button title="Add to cart" onPress={addToCart} />
    </View>
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
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
