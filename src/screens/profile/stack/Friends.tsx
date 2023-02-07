import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import colors from '../../../styles/colors'
import {
  UseGetUserFriendsById,
  UseGetUserInvitesById
} from '../../../hooks/users'
import { useAuth } from '../../../auth/AuthUserprovider'
import UserCard from '../../../components/users/UserCard'
import { FriendsScreenRouteProp } from '../../../types/navigation'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

const Friends: React.FC<FriendsScreenRouteProp> = () => {
  const { user } = useAuth()
  const { data: users, isLoading } = UseGetUserFriendsById(user.id)
  const { data: invites } = UseGetUserInvitesById(user.id)

  return (
    <View style={[styles.container]}>
      {isLoading && <ActivityIndicator size='large' />}
      {users && (
        <ScrollView>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pending</Text>
          </View>
          <View style={styles.listContainer}>
            {invites?.map((user, index) => (
              <TouchableHighlight
                key={index}
                activeOpacity={0.6}
                underlayColor={colors.gray[200]}
                onPress={() => true}
              >
                <View style={styles.inviteContainer}>
                  <UserCard data={user} />
                  <View style={styles.approvalContainer}>
                    <Ionicons
                      name='checkmark-circle'
                      size={45}
                      color={colors.blue[600]}
                    />
                    <MaterialIcons
                      name='cancel'
                      size={45}
                      color={colors.orange}
                    />
                  </View>
                </View>
              </TouchableHighlight>
            ))}
          </View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Friends</Text>
          </View>
          <View style={styles.listContainer}>
            {users.map((user, index) => (
              <TouchableHighlight
                key={index}
                activeOpacity={0.6}
                underlayColor={colors.gray[200]}
                onPress={() => true}
              >
                <UserCard data={user} />
              </TouchableHighlight>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flex: 1,

    backgroundColor: colors.white
  },
  text: {
    margin: 'auto',
    alignSelf: 'center',
    marginVertical: 'auto',
    flex: 1,
    fontFamily: 'Montserrat_400Regular'
  },
  sectionHeader: {
    backgroundColor: colors.blue[50]
  },
  sectionTitle: {
    fontSize: 20,
    marginHorizontal: '3%'
  },
  listContainer: {
    marginHorizontal: '3%'
  },
  inviteContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  approvalContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default Friends
