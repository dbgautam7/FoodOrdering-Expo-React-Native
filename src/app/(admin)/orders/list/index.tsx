import { FlatList, StyleSheet } from 'react-native'
import { Text, View } from '@/src/components/Themed'
import products from '@/assets/data/products'
import ProductListItem from '@/src/components/ProductListItem'
import orders from '@/assets/data/orders'
import OrderListItem from '@/src/components/OrderListItem'

export default function ActiveScreen() {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  )
}

const styles = StyleSheet.create({})
