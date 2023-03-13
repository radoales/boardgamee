/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  deleteUser
} from 'firebase/auth'
import { useState } from 'react'
import { queryClient } from '../../App'
import { auth } from '../../firebaseConfig'
import { User, UserDto } from '../types/user'
import { restApiRequest } from '../utils/api'

export const useSignUp = () => {
  return useMutation(
    async (params: UserDto) => {
      const response = await createUserWithEmailAndPassword(
        auth,
        params.email,
        params.password
      )

      if (response.user) {
        const restApiUserResponse = await restApiRequest<Partial<User>>({
          url: 'users',
          method: 'POST',
          data: {
            email: params.email,
            username: params.email.split('@')[0],
            external_id: response.user.uid
          }
        })

        if (!restApiUserResponse) {
          deleteUser(response.user)
        } else {
          return restApiUserResponse
        }
      }
    },
    {
      onSuccess: (user: any) => {
        queryClient.invalidateQueries([`users/${user.id}`])
        queryClient.invalidateQueries([`users`])
      }
    }
  )
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
    try {
      await signOut(auth)
    } catch (error: any) {}
  }
  return { handleLogOut }
}
