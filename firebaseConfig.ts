import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './src/utils/apiConfig'

export const firebaseApp = initializeApp(firebaseConfig)
