import { View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '../../components/Button'
import Colors from '../../constants/Colors'
import { Link, Stack } from 'expo-router'
import { supabase } from '@/src/lib/supabase'

const SignInScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = async () => {
    setIsSubmitting(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    console.log(data, error, '==========15 in sign in page')
    if (error) Alert.alert(error.name, error.message)
    setIsSubmitting(false)
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: 'Sign in', headerTitleAlign: 'center' }}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        style={styles.input}
        secureTextEntry
      />

      <Button
        disabled={isSubmitting}
        onPress={handleLogin}
        title={`${isSubmitting ? 'Signing In...' : 'Sign In'} `}
      />
      <Link href="/sign-up" style={styles.textButton}>
        Create an account
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
})

export default SignInScreen
