import { NavigationContainer } from '@react-navigation/native'
import TabMenuStackNaigator from './src/components/navigation'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyBRwbRuV9QroBbqsXOTrgXwRTNTd07O4jY',
  authDomain: 'boardgamee-1fb35.firebaseapp.com',
  projectId: 'boardgamee-1fb35',
  storageBucket: 'boardgamee-1fb35.appspot.com',
  messagingSenderId: '21668682949',
  appId: '1:21668682949:web:002ff0b9dc532d39ea24ac',
  measurementId: 'G-Z02DWFS1SM'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
import { getAuth } from 'firebase/auth'

const App = () => {
  console.log('app', getAuth())
  return (
    <NavigationContainer>
      <TabMenuStackNaigator />
    </NavigationContainer>
  )
}

export default App
