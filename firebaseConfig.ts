import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './src/utils/apiConfig'

import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  getReactNativePersistence,
  initializeAuth
} from 'firebase/auth/react-native'

export const firebaseApp = initializeApp(firebaseConfig)

const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export { auth }
