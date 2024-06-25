import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { Text } from '@/src/components/Themed'
import OrderListItem from '@/src/components/OrderListItem'
import { useMyOrders } from '../../api/orders'

export default function OrderScreen() {
  const { data: orders, isLoading, error } = useMyOrders()
  console.log('🚀 ~ OrderScreen ~ orders:', orders)

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to load Products.</Text>
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  )
}

const styles = StyleSheet.create({})
