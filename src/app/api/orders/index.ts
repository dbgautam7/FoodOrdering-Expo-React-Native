import { supabase } from '@/src/lib/supabase'
import { useAuth } from '@/src/providers/AuthProvider'
import { Order, Product } from '@/src/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useAdminOrderLists = ({ archived = false }) => {
  const statusFilterBy = archived
    ? ['Delivered']
    : ['New', 'Cooking', 'Delivering']
  return useQuery({
    queryKey: ['orders', { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .in('status', statusFilterBy)
      if (error) {
        throw new Error(error.message)
      }
      return data
    },
  })
}

export const useMyOrders = () => {
  const { session } = useAuth()
  const id = session?.user?.id
  return useQuery({
    queryKey: ['orders', { userId: id }],
    queryFn: async () => {
      if (!id) return null
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', id)
        .order('created_at', { ascending: false })
      if (error) {
        throw new Error(error.message)
      }
      return data as unknown as Order[]
    },
  })
}

export const useOrderDetail = (id: number | undefined) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*))')
        .eq('id', id)
        .single()
      if (error) {
        throw new Error(error.message)
      }
      return data as Order
    },
  })
}

export const useInsertOrder = () => {
  const queryClient = useQueryClient()
  const { session } = useAuth()
  const userId = session?.user.id
  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newProduct } = await supabase
        .from('orders')
        .insert({ user_id: userId, ...data })
        .select()
        .single()

      if (error) {
        throw error
      }
      return newProduct
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    onError(error) {
      console.log(error)
    },
  })
}
function order_items(arg0: number):
  | {
      head?: boolean | undefined
      count?: 'exact' | 'planned' | 'estimated' | undefined
    }
  | undefined {
  throw new Error('Function not implemented.')
}
