import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { signUp } from '../../auth'
import PatitoInput from '../PatitoInput'

const SignUp: React.FC = () => {
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
      <PatitoInput
        icon={<Ionicons name='lock-closed' size={20} color='#000' />}
        onChange={(e) => setRepeatPassword(e.nativeEvent.text)}
        placeholder='Repeat password'
      />
      <Button title='Submit' onPress={handleSubmit} />
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

export default SignUp
