import {FlatList, StyleSheet} from 'react-native';
import {View} from '@/src/components/Themed';
import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';

export default function MenuScreen() {
  return (
    <View>
      <FlatList
        numColumns={2}
        data={products}
        renderItem={({item}) => <ProductListItem product={item} />}
        contentContainerStyle={{
          gap: 10,
          padding: 10,
          borderColor: 'red',
        }}
        columnWrapperStyle={{gap: 10}}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
