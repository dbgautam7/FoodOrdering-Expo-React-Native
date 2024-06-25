import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { Text } from '@/src/components/Themed'
import OrderListItem from '@/src/components/OrderListItem'
import { useAdminOrderLists } from '@/src/app/api/orders'

export default function ArchiveScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderLists({ archived: true })

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to load Archived Orders.</Text>
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
