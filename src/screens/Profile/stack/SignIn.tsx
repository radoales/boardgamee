import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { Button, Image, Platform, Text, ToastAndroid, View } from 'react-native'
import { useAuth } from '../../../auth/AuthUserprovider'
import { ProfileRootStackParamList } from '..'
import colors from '../../../styles/colors'
import { emailRegex } from '../../../utils/regex'
import { Route } from '../../../utils/routes'
import PatitoInput from '../../../components/PatitoInput'
import authStyles from './style'
import signInStyles from './signIn/style'

type Props = NativeStackScreenProps<ProfileRootStackParamList, Route.LOG_IN>

const SignIn = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const { signIn, error } = useAuth()
  const [passwordError, setPasswordError] = useState(false)

  const handleSubmit = () => {
    if (email && password) {
      signIn(email, password)
      setPasswordError(false)
    } else {
      setPasswordError(true)
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
          'please fill in the missing fields!',
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        )
      }
    }
  }

  useEffect(() => {
    if (error) {
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
          'Wrong credentials!',
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        )
      }
    }
  }, [error])

  return (
    <View style={authStyles.container}>
      <View style={authStyles.logoContainer}>
        <Image
          style={authStyles.logo}
          source={require('../../../../assets/main_logo.png')}
        />
      </View>
      <View style={authStyles.inner}>
        <View style={authStyles.center}>
          <Text style={authStyles.title}>Log in</Text>
        </View>
        <PatitoInput
          icon={
            <Ionicons name='mail-outline' size={20} color={colors.blue[700]} />
          }
          onChange={(e) => setEmail(e.nativeEvent.text)}
          placeholder='Email'
          error={email && !emailRegex.test(email) ? 'Wrong email format' : null}
          style={authStyles.input}
          type='email-address'
        />
        <PatitoInput
          icon={
            <Ionicons
              name='lock-closed-outline'
              size={20}
              color={colors.blue[700]}
            />
          }
          onChange={(e) => setPassword(e.nativeEvent.text)}
          placeholder='Password'
          style={authStyles.input}
          error={passwordError ? 'Please fill in password' : null}
          isPassword
        />
        <View style={authStyles.button}>
          <Button title='Sign in' onPress={handleSubmit} />
        </View>
        <View style={authStyles.center}>
          <Text
            style={authStyles.link}
            onPress={() => navigation.navigate(Route.PASSWORD_RESET)}
          >
            forgot password?
          </Text>
        </View>
        <View style={signInStyles.create}>
          <Text>Not a user yet? - </Text>
          <Text
            style={authStyles.link}
            onPress={() => navigation.navigate(Route.SIGN_UP)}
          >
            Create an account
          </Text>
        </View>
      </View>
    </View>
  )
}

export default SignIn
