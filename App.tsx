import { NavigationContainer } from '@react-navigation/native'
import TabMenuStackNaigator from './src/components/navigation'
import { initializeApp } from 'firebase/app'
import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MEASURAMENT_ID,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET
} from '@env'
import { AuthUserProvider } from './src/auth/AuthUserprovider'

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASURAMENT_ID
}

initializeApp(firebaseConfig)

const App = () => {
  return (
    <NavigationContainer>
      <AuthUserProvider>
        <TabMenuStackNaigator />
      </AuthUserProvider>
    </NavigationContainer>
  )
}

export default App
