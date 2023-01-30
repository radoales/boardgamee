import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View
} from 'react-native'
import { useAuth } from '../../../auth/AuthUserprovider'
import { ProfileRootStackParamList } from '..'
import colors from '../../../styles/colors'
import { emailRegex } from '../../../utils/regex'
import { Route } from '../../../utils/routes'
import PatitoInput from '../../../components/PatitoInput'
import authStyles from './style'

type Props = NativeStackScreenProps<
  ProfileRootStackParamList,
  Route.PASSWORD_RESET
>

const PassswordReset = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>()
  const { resetPassword, error, resetPasswordError } = useAuth()

  const handleSubmit = () => {
    if (email) {
      resetPassword(email)
    } else {
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
    if (resetPasswordError.isSuccess) {
      navigation.navigate(Route.LOG_IN)
    }
  }, [resetPasswordError])

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
          source={require(`../../../../assets/main_logo.png`)}
        />
      </View>
      <View style={authStyles.inner}>
        <View style={authStyles.center}>
          <Text style={authStyles.title}>Reset password</Text>
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
        <View style={authStyles.button}>
          <Button title='Reset' onPress={handleSubmit} />
        </View>
      </View>
    </View>
  )
}

export default PassswordReset
