import { supabase } from '@/src/lib/supabase'
import { Product } from '@/src/types'
import { useMutation, useQuery } from '@tanstack/react-query'

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

export const useInsertProduct = () => {
  return useMutation({
    async mutationFn(data: Omit<Product, 'id'>) {
      const { error, data: newProduct } = await supabase
        .from('products')
        .insert({
          name: data.name,
          price: data.price,
          image: data.image,
        })

      if (error) {
        throw error
      }
      return newProduct
    },
    // async onSuccess() {
    //   await queryClient.invalidateQueries(['products'])
    // },
    onError(error) {
      console.log(error)
    },
  })
}
