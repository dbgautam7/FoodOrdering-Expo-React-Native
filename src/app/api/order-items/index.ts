import { supabase } from '@/src/lib/supabase'
import { useMutation } from '@tanstack/react-query'

export const useInsertOrderItems = () => {
  return useMutation({
    async mutationFn(items: any) {
      const { error, data: orderItems } = await supabase
        .from('order_items')
        .insert(items)
        .select()

      console.log(orderItems, 'oooo')

      if (error) {
        throw error
      }
      return orderItems
    },

    onError(error) {
      console.log(error)
    },
  })
}
