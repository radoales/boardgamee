import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'

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

export const logIn = (email: string, password: string) => {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
    })
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
