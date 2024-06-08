import { StyleSheet } from 'react-native'
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react'
import { CartItem, CartType, Product } from '../types'
import { randomUUID } from 'expo-crypto'

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
})

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([])

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
    console.log(itemId, amount, '---')
    const updatedItems = items
      ?.map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0)
    setItems(updatedItems)
  }
  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider

export const useCartContext = () => useContext(CartContext)

const styles = StyleSheet.create({})
