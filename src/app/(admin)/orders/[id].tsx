import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '../../../../assets/data/orders'
import OrderListItem from '../../../components/OrderListItem'
import OrderDetailItem from '@/src/components/OrderDetailItem'
import { OrderStatus, OrderStatusList } from '@/src/types'
import Colors from '@/src/constants/Colors'
import { useOrderDetail, useUpdateOrder } from '../../api/orders'

const OrderDetailScreen = () => {
  const { id } = useLocalSearchParams()

  const updateOrderStatusMutation = useUpdateOrder()

  const { data: order, isLoading, error } = useOrderDetail(Number(id))

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to load Order Detail.</Text>
  }

  if (!order) {
    return <Text>Order not found!</Text>
  }

  const updateOrderStatus = (status: OrderStatus) => {
    updateOrderStatusMutation.mutateAsync(
      {
        id: Number(id),
        updatedFields: {
          status: status,
        },
      },
      {
        onSuccess: (res) => {
          Alert.alert('Success', `Order status changed to ${res.status}`)
        },
      }
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: order.id.toString(), headerTitleAlign: 'center' }}
      />
      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderDetailItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: 'bold' }}>Status</Text>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateOrderStatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? 'white' : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
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
