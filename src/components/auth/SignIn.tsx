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
import { useAuth } from '../../auth/AuthUserprovider'
import { ProfileRootStackParamList } from '../../screens/Profile'
import colors from '../../styles/colors'
import { emailRegex } from '../../utils/regex'
import PatitoInput from '../PatitoInput'

type Props = NativeStackScreenProps<ProfileRootStackParamList, 'LogIn'>

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
    <View style={styles.signIn}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../../assets/boardgamee-high-resolution-logo-color-on-transparent-background.png')}
        />
      </View>
      <View style={styles.inner}>
        <PatitoInput
          icon={
            <Ionicons name='mail-outline' size={20} color={colors.blue[700]} />
          }
          onChange={(e) => setEmail(e.nativeEvent.text)}
          placeholder='Email'
          error={email && !emailRegex.test(email) ? 'Wrong email format' : null}
          style={styles.input}
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
          style={styles.input}
          error={passwordError ? 'Please fill in password' : null}
          isPassword
        />
        <View style={styles.button}>
          <Button title='Sign in' onPress={handleSubmit} />
        </View>
        <Text
          style={styles.options}
          onPress={() => navigation.navigate('SignUp')}
        >
          DON'T HAVE AN ACCOUNT?
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  signIn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    backgroundColor: colors.blue[50]
  },
  inner: {
    padding: 32,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.white
  },
  header: {
    fontSize: 20,
    marginBottom: 16
  },
  input: {
    marginBottom: 16
  },
  button: {
    marginBottom: 16
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: colors.blue[700]
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 200
  },
  logo: {
    height: 100,
    aspectRatio: 1.5,
    resizeMode: 'contain'
  }
})

export default SignIn
