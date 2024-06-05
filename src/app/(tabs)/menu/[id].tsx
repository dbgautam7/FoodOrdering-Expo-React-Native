import {Image, Pressable, StyleSheet} from 'react-native';
import React, { useState } from 'react';
import {Text, View} from '../../../components/Themed';
import {Stack, useLocalSearchParams} from 'expo-router';
import products from '@/assets/data/products';
import Button from '@/src/components/Button';

const sizes=['S','M', 'L',"XL"]

const ProductDetailScreen = () => {
  const [selectedSize, setSelectedSize]=useState('M')
  const {id} = useLocalSearchParams();
  const product=products.find((item)=>item.id.toString()===id)

  if(!product) {
return <Text>No Products Found!</Text>
  } 

  const addToCart=()=>{
alert("Add to cart clicked")
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{title:`${product?.name}`}} />
      <Image
          source={{
            uri: product.image || '',
          }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text>Select Size</Text>
        <View style={styles.sizes}>
        {sizes.map((item)=>{
          return (
            <Pressable onPress={()=>setSelectedSize(item)} style={[styles.size, {backgroundColor:selectedSize===item ? 'gray':'black'}]}>
              <Text style={styles.sizeText} key={item}>{item}</Text>
            </Pressable>
          )
        })}
        </View>
      <Text style={styles.title}>{product.price}</Text>
      <Button title='Add to cart' onPress={addToCart} />
    </View>
  );
};

export default ProductDetailScreen;


const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop:'auto'
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  sizes:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    marginVertical:16
  },
  size:{
    width:50,
    aspectRatio:1,
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center'
  },
  sizeText:{
  fontSize:20,
  fontWeight:'600'
}
});


