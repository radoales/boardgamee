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
  UseAcceptInvite,
  UseGetUserFriendsById,
  UseGetUserInvitesById
} from '../../../hooks/users'
import { useAuth } from '../../../auth/AuthUserprovider'
import UserCard from '../../../components/users/UserCard'
import { FriendsScreenRouteProp } from '../../../types/navigation'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import PatitoInput from '../../../components/common/PatitoInput'
import PatitoButton from '../../../components/common/PatitoButton'
import { useState } from 'react'

const Friends: React.FC<FriendsScreenRouteProp> = () => {
  const { user } = useAuth()
  const [value, setValue] = useState('')
  const { data: users, isLoading } = UseGetUserFriendsById(user.id)
  const { data: invites } = UseGetUserInvitesById(user.id)
  const { accept } = UseAcceptInvite()

  return (
    <View style={[styles.container]}>
      {isLoading && <ActivityIndicator size='large' />}
      {users && (
        <ScrollView>
          <View
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
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pending</Text>
          </View>
          <View style={styles.listContainer}>
            {invites && invites?.length > 0 ? (
              invites?.map((invite, index) => (
                <TouchableHighlight
                  key={index}
                  activeOpacity={0.6}
                  underlayColor={colors.gray[200]}
                  onPress={() => true}
                >
                  <View style={styles.inviteContainer}>
                    <UserCard data={invite} />
                    <View style={styles.approvalContainer}>
                      <Ionicons
                        name='checkmark-circle'
                        size={45}
                        color={colors.blue[600]}
                        onPress={() => accept(invite.id)}
                      />
                      <MaterialIcons
                        name='cancel'
                        size={45}
                        color={colors.orange}
                      />
                    </View>
                  </View>
                </TouchableHighlight>
              ))
            ) : (
              <Text>No pending invites</Text>
            )}
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
