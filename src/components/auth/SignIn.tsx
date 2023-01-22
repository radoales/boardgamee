import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import {
  Button,
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

  const handleSubmit = () => {
    if (email && password) {
      signIn(email, password)
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
      <View style={styles.inner}>
        <Text style={styles.header}>Log in</Text>
        <PatitoInput
          icon={
            <Ionicons name='mail-outline' size={20} color={colors.gray[700]} />
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
              color={colors.gray[700]}
            />
          }
          onChange={(e) => setPassword(e.nativeEvent.text)}
          placeholder='Password'
          style={styles.input}
        />
        <View style={styles.button}>
          <Button title='Sign in' onPress={handleSubmit} />
        </View>
        <Text onPress={() => navigation.navigate('SignUp')}>
          Don't have an account?
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
    padding: 16,
    backgroundColor: colors.blue[50]
  },
  inner: {
    padding: 16,
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
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
  }
})

export default SignIn
