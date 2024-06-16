import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Button from '@/src/components/Button'
import Colors from '@/src/constants/Colors'

const CreateProductScreen = () => {
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [errors, setErrors] = useState<string>('')

  const validateInput = () => {
    setErrors('')
    if (!name) {
      setErrors('Name is required')
      return false
    }
    if (!price) {
      setErrors('Price is required')
      return false
    }

    if (isNaN(parseFloat(price))) {
      setErrors('Price is a number')
      return false
    }
    return true
  }

  const handleCreateProduct = () => {
    if (!validateInput()) {
      return
    }
    console.log('product')

    setName('')
    setPrice('')
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png',
        }}
      />
      <Text style={styles.selectImageButton}>Select Image</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Enter name"
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        onChangeText={setPrice}
        value={price}
        style={styles.input}
        placeholder="Enter price"
        keyboardType="numeric"
      />
      <Text style={styles.error}>{errors}</Text>
      <Button title="Create" onPress={handleCreateProduct} />
    </View>
  )
}

export default CreateProductScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  label: {
    color: 'gray',
    fontSize: 16,
  },
  input: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 15,
    marginTop: 5,
  },
  error: {
    color: 'red',
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
  },

  selectImageButton: {
    alignSelf: 'center',
    fontWeight: '700',
    color: Colors.light.tint,
    marginVertical: 10,
  },
})
