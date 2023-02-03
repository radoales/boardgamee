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
import { UseGetUserById, UseUpdateUser } from '../../../hooks/users'
import { useFeedback } from '../../../hooks/feedback'

type Props = NativeStackScreenProps<
  ProfileRootStackParamList,
  Route.EDIT_USER_PROFILE
>

const EditUserProfile = ({ navigation }: Props) => {
  const [name, setName] = useState<string>('')
  const { user } = useAuth()
  const { data: userDetails } = UseGetUserById(user.id)

  const { updateUser, error, isError, isSuccess } = UseUpdateUser()

  useEffect(() => {
    if (userDetails?.name) {
      setName(userDetails.name)
    }
  }, [userDetails])

  console.log('isSuccess', isSuccess)

  useFeedback(isSuccess, isError, error ?? 'success')

  return (
    <View style={authStyles.container}>
      <View style={authStyles.userIcon}>
        <Ionicons name='person' size={100} color={colors.blue[50]} />
      </View>
      <View style={authStyles.inner}>
        <View style={authStyles.center}>
          <Text style={authStyles.userEmail}>{userDetails?.email}</Text>
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
          <Button
            title='Save'
            onPress={() => updateUser(user.id, name, user.email)}
          />
        </View>
      </View>
    </View>
  )
}

export default EditUserProfile
