import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { Text, View } from '@/src/components/Themed'
import ProductListItem from '@/src/components/ProductListItem'
import { useProductLists } from '../../api/products'

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductLists()

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to load Products.</Text>
  }
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
