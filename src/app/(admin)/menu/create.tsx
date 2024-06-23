import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import React, { useEffect, useState } from 'react'
import Button from '@/src/components/Button'
import Colors from '@/src/constants/Colors'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import {
  useDeleteProduct,
  useInsertProduct,
  useProductDetail,
  useUpdateProduct,
} from '../../api/products'

const CreateProductScreen = () => {
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [image, setImage] = useState<string | null>(null)
  const [errors, setErrors] = useState<string>('')
  const router = useRouter()

  const { id: idString } = useLocalSearchParams()
  const id = idString
    ? parseFloat(typeof idString === 'string' ? idString : idString?.[0])
    : undefined
  const isEdit = !!id

  const { data: productDetail } = useProductDetail(id)
  const createProductMutation = useInsertProduct()
  const updateProductMutation = useUpdateProduct()
  const deleteMutation = useDeleteProduct()

  const defaultPizzaImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png'

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
      setErrors('Price must be a number')
      return false
    }
    return true
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri as string)
    }
  }

  const handleSubmit = () => {
    isEdit ? handleEditProduct() : handleCreateProduct()
  }

  const resetFields = () => {
    setName('')
    setPrice('')
    setImage('')
  }

  const handleCreateProduct = () => {
    if (!validateInput()) {
      return
    }
    createProductMutation.mutate(
      { name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetFields()
          router.back()
        },
      }
    )
  }

  const handleEditProduct = () => {
    if (!validateInput()) {
      return
    }
    updateProductMutation.mutate(
      { id, name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetFields()
          router.back()
        },
      }
    )
  }

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        resetFields()
        router.replace('/(admin)')
      },
    })
  }

  const confirmDelete = () => {
    Alert.alert('Confirm', 'Are you sure want to delete this product?', [
      { text: 'Cancel' },
      { text: 'Delete', style: 'destructive', onPress: handleDelete },
    ])
  }

  useEffect(() => {
    if (productDetail) {
      setName(productDetail.name)
      setPrice(productDetail.price.toString())
      setImage(productDetail.image)
    }
  }, [productDetail])

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `${isEdit ? 'Edit Product' : 'Create Product'} `,
          headerTitleAlign: 'center',
        }}
      />
      <Image
        style={styles.image}
        source={{
          uri: image || defaultPizzaImage,
        }}
      />
      <Text onPress={pickImage} style={styles.selectImageButton}>
        Select Image
      </Text>
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
      <Button title={`${isEdit ? 'Edit' : 'Create'}`} onPress={handleSubmit} />
      {isEdit && (
        <Button title="Delete" type="danger" onPress={confirmDelete} />
      )}
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
    borderRadius: 1000,
  },

  selectImageButton: {
    alignSelf: 'center',
    fontWeight: '700',
    color: Colors.light.tint,
    marginVertical: 10,
  },
})
