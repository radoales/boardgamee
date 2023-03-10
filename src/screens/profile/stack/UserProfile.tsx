import { Ionicons } from '@expo/vector-icons'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { useAuth } from '../../../auth/AuthUserprovider'
import colors from '../../../styles/colors'
import { StackScreenRoute } from '../../../utils/routes'
import authStyles from './style'
import PatitoButton from '../../../components/common/PatitoButton'
import { UseGetUserById } from '../../../hooks/users'
import { UserProfileScreenRouteProp } from '../../../types/navigation'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import { useEffect, useContext } from 'react'
import { SessionContext } from '../../../hooks/sessionContext'

const UserProfile: React.FC<UserProfileScreenRouteProp> = ({ navigation }) => {
  const { user, signOut, isAuthenticated, isSignUpError } = useAuth()
  const { setUserId } = useContext(SessionContext)
  const { data: userDetails } = UseGetUserById(user.id, !isSignUpError)

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace(StackScreenRoute.SIGN_IN)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])
  useEffect(() => {
    if (userDetails) {
      setUserId(userDetails.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails])

  return userDetails ? (
    <View style={authStyles.scrollViewContainer}>
      <ScrollView>
        <View style={authStyles.container}>
          <View style={authStyles.userIcon}>
            <Ionicons name='person' size={100} color={colors.blue[50]} />
          </View>
          <View style={authStyles.inner}>
            <View style={styles.userInfo}>
              <View style={authStyles.center}>
                <Text style={styles.name}>{userDetails.name}</Text>
              </View>
              <View style={authStyles.center}>
                <Text style={styles.userName}>@{userDetails.username}</Text>
              </View>
              <View style={authStyles.center}>
                <Text style={authStyles.userEmail}>{userDetails.email}</Text>
              </View>
            </View>
            <View style={authStyles.button}>
              <PatitoButton
                title='Edit profile'
                onPress={() =>
                  navigation.navigate(StackScreenRoute.EDIT_USER_PROFILE)
                }
              />
            </View>
            <View style={authStyles.button}>
              <PatitoButton title='Log out' onPress={() => signOut()} />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Content</Text>
            <View style={styles.sectionContent}>
              <TouchableHighlight
                onPress={() => navigation.navigate(StackScreenRoute.FRIENDS)}
                activeOpacity={0.6}
                underlayColor={colors.gray[200]}
              >
                <View style={styles.sectionItemRow}>
                  <View style={styles.sectionItem}>
                    <Ionicons name='people-outline' size={25} />
                    <Text style={styles.sectionItetitle}>Friends</Text>
                  </View>
                  <Ionicons name='chevron-forward' size={25} />
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  ) : (
    <LoadingSpinner />
  )
}

const styles = StyleSheet.create({
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 16
  },
  userName: {
    fontSize: 20,
    color: colors.gray[600]
  },
  name: {
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
    alignItems: 'center',
    marginBottom: 16
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
