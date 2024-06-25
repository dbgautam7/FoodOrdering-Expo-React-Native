import { FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useCartContext } from '../providers/CartProvider'
import CartListItem from '../components/CartListItem'
import Button from '../components/Button'

const Cart = () => {
  const { items, totalPrice, checkout } = useCartContext()

  return (
    <View style={styles.container}>
      {items?.length ? (
        <View>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <CartListItem cartItem={item} key={item.id} />
            )}
            contentContainerStyle={{ gap: 10 }}
          />
          <Text style={styles.totalPrice}>
            Total Price: ${totalPrice.toFixed(2)}
          </Text>
          <Button onPress={checkout} title="Checkout" />
        </View>
      ) : (
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFound}>No items found in the cart.</Text>
        </View>
      )}

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  notFound: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 100,
    elevation: 3,
    backgroundColor: '#dc2626',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
  },
  totalPrice: {
    fontWeight: '500',
    fontSize: 20,
    color: '#083344',
    marginVertical: 10,
  },
})
