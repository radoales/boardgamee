import { ExpoConfig } from 'expo/config'

const config: ExpoConfig = {
  name: 'my-app',
  slug: 'my-app',
  extra: {
    apiKey: process.env.API_KEY
  }
}

export default config
