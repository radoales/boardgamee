import { NavigationContainer } from '@react-navigation/native'
import TabMenuStackNaigator from './src/screens'
import { initializeApp } from 'firebase/app'
import { AuthUserProvider } from './src/auth/AuthUserprovider'
import { LogBox } from 'react-native'
import { GameProvider } from './src/hooks/gameContext'
import { firebaseConfig } from './src/utils/apiConfig'

LogBox.ignoreLogs([
  `AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storag`
])

export const app = initializeApp(firebaseConfig)

const App = () => {
  return (
    <NavigationContainer>
      <GameProvider>
        <AuthUserProvider>
          <TabMenuStackNaigator />
        </AuthUserProvider>
      </GameProvider>
    </NavigationContainer>
  )
}

export default App
