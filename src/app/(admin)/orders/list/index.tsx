import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
// import orders from '@/assets/data/orders'
import OrderListItem from '@/src/components/OrderListItem'
import { useAdminOrderLists } from '@/src/app/api/orders'
import { Text } from '@/src/components/Themed'

export default function ActiveScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderLists({ archived: false })

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
