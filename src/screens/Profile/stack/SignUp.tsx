import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../../../auth/AuthUserprovider'
import { ProfileRootStackParamList } from '..'
import colors from '../../../styles/colors'
import PatitoInput from '../../../components/PatitoInput'
import authStyles from './style'

type Props = NativeStackScreenProps<ProfileRootStackParamList, 'SignUp'>

const SignUp = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [repeatPassword, setRepeatPassword] = useState<string>()
  const { signUp } = useAuth()

  const handleSubmit = () => {
    if (email && password && password === repeatPassword) {
      signUp(email, password)
    }
  }

  return (
    <View style={authStyles.container}>
      <View style={authStyles.logoContainer}>
        <Image
          style={authStyles.logo}
          source={require('../../../../assets/main_logo.png')}
        />
      </View>
      <View style={authStyles.inner}>
        <View style={authStyles.center}>
          <Text style={authStyles.title}>Create an account</Text>
        </View>
        <PatitoInput
          icon={
            <Ionicons name='mail-outline' size={20} color={colors.gray[700]} />
          }
          onChange={(e) => setEmail(e.nativeEvent.text)}
          placeholder='Email'
          style={authStyles.input}
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
          style={authStyles.input}
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
          style={authStyles.input}
          error={
            repeatPassword && password !== repeatPassword
              ? "Passwords don't match"
              : null
          }
          isPassword
        />
        <View style={authStyles.button}>
          <Button title='Sign up' onPress={handleSubmit} />
        </View>
        <Text
          style={authStyles.link}
          onPress={() => navigation.navigate('LogIn')}
        >
          HAVE AN ACCOUNT?
        </Text>
      </View>
    </View>
  )
}

export default SignUp
