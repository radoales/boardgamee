import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import colors from '../../../styles/colors'
import { UseGetUserById, UseGetUsers } from '../../../hooks/users'
import { useAuth } from '../../../auth/AuthUserprovider'
import { FriendsScreenRouteProp } from '../../../types/navigation'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import InvitationCard from '../../../components/cards/InvitationCard'
import UserCard from '../../../components/cards/UserCard'
import {
  useCreateInvitation,
  UseDeleteInvitation,
  UseGetUserInvitationsById,
  UseUpdateInvitation
} from '../../../hooks/invitations'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import { UseGetUserFriendsById } from '../../../hooks/friends'

const Friends: React.FC<FriendsScreenRouteProp> = () => {
  const { user: loggedInUser } = useAuth()
  const { data: authUser } = UseGetUserById(loggedInUser.id)
  const { data: users, isLoading: isLoadingusers } = UseGetUsers()
  const { data: friends, isLoading } = UseGetUserFriendsById(authUser?.id ?? '')
  const { data: invites, isLoading: isLoadingInvites } =
    UseGetUserInvitationsById(authUser?.id ?? '')
  const { mutate: updateInvitation } = UseUpdateInvitation()
  const { mutate: createInvite } = useCreateInvitation()
  const { mutate: deleteInvitation } = UseDeleteInvitation()

  return (
    <View style={[styles.container]}>
      {isLoadingusers || isLoadingInvites || isLoading ? (
        <LoadingSpinner />
      ) : (
        <ScrollView>
          {invites &&
            invites.filter((invite) => invite.status === 0)?.length > 0 && (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Pending</Text>
                </View>
                <View style={styles.listContainer}>
                  {invites && invites?.length > 0 ? (
                    invites
                      .filter((invite) => invite.status === 0)
                      ?.map((invite, index) => {
                        const inviteUser = users?.find(
                          (user) => user.id === invite.userId
                        )
                        return (
                          <TouchableHighlight
                            key={index}
                            activeOpacity={0.6}
                            underlayColor={colors.gray[200]}
                            onPress={() => true}
                          >
                            <View style={styles.inviteContainer}>
                              <InvitationCard
                                userName={inviteUser?.username ?? ''}
                                name={inviteUser?.name}
                              />
                              <View style={styles.approvalContainer}>
                                {invite.type === 'received' && (
                                  <Ionicons
                                    name='checkmark-circle'
                                    size={45}
                                    color={colors.blue[600]}
                                    onPress={() =>
                                      updateInvitation({
                                        id: invite.id,
                                        status: 1
                                      })
                                    }
                                  />
                                )}
                                <MaterialIcons
                                  name='cancel'
                                  size={45}
                                  color={colors.orange}
                                  onPress={() => deleteInvitation(invite.id)}
                                />
                              </View>
                            </View>
                          </TouchableHighlight>
                        )
                      })
                  ) : (
                    <Text>No pending invites</Text>
                  )}
                </View>
              </>
            )}
          {friends && friends?.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Friends</Text>
              </View>
              <View style={styles.listContainer}>
                {friends?.map((user, index) => (
                  <TouchableHighlight
                    key={index}
                    activeOpacity={0.6}
                    underlayColor={colors.gray[200]}
                    onPress={() => true}
                  >
                    <UserCard
                      data={user}
                      removeFriend={() =>
                        deleteInvitation(
                          invites?.find(
                            (invite) =>
                              invite.status === 1 && invite.userId === user.id
                          )?.id ?? ''
                        )
                      }
                    />
                  </TouchableHighlight>
                ))}
              </View>
            </>
          )}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All users</Text>
          </View>
          <View style={styles.listContainer}>
            {users
              ?.filter(
                (user) => !invites?.some((invite) => invite.userId === user.id)
              )
              ?.map((user, index) => (
                <TouchableHighlight
                  key={index}
                  activeOpacity={0.6}
                  underlayColor={colors.gray[200]}
                  onPress={() => true}
                >
                  <UserCard
                    addFriend={() =>
                      createInvite({
                        sender_id: authUser?.id,
                        receiver_id: user.id
                      })
                    }
                    data={user}
                  />
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
