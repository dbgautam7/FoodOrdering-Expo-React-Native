export type Product = {
  id?: number | undefined
  image: string | null
  name: string
  price: number
}

export type PizzaSize = 'S' | 'M' | 'L' | 'XL'

export type CartItem = {
  id: string
  product: Product
  product_id: number
  size: PizzaSize
  quantity: number
}

export const OrderStatusList: OrderStatus[] = [
  'New',
  'Cooking',
  'Delivering',
  'Delivered',
]

export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered'

export type Order = {
  id: number
  created_at: string
  total: number
  user_id: string
  status: OrderStatus

  order_items?: OrderItem[]
}

export type OrderItem = {
  id: number
  product_id: number
  products: Product
  order_id: number
  size: PizzaSize
  quantity: number
}

export type Profile = {
  id: string
  group: string
}

export type CartType = {
  items: CartItem[]
  addItem: (product: Product, size: CartItem['size']) => void
  updateQuantity: (itemId: string, amount: -1 | 1) => void
  totalPrice: number
}

export interface IProfile {
  uuid: string
  updated_at: string | Date // Using string to represent the timestamp with time zone
  username: string
  full_name: string
  avatar_url: string
  website: string
  group: string
}
