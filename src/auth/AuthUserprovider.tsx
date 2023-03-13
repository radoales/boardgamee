/* eslint-disable no-unused-vars */
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import {
  useLogOut,
  useResetPassword,
  useSignIn,
  useSignUp
} from '../hooks/auth'
import { AuthUser } from '../models/user'

interface ContextValue {
  user: AuthUser
  isLoading: boolean
  isAuthenticated: boolean
  signUp: (email: string, password: string) => boolean
  signIn: (email: string, password: string) => void
  signOut: () => void
  // updateUserProfile: (name: string) => void
  resetPassword: (email: string) => void
  error?: string | null
  isSignUpError?: boolean
  resetPasswordError: {
    isLoading: boolean
    error: string | null
    isSuccess: boolean | null
  }
}

interface AuthUserContext {
  children: React.ReactNode
}

const AuthUserContext = createContext<ContextValue>({} as ContextValue)

export const AuthUserProvider: React.FC<AuthUserContext> = ({ children }) => {
  const auth = getAuth()
  const [authUser, setAuthUser] = useState({} as AuthUser)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>()
  const { handleSignIn, signInError } = useSignIn()
  const { handleLogOut } = useLogOut()
  const { handleResetPassword, resetPasswordError } = useResetPassword()
  const {
    mutate: handleSignUp,
    isSuccess,
    isLoading: isSignUpError
  } = useSignUp()

  useEffect(() => {
    if (typeof signInError.error === 'string') {
      setError(signInError.error)
    }
  }, [signInError])

  const values = useMemo(
    () => ({
      user: authUser,
      isLoading: isLoading,
      isAuthenticated: isAuthenticated,
      signUp: (email: string, password: string) => {
        setIsLoading(true)
        handleSignUp({ email, password })
        return isSuccess
      },
      signIn: (email: string, password: string) => {
        setIsLoading(true)
        handleSignIn(email, password)
      },
      signOut: () => handleLogOut(),
      resetPassword: (email: string) => handleResetPassword(email),
      error: error,
      resetPasswordError,
      isSignUpError
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authUser, resetPasswordError]
  )
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
        setIsLoading(false)
        setAuthUser({
          email: user.email ?? '',
          id: user.uid
        })
      } else {
        setIsAuthenticated(false)
        setAuthUser({} as AuthUser)
      }
      setIsLoading(signInError.isLoading || isSignUpError)
    })
  }, [auth, signInError, isSignUpError])

  return (
    <AuthUserContext.Provider value={{ ...values }}>
      {children}
    </AuthUserContext.Provider>
  )
}

export const useAuth = () => useContext(AuthUserContext)
