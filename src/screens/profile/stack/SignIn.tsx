import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View
} from 'react-native'
import { useAuth } from '../../../auth/AuthUserprovider'
import colors from '../../../styles/colors'
import { emailRegex } from '../../../utils/regex'
import PatitoInput from '../../../components/common/PatitoInput'
import authStyles from './style'
import { StackScreenRoute } from '../../../utils/routes'
import { SignInScreenRouteProp } from '../../../types/navigation'
import PatitoButton from '../../../components/common/PatitoButton'

const SignIn: React.FC<SignInScreenRouteProp> = ({ navigation }) => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const { signIn, error, isAuthenticated, isLoading } = useAuth()
  const [passwordError, setPasswordError] = useState(false)

  const handleSubmit = () => {
    if (email && password) {
      signIn(email, password)
      setPasswordError(false)
    } else {
      setPasswordError(true)
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

  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace(StackScreenRoute.USER_PROFILE)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <View style={authStyles.scrollViewContainer}>
      <ScrollView>
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
                <Ionicons
                  name='mail-outline'
                  size={20}
                  color={colors.blue[700]}
                />
              }
              onChange={(e) => setEmail(e.nativeEvent.text)}
              placeholder='Email'
              error={
                email && !emailRegex.test(email) ? 'Wrong email format' : null
              }
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
              <PatitoButton
                isLoading={isLoading}
                title='Sign in'
                onPress={handleSubmit}
              />
            </View>
            <View style={authStyles.center}>
              <Text
                style={authStyles.link}
                onPress={() =>
                  navigation.navigate(StackScreenRoute.PASSWORD_RESET)
                }
              >
                forgot password?
              </Text>
            </View>
            <View style={signInStyles.create}>
              <Text>Not a user yet? - </Text>
              <Text
                style={authStyles.link}
                onPress={() => navigation.navigate(StackScreenRoute.SIGN_UP)}
              >
                Create an account
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const signInStyles = StyleSheet.create({
  create: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

export default SignIn
