import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { signUp } from '../../auth'
import colors from '../../styles/colors'
import PatitoInput from '../PatitoInput'

const SignUp: React.FC<any> = ({ navigation }) => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [repeatPassword, setRepeatPassword] = useState<string>()

  const handleSubmit = () => {
    if (email && password && password === repeatPassword) {
      signUp(email, password)
    } else {
      alert('Oops, sth went wrong!')
    }
  }

  return (
    <View style={styles.signUp}>
      <View style={styles.inner}>
        <Text>Sign in</Text>
        <PatitoInput
          icon={
            <Ionicons name='mail-outline' size={20} color={colors.gray[700]} />
          }
          onChange={(e) => setEmail(e.nativeEvent.text)}
          placeholder='Email'
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
        />
        <Button title='Sign up' onPress={handleSubmit} />
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
    height: '100%'
  },
  inner: {
    padding: '1rem',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  }
})

export default SignUp
