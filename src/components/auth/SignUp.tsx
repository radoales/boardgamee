import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import { signUp } from '../../auth'
import { ProfileRootStackParamList } from '../../screens/Profile'
import colors from '../../styles/colors'
import PatitoInput from '../PatitoInput'

type Props = NativeStackScreenProps<ProfileRootStackParamList, 'SignUp'>

const SignUp = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [repeatPassword, setRepeatPassword] = useState<string>()

  const handleSubmit = () => {
    if (email && password && password === repeatPassword) {
      signUp(email, password)
    }
  }

  return (
    <View style={styles.signUp}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../../assets/boardgamee-high-resolution-logo-color-on-transparent-background.png')}
        />
      </View>
      <View style={styles.inner}>
        <PatitoInput
          icon={
            <Ionicons name='mail-outline' size={20} color={colors.gray[700]} />
          }
          onChange={(e) => setEmail(e.nativeEvent.text)}
          placeholder='Email'
          style={styles.input}
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
          isPassword
        />
        <PatitoInput
          icon={
            <Ionicons
              name='lock-closed-outline'
              size={20}
              color={colors.gray[700]}
            />
          }
          onChange={(e) => setRepeatPassword(e.nativeEvent.text)}
          placeholder='Repeat password'
          style={styles.input}
          error={
            repeatPassword && password !== repeatPassword
              ? "Passwords don't match"
              : null
          }
          isPassword
        />
        <View style={styles.button}>
          <Button title='Sign up' onPress={handleSubmit} />
        </View>
        <Text
          style={styles.options}
          onPress={() => navigation.navigate('LogIn')}
        >
          HAVE AN ACCOUNT?
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  signUp: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: colors.blue[50]
  },
  inner: {
    padding: 32,
    width: '100%',
    height: '80%', // WHY?
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
    alignItems: 'center',
    height: 200
  },
  logo: {
    height: 100,
    aspectRatio: 1.5,
    resizeMode: 'contain'
  }
})

export default SignUp
