import Colors from '@/src/constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import { Link, Stack } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'

const MenuStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href="/(admin)/menu/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus-square-o"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  )
}

export default MenuStack
