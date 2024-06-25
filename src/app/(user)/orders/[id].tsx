import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '../../../../assets/data/orders'
import OrderListItem from '../../../components/OrderListItem'
import OrderDetailItem from '@/src/components/OrderDetailItem'
import { useMyOrders, useOrderDetail } from '../../api/orders'
import { Order } from '@/src/types'

const OrderDetailScreen = () => {
  const { id } = useLocalSearchParams()

  const { data: order, isLoading, error } = useOrderDetail(Number(id))

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to load Orders.</Text>
  }

  if (!order) {
    return <Text>Order not found!</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: order?.id?.toString(), headerTitleAlign: 'center' }}
      />
      <FlatList
        data={order?.order_items}
        renderItem={({ item }) => <OrderDetailItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
})

export default OrderDetailScreen
