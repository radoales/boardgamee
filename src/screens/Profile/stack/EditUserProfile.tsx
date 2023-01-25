import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../../../auth/AuthUserprovider'
import { ProfileRootStackParamList } from '..'
import colors from '../../../styles/colors'
import { Route } from '../../../utils/routes'
import PatitoInput from '../../../components/PatitoInput'

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
    <View style={styles.editUserProfile}>
      <View style={styles.header}>
        <Ionicons name='person' size={70} color={colors.blue[700]} />
      </View>
      <View style={styles.inner}>
        <Text style={styles.label}>{user.email}</Text>
        <PatitoInput
          icon={
            <Ionicons name='mail-outline' size={20} color={colors.gray[700]} />
          }
          onChange={(e) => setName(e.nativeEvent.text)}
          placeholder='Name'
          style={styles.input}
          value={name}
        />

        <View style={styles.button}>
          <Button title='Save' onPress={() => updateUserProfile(name)} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  editUserProfile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    padding: 16,
    backgroundColor: colors.blue[50]
  },
  inner: {
    padding: 16,
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    marginBottom: 16,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.blue[700],
    width: 100,
    height: 100
  },
  label: {
    fontSize: 22,
    marginLeft: 25,
    color: colors.gray[700]
  },
  input: {
    marginBottom: 16
  },
  button: {
    marginBottom: 16
  }
})

export default EditUserProfile
