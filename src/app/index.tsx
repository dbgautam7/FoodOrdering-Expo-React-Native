import { View, Text } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import { Link, Stack } from 'expo-router'

const IndexPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Stack.Screen
        options={{ title: 'Welcome', headerTitleAlign: 'center' }}
      />
      <Link href={'/(user)'} asChild>
        <Button title="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button title="Admin" />
      </Link>
      <Link href={'/sign-in'} asChild>
        <Button title="Auth" />
      </Link>
    </View>
  )
}

export default IndexPage
