import { NavigationContainer } from '@react-navigation/native'
import TabMenuStackNaigator from './src/screens'
import { AuthUserProvider } from './src/auth/AuthUserprovider'
import { AppState, AppStateStatus, LogBox, Platform } from 'react-native'
import { GameProvider } from './src/hooks/gameContext'
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold
} from '@expo-google-fonts/montserrat'
import {
  focusManager,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { useOnlineManager } from './src/hooks/query'
import { useEffect } from 'react'

LogBox.ignoreLogs([
  `AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storag`
])

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } }
})

const App = () => {
  useOnlineManager()

  const onAppStateChange = (status: AppStateStatus) => {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active')
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange)
    return () => subscription.remove()
  }, [])

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_500Medium
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <GameProvider>
          <AuthUserProvider>
            <TabMenuStackNaigator />
          </AuthUserProvider>
        </GameProvider>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export default App
