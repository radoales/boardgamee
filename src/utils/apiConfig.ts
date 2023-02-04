import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MEASURAMENT_ID,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET
} from '@env'

export const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASURAMENT_ID,
  databaseURL: 'https://boardgamee-1fb35-default-rtdb.firebaseio.com'
}
