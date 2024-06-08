import Colors from '@/src/constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import { Link, Stack } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'

const MenuStack = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <AntDesign
                  name="shoppingcart"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Menu' }} />
    </Stack>
  )
}

export default MenuStack
