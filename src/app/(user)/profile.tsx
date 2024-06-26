import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '@/src/components/Button'
import { supabase } from '@/src/lib/supabase'

const Profile = () => {
  return (
    <View style={styles.container}>
      <Button onPress={() => supabase.auth.signOut()} title="Sign Out" />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
})
