import { supabase } from '@/src/lib/supabase'
import { Product } from '@/src/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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

export const useProductDetail = (id: number | undefined) => {
  console.log(id, 'id')
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()
      if (error) {
        throw new Error(error.message)
      }
      return data as Product
    },
  })
}

export const useInsertProduct = () => {
  const queryClient = useQueryClient()
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
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError(error) {
      console.log(error)
    },
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn({ id, ...update }: Product) {
      const { data, error } = await supabase
        .from('products')
        .update(update)
        .eq('id', id)
        .select()

      if (error) {
        throw error
      }
      return data
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ['products'] })
      await queryClient.invalidateQueries({ queryKey: ['products', id] })
    },
    onError(error) {
      console.log(error)
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(id: number | undefined) {
      const { error } = await supabase.from('products').delete().eq('id', id)

      if (error) {
        throw error
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
