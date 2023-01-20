import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { logIn } from '../../auth'
import PatitoInput from '../PatitoInput'

const SignIn: React.FC = ({ navigation }) => {
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
    <View style={styles.signUp}>
      <PatitoInput
        icon={<Ionicons name='mail' size={20} color='#000' />}
        onChange={(e) => setEmail(e.nativeEvent.text)}
        placeholder='Email'
      />
      <PatitoInput
        icon={<Ionicons name='lock-closed' size={20} color='#000' />}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        placeholder='Password'
      />
      <Button title='Sign in' onPress={handleSubmit} />
      <Text onPress={() => navigation.navigate('SignUp')}>
        Don't have an account?
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  signUp: {
    padding: '1rem',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  }
})

export default SignIn
