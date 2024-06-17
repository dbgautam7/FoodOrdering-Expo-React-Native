import React from 'react'
import { Text, StyleSheet, Pressable } from 'react-native'

interface IProps {
  title?: string
  onPress?: () => void
  type?: string
}

export default function Button({ title, onPress, type = 'default' }: IProps) {
  return (
    <Pressable
      style={type === 'default' ? styles.defaultButton : styles.dangerButton}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  defaultButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 100,
    elevation: 3,
    backgroundColor: '#60a5fa',
    marginTop: 16,
  },
  dangerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 100,
    elevation: 3,
    backgroundColor: '#ef4444',
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
})
