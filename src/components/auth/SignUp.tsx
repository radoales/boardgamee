import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
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
      <View style={styles.inner}>
        <Text style={styles.header}>Sign in</Text>
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

        <Text onPress={() => navigation.navigate('LogIn')}>
          Have an account?
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
    padding: 16,
    height: '50%',
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

export default SignUp
