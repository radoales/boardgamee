import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, StyleSheet, Text, View } from 'react-native'
import { logOut } from '../../auth'
import { useAuth } from '../../auth/AuthUserprovider'
import { ProfileRootStackParamList } from '../../screens/Profile'
import colors from '../../styles/colors'
import { Route } from '../../utils/routes'

type Props = NativeStackScreenProps<
  ProfileRootStackParamList,
  Route.USER_PROFILE
>

const UserProfile = ({ navigation }: Props) => {
  const { user } = useAuth()

  return (
    <View style={styles.userProfile}>
      <View style={styles.header}>
        <Ionicons name='person' size={70} color={colors.blue[700]} />
      </View>
      <View style={styles.inner}>
        <View style={styles.entryRow}>
          <Ionicons name='mail-outline' size={25} color={colors.blue[700]} />
          <Text style={styles.label}>{user.email}</Text>
        </View>
        <View style={styles.entryRow}>
          <Ionicons name='person-outline' size={25} color={colors.blue[700]} />
          <Text style={styles.label}>{user.name}</Text>
        </View>
        <View style={styles.button}>
          <Button
            title='Edit profile'
            onPress={() => navigation.navigate(Route.EDIT_USER_PROFILE)}
          />
        </View>

        <View style={styles.button}>
          <Button title='Log out' onPress={() => logOut()} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  userProfile: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
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
  button: {
    marginBottom: 16
  },
  entryRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 2,
    borderColor: colors.blue[700],
    height: 50
  }
})

export default UserProfile
