import { ExpoConfig } from 'expo/config'

const config: ExpoConfig = {
  name: 'boardgamee',
  slug: 'boardgamee',
  extra: {
    eas: {
      projectId: 'bd68551c-6279-4844-af89-0b98a0d9e46e'
    }
  },
  android: {
    package: 'com.web.app',
    versionCode: 1
  }
}

export default config
