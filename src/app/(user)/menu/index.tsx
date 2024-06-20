import { FlatList, StyleSheet } from 'react-native'
import { View } from '@/src/components/Themed'
import products from '@/assets/data/products'
import ProductListItem from '@/src/components/ProductListItem'
import { useEffect } from 'react'
import { supabase } from '@/src/lib/supabase'

export default function MenuScreen() {
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*')
    }
    fetchProducts()
  }, [])
  return (
    <View>
      <FlatList
        numColumns={2}
        data={products}
        renderItem={({ item }) => (
          <ProductListItem product={item} key={item.id} />
        )}
        contentContainerStyle={{
          gap: 10,
          padding: 10,
          borderColor: 'red',
        }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
