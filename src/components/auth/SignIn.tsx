import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../../auth/AuthUserprovider'
import colors from '../../styles/colors'
import PatitoInput from '../PatitoInput'

const SignIn: React.FC<any> = ({ navigation }) => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const { signIn } = useAuth()

  const handleSubmit = () => {
    if (email && password) {
      signIn(email, password)
    } else {
      alert('Oops, sth went wrong!')
    }
  }

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
    justifyContent: 'center',
    height: '100%',
    backgroundColor: colors.blue[100]
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

export default SignIn
