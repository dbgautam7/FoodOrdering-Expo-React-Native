import {StyleSheet} from 'react-native';
import React from 'react';
import {Text, View} from '../components/Themed';
import {useLocalSearchParams} from 'expo-router';

const ProductDetailScreen = () => {
  const {id} = useLocalSearchParams();
  return (
    <View>
      <Text>ProductDetailScreen {id}</Text>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({});

//1:02:44
