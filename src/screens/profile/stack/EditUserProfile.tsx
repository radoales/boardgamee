import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { Button, Keyboard, ScrollView, Text, View } from 'react-native'
import { useAuth } from '../../../auth/AuthUserprovider'
import colors from '../../../styles/colors'
import PatitoInput from '../../../components/common/PatitoInput'
import authStyles from './style'
import { UseGetUserById, UseUpdateUser } from '../../../hooks/users'
import { useFeedback } from '../../../hooks/feedback'
import { EditUserProfileScreenRouteProp } from '../../../types/navigation'

const EditUserProfile: React.FC<EditUserProfileScreenRouteProp> = ({
  navigation
}) => {
  const [name, setName] = useState<string>('')
  const { user } = useAuth()

  const { data: userDetails } = UseGetUserById(user.id)
  const { updateUser, error, isError, isSuccess } = UseUpdateUser()
  useFeedback(isSuccess, isError, error ?? 'success')

  useEffect(() => {
    if (userDetails?.name) {
      setName(userDetails.name)
    }
  }, [userDetails])

  useEffect(() => {
    if (isSuccess) {
      Keyboard.dismiss()
    }
  }, [isSuccess])

  return (
    <View style={authStyles.scrollViewContainer}>
      <ScrollView>
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
                <Ionicons
                  name='mail-outline'
                  size={20}
                  color={colors.gray[700]}
                />
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
      </ScrollView>
    </View>
  )
}

export default EditUserProfile
