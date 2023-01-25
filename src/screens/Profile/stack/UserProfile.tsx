import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../../../auth/AuthUserprovider'
import { ProfileRootStackParamList } from '..'
import colors from '../../../styles/colors'
import { Route } from '../../../utils/routes'
import authStyles from './style'

type Props = NativeStackScreenProps<
  ProfileRootStackParamList,
  Route.USER_PROFILE
>

const UserProfile = ({ navigation }: Props) => {
  const { user, signOut } = useAuth()

  return (
    <View style={authStyles.container}>
      <View style={authStyles.userIcon}>
        <Ionicons name='person' size={100} color={colors.blue[50]} />
      </View>
      <View style={authStyles.inner}>
        <View style={styles.userInfo}>
          <View style={authStyles.center}>
            <Text style={styles.userName}>{user.name}</Text>
          </View>
          <View style={authStyles.center}>
            <Text style={authStyles.userEmail}>{user.email}</Text>
          </View>
        </View>
        <View style={authStyles.button}>
          <Button
            title='Edit profile'
            onPress={() => navigation.navigate(Route.EDIT_USER_PROFILE)}
          />
        </View>
        <View style={authStyles.button}>
          <Button title='Log out' onPress={() => signOut()} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Content</Text>
        <View style={styles.sectionContent}>
          <View style={styles.sectionItemRow}>
            <View style={styles.sectionItem}>
              <Ionicons name='heart-outline' size={25} />
              <Text style={styles.sectionItetitle}>Favourites</Text>
            </View>
            <Ionicons name='chevron-forward' size={25} />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 16
  },
  userName: {
    fontSize: 30,
    color: colors.gray[900]
  },
  section: {
    width: '100%'
  },
  sectionTitle: {
    display: 'flex',
    backgroundColor: colors.blue[50],
    paddingLeft: 32,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 25,
    marginBottom: 16
  },
  sectionContent: {
    paddingLeft: 32,
    paddingRight: 32
  },
  sectionItemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  sectionItetitle: {
    fontSize: 25,
    marginLeft: 10
  }
})

export default UserProfile