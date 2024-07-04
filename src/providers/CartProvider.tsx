import { StyleSheet } from 'react-native'
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react'
import { CartItem, CartType, Order, OrderItem, Product } from '../types'
import { randomUUID } from 'expo-crypto'
import { useInsertOrder } from '../app/api/orders'
import { useRouter } from 'expo-router'
import { useInsertOrderItems } from '../app/api/order-items'
import { initializePaymentSheet, openPaymentSheet } from '../lib/stripe'

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  totalPrice: 0,
  checkout: () => {},
})

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([])

  const insertOrderMutation = useInsertOrder()
  const insertOrderItemsMutation = useInsertOrderItems()

  const router = useRouter()

  const addItem = (product: Product, size: CartItem['size']) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    )

    if (existingItem) {
      updateQuantity(existingItem.id, 1)
      return
    }
    const newCartItems: CartItem = {
      id: randomUUID(),
      product: product,
      product_id: product.id,
      size: size,
      quantity: 1,
    }
    setItems([newCartItems, ...items])
  }

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items
      ?.map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0)
    setItems(updatedItems)
  }
  const totalPrice = items?.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  )

  const clearOrders = () => {
    setItems([])
  }

  const handleCheckout = async () => {
    console.log('called')
    await initializePaymentSheet(Math.floor(totalPrice * 100))
    const isPaid = await openPaymentSheet()
    console.log(isPaid, 'isPaid')
    if (!isPaid) return
    insertOrderMutation.mutate(
      { total: totalPrice },
      {
        onSuccess: (data: Order) => {
          saveOrderItems(data)
        },
      }
    )
  }

  const saveOrderItems = (order: Order) => {
    const orderItems = items?.map((item) => {
      return {
        order_id: order.id,
        product_id: item.product_id,
        size: item.size,
        quantity: item.quantity,
      }
    })

    insertOrderItemsMutation.mutateAsync(orderItems, {
      onSuccess: () => {
        console.log('called==92')
        clearOrders()
        router.push(`/(user)/orders/${order?.id.toString()}`)
      },
    })
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        totalPrice,
        checkout: handleCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider

export const useCartContext = () => useContext(CartContext)
