/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth'
import { useState } from 'react'
import { User } from '../types/user'
import { restApiRequest } from '../utils/api'

export const useSignUp = () => {
  const [signUpError, setSignUpError] = useState<{
    isLoading: boolean
    error: null | string
    isSuccess: null | boolean
    id?: string
  }>({
    isLoading: false,
    error: null,
    isSuccess: null
  })
  const handleSignUp = async (email: string, password: string) => {
    const auth = getAuth()
    setSignUpError({ isLoading: true, error: null, isSuccess: null })
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      restApiRequest<Partial<User>>({
        url: 'users',
        method: 'POST',
        data: { email, username: email, external_id: response.user.uid }
      })
      setSignUpError({
        isLoading: false,
        error: null,
        isSuccess: true,
        id: response.user.uid
      })
    } catch (error: any) {
      setSignUpError({ isLoading: false, error: error.code, isSuccess: false })
    }
  }
  return { handleSignUp, signUpError }
}

export const useSignIn = () => {
  const [signInError, setSignInError] = useState<{
    isLoading: boolean
    error: null | string
  }>({
    isLoading: false,
    error: null
  })
  const handleSignIn = async (email: string, password: string) => {
    const auth = getAuth()
    setSignInError({ isLoading: true, error: null })
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setSignInError({ isLoading: false, error: null })
    } catch (error: any) {
      setSignInError({ isLoading: false, error: error.code })
    }
  }
  return { handleSignIn, signInError }
}

export const useResetPassword = () => {
  const [resetPasswordError, setResetPasswordError] = useState<{
    isLoading: boolean
    error: null | string
    isSuccess: null | boolean
  }>({
    isLoading: false,
    error: null,
    isSuccess: null
  })
  const handleResetPassword = async (email: string) => {
    const auth = getAuth()
    setResetPasswordError({ isLoading: true, error: null, isSuccess: null })
    try {
      await sendPasswordResetEmail(auth, email)
      setResetPasswordError({ isLoading: false, error: null, isSuccess: true })
    } catch (error: any) {
      setResetPasswordError({
        isLoading: false,
        error: error.code,
        isSuccess: false
      })
    }
  }
  return { handleResetPassword, resetPasswordError }
}

export const useLogOut = () => {
  const handleLogOut = async () => {
    const auth = getAuth()
    try {
      await signOut(auth)
    } catch (error: any) {}
  }
  return { handleLogOut }
}
