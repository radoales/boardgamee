import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth'
import { useState } from 'react'

export const useSignUp = () => {
  const [signUpError, setSignUpError] = useState<{
    isLoading: boolean
    error: null | string
  }>({
    isLoading: false,
    error: null
  })
  const handleSignUp = async (email: string, password: string) => {
    const auth = getAuth()
    setSignUpError({ isLoading: true, error: null })
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setSignUpError({ isLoading: false, error: null })
    } catch (error: any) {
      setSignUpError({ isLoading: false, error: error.code })
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

export const useUpdateUserProfile = () => {
  const [updateUserProfileError, setUpdateUserProfileError] = useState<{
    isLoading: boolean
    error: null | string
    isSuccess: null | boolean
  }>({
    isLoading: false,
    error: null,
    isSuccess: null
  })
  const handleUpdateUserProfile = async (name: string) => {
    const auth = getAuth()
    setUpdateUserProfileError({ isLoading: true, error: null, isSuccess: null })
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name
        })
      }
      setUpdateUserProfileError({
        isLoading: false,
        error: null,
        isSuccess: true
      })
    } catch (error: any) {
      setUpdateUserProfileError({
        isLoading: false,
        error: error.code,
        isSuccess: false
      })
    }
  }
  return { handleUpdateUserProfile, updateUserProfileError }
}
