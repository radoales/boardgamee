import { NavigationContainer } from '@react-navigation/native'
import TabMenuStackNaigator from './src/components/navigation'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MEASURAMENT_ID,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET
} from '@env'

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASURAMENT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
import { getAuth } from 'firebase/auth'

const App = () => {
  console.log('getAuth()', getAuth())
  return (
    <NavigationContainer>
      <TabMenuStackNaigator />
    </NavigationContainer>
  )
}

export default App
