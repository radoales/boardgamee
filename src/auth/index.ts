import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'
import { useState } from 'react'

export const signUp = (email: string, password: string) => {
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      // ..
    })
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

export const logOut = () => {
  const auth = getAuth()
  signOut(auth)
    .then(() => {})
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
    })
}

export const updateUserProfile = (name: string) => {
  const auth = getAuth()
  if (auth.currentUser) {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      })
  }
}
