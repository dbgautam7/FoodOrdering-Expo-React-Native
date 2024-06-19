import 'react-native-url-polyfill/auto'
import * as SecureStore from 'expo-secure-store'
import { createClient } from '@supabase/supabase-js'

const ExpoSecureStoreAdapter = {
  getItem: async (key: string) => {
    return key && (await SecureStore?.getItemAsync(key))
  },
  setItem: async (key: string, value: string) => {
    return key && (await SecureStore?.setItemAsync(key, value))
  },
  removeItem: async (key: string) => {
    return key && (await SecureStore?.deleteItemAsync(key))
  },
}

const supabaseUrl = 'https://fmealzupvswkbeyisxkt.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZWFsenVwdnN3a2JleWlzeGt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3Nzc4NzQsImV4cCI6MjAzNDM1Mzg3NH0.uOGeketEvxVoN5-fEyqQk3faNylib0Wwl69rH2YVFMA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
