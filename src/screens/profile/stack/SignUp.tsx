import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { Button, Image, ScrollView, Text, View } from 'react-native'
import { useAuth } from '../../../auth/AuthUserprovider'
import colors from '../../../styles/colors'
import PatitoInput from '../../../components/common/PatitoInput'
import authStyles from './style'
import { UseCreateUser } from '../../../hooks/users'
import { StackScreenRoute } from '../../../utils/routes'
import { SignUpScreenRouteProp } from '../../../types/navigation'

const SignUp: React.FC<SignUpScreenRouteProp> = ({ navigation }) => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [repeatPassword, setRepeatPassword] = useState<string>()
  const { signUp, signUpError } = useAuth()
  const { createUser } = UseCreateUser()

  const handleSubmit = () => {
    if (email && password && password === repeatPassword) {
      signUp(email, password)
    }
  }

  useEffect(() => {
    if (signUpError?.isSuccess && signUpError.id && email) {
      createUser(signUpError.id, email)
    }
  }, [signUpError, email])

  return (
    <View style={authStyles.container}>
      <ScrollView>
        <View style={authStyles.scrollViewContainer}>
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
                <Ionicons
                  name='mail-outline'
                  size={20}
                  color={colors.gray[700]}
                />
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
              onPress={() => navigation.navigate(StackScreenRoute.SIGN_IN)}
            >
              HAVE AN ACCOUNT?
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default SignUp
