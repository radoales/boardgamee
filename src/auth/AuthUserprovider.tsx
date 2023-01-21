import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { logIn, logOut, updateUserProfile } from '.'

interface AuthUser {
  name: string
  email: string
}

interface ContextValue {
  user: AuthUser
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => void
  signOut: () => void
  updateUserProfile: (name: string) => void
}

interface AuthUserContext {
  children: React.ReactNode
}

const AuthUserContext = createContext<ContextValue>({} as ContextValue)

export const AuthUserProvider: React.FC<AuthUserContext> = ({ children }) => {
  const auth = getAuth()
  const [authUser, setAuthUser] = useState({} as AuthUser)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const values = useMemo(
    () => ({
      user: authUser,
      isLoading: isLoading,
      isAuthenticated: isAuthenticated,
      signIn: (email: string, password: string) => logIn(email, password),
      signOut: () => logOut(),
      updateUserProfile: (name: string) => updateUserProfile(name)
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authUser]
  )
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
        setIsLoading(false)
        setAuthUser({
          name: user.displayName ?? '',
          email: user.email ?? ''
        })
      } else {
        setIsAuthenticated(false)
        setIsLoading(false)
        setAuthUser({} as AuthUser)
      }
    })
  }, [auth])

  return (
    <AuthUserContext.Provider value={{ ...values }}>
      {children}
    </AuthUserContext.Provider>
  )
}

export const useAuth = () => useContext(AuthUserContext)
