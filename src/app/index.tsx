import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import { Link, Redirect, Stack } from 'expo-router'
import { useAuth } from '../providers/AuthProvider'
import { supabase } from '../lib/supabase'

const IndexPage = () => {
  const { session, isLoading, isAdmin } = useAuth()

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (!session) {
    return <Redirect href={'/sign-in'} />
  }

  if (!isAdmin) {
    return <Redirect href={'/(user)'} />
  }

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
      <Button onPress={() => supabase.auth.signOut()} title="Sign Out" />
    </View>
  )
}

export default IndexPage
