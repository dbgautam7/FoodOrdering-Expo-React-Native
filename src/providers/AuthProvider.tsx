import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { supabase } from '../lib/supabase'
import { Session } from '@supabase/auth-js'
import { Alert } from 'react-native'
import { IProfile } from '../types'

type AuthData = {
  session: Session | null
  isLoading: boolean
  profile: IProfile | null
  isAdmin: boolean
}
const AuthContext = createContext<AuthData>({
  session: null,
  isLoading: false,
  profile: null,
  isAdmin: false,
})

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [profile, setProfile] = useState<IProfile | null>(null)
  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true)
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      if (error) Alert.alert(error.name, error.message)
      if (session) {
        const { data } = await supabase
          .from('profile')
          .select('*')
          .eq('id', session?.user.id)
          .single()
        setProfile(data || null)
      }

      setSession(session)
      setIsLoading(false)
    }
    fetchSession()

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        session: session,
        isLoading: isLoading,
        profile: profile,
        isAdmin: profile?.group === 'ADMIN',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)
