import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import {
  Image,
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  View
} from 'react-native'
import { useAuth } from '../../../auth/AuthUserprovider'
import colors from '../../../styles/colors'
import { emailRegex } from '../../../utils/regex'
import { StackScreenRoute } from '../../../utils/routes'
import PatitoInput from '../../../components/common/PatitoInput'
import authStyles from './style'
import { PasswordResetScreenRouteProp } from '../../../types/navigation'
import PatitoButton from '../../../components/common/PatitoButton'

const PassswordReset: React.FC<PasswordResetScreenRouteProp> = ({
  navigation
}) => {
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
      navigation.navigate(StackScreenRoute.SIGN_IN)
    }
  }, [navigation, resetPasswordError])

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
    <View style={authStyles.scrollViewContainer}>
      <ScrollView>
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
            <View style={authStyles.button}>
              <PatitoButton title='Reset password' onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default PassswordReset
