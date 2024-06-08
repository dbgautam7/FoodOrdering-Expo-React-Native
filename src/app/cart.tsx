import { FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useCartContext } from '../providers/CartProvider'
import CartListItem from '../components/CartListItem'

const cart = () => {
  const { items } = useCartContext()
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <CartListItem cartItem={item} key={item.id} />
        )}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default cart

const styles = StyleSheet.create({})
