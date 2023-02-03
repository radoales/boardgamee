import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import {
  useLogOut,
  useUpdateUserProfile,
  useResetPassword,
  useSignIn,
  useSignUp
} from '../hooks/auth'
import { AuthUser } from '../models/user'

interface ContextValue {
  user: AuthUser
  isLoading: boolean
  isAuthenticated: boolean
  signUp: (email: string, password: string) => void
  signIn: (email: string, password: string) => void
  signOut: () => void
  updateUserProfile: (name: string) => void
  resetPassword: (email: string) => void
  error?: string | null
  signUpError?: {
    isLoading: boolean
    error: string | null
    isSuccess: boolean | null
    id?: string
  }
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
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>()
  const { handleSignIn, signInError } = useSignIn()
  const { handleLogOut } = useLogOut()
  const { handleResetPassword, resetPasswordError } = useResetPassword()
  const { handleUpdateUserProfile, updateUserProfileError } =
    useUpdateUserProfile()
  const { handleSignUp, signUpError } = useSignUp()

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
      signUp: (email: string, password: string) =>
        handleSignUp(email, password),
      signIn: (email: string, password: string) =>
        handleSignIn(email, password),
      signOut: () => handleLogOut(),
      resetPassword: (email: string) => handleResetPassword(email),
      updateUserProfile: (name: string) => handleUpdateUserProfile(name),
      error: error,
      resetPasswordError,
      signUpError
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
          name: user.displayName ?? '',
          email: user.email ?? '',
          id: user.uid
        })
      } else {
        setIsAuthenticated(false)
        setIsLoading(false)
        setAuthUser({} as AuthUser)
      }
    })
  }, [auth, signInError, updateUserProfileError, signUpError])

  return (
    <AuthUserContext.Provider value={{ ...values }}>
      {children}
    </AuthUserContext.Provider>
  )
}

export const useAuth = () => useContext(AuthUserContext)
