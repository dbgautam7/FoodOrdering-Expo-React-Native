import { supabase } from '@/src/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export const useProductLists = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*')
      if (error) {
        throw new Error(error.message)
      }
      return data
    },
  })
}

export const useProductDetail = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()
      if (error) {
        throw new Error(error.message)
      }
      return data
    },
  })
}
