import Colors from '@/src/constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import { Link, Stack } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'

const MenuStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Orders', headerTitleAlign: 'center' }}
      />
    </Stack>
  )
}

export default MenuStack
