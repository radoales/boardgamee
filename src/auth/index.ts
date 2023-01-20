import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
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

export const getLoggedUser = () => {
  const auth = getAuth()
  let token
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('user', user.uid)
      token = user
      // ...
    }
  })

  return token
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
