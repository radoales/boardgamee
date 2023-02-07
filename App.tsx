import { NavigationContainer } from '@react-navigation/native'
import TabMenuStackNaigator from './src/screens'
import { AuthUserProvider } from './src/auth/AuthUserprovider'
import { LogBox } from 'react-native'
import { GameProvider } from './src/hooks/gameContext'
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold
} from '@expo-google-fonts/montserrat'

LogBox.ignoreLogs([
  `AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storag`
])

const App = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold
  })

  if (!fontsLoaded) {
    return null
  }

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
