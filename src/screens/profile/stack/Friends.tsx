import {
  ActivityIndicator,
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
// import PatitoInput from '../../../components/common/PatitoInput'
// import PatitoButton from '../../../components/common/PatitoButton'
// import { useState } from 'react'
import InvitationCard from '../../../components/users/InvitationCard'
import UserCard from '../../../components/users/UserCard'
import {
  UseGetUserFriendsById,
  UseGetUserInvitationsById,
  UseUpdateInvitation
} from '../../../hooks/friends'

const Friends: React.FC<FriendsScreenRouteProp> = () => {
  const { user: loggedInUser } = useAuth()
  const { data: user } = UseGetUserById(loggedInUser.id)
  // const [value, setValue] = useState('')
  const { data: users, isLoading: isLoadingusers } = UseGetUsers()
  const { data: friends, isLoading } = UseGetUserFriendsById(user?.id ?? '')
  const { data: invites, isLoading: isLoadingInvites } =
    UseGetUserInvitationsById(user?.id ?? '')
  const { updateInvitation, data } = UseUpdateInvitation()

  console.log('data', data)

  return (
    <View style={[styles.container]}>
      {isLoadingusers || isLoadingInvites || isLoading ? (
        <ActivityIndicator size='large' />
      ) : (
        <ScrollView>
          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: '3%',
              marginBottom: 10
            }}
          >
            <PatitoInput
              value={value}
              onChange={(e) => setValue(e.nativeEvent.text)}
              style={{ flex: 1, marginRight: 10 }}
            />
            <PatitoButton
              onPress={() => true}
              style={{ width: 100, height: 45 }}
              title='Send'
            />
          </View> */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pending</Text>
          </View>
          <View style={styles.listContainer}>
            {invites && invites?.length > 0 ? (
              invites
                .filter((invite) => invite.status === 0)
                ?.map((invite, index) => {
                  console.log('invite', invite)
                  const inviteUser = users?.find(
                    (user) => user.id === invite.sender_id
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
                          createdAt={invite.created_at}
                        />
                        <View style={styles.approvalContainer}>
                          <Ionicons
                            name='checkmark-circle'
                            size={45}
                            color={colors.blue[600]}
                            onPress={() => updateInvitation(invite.id, 1)}
                          />
                          <MaterialIcons
                            name='cancel'
                            size={45}
                            color={colors.orange}
                            onPress={() => updateInvitation(invite.id, 2)}
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
