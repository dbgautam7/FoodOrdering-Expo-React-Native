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
  return useQuery<Order[] | null>({
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
      return data
    },
  })
}
