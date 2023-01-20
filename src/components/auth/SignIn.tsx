import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { logIn } from '../../auth'
import colors from '../../styles/colors'
import PatitoInput from '../PatitoInput'

const SignIn: React.FC<any> = ({ navigation }) => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const handleSubmit = () => {
    if (email && password) {
      logIn(email, password)
    } else {
      alert('Oops, sth went wrong!')
    }
  }

  return (
    <View style={styles.signIn}>
      <View style={styles.inner}>
        <Text>Log in</Text>
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
        <Button title='Sign in' onPress={handleSubmit} />
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

export default SignIn
