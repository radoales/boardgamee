import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../../../auth/AuthUserprovider'
import { ProfileRootStackParamList } from '..'
import colors from '../../../styles/colors'
import { Route } from '../../../utils/routes'
import PatitoInput from '../../../components/PatitoInput'
import authStyles from './style'

type Props = NativeStackScreenProps<
  ProfileRootStackParamList,
  Route.EDIT_USER_PROFILE
>

const EditUserProfile = ({ navigation }: Props) => {
  const [name, setName] = useState<string>('')
  const { user, updateUserProfile } = useAuth()

  useEffect(() => {
    if (user.name) {
      setName(user.name)
    }
  }, [user])

  return (
    <View style={authStyles.container}>
      <View style={authStyles.userIcon}>
        <Ionicons name='person' size={100} color={colors.blue[50]} />
      </View>
      <View style={authStyles.inner}>
        <View style={authStyles.center}>
          <Text style={authStyles.userEmail}>{user.email}</Text>
        </View>
        <PatitoInput
          icon={
            <Ionicons name='mail-outline' size={20} color={colors.gray[700]} />
          }
          onChange={(e) => setName(e.nativeEvent.text)}
          placeholder='Name'
          style={authStyles.input}
          value={name}
        />
        <View style={authStyles.button}>
          <Button title='Save' onPress={() => updateUserProfile(name)} />
        </View>
      </View>
    </View>
  )
}

export default EditUserProfile
