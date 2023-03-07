import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium
} from '@expo-google-fonts/montserrat'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../../styles/colors'
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { User } from '../../types/user'
import { Invite } from '../../types/invite'
import PatitoButton from '../common/PatitoButton'

interface UserCardProps {
  data: User | Invite
  addFriend?: () => void
  removeFriend?: () => void
}

const UserCard: React.FC<UserCardProps> = ({
  data,
  addFriend,
  removeFriend
}) => {
  const [] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium
  })

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <View style={styles.imageContainer}>
          <View style={styles.userIcon}>
            <Ionicons name='person' size={25} color={colors.blue[50]} />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{data.name}</Text>
          <Text numberOfLines={1} style={styles.header}>
            {data.username}
          </Text>
        </View>
      </View>
      {removeFriend && (
        <View style={styles.btn}>
          <PatitoButton
            type={'secondary'}
            onPress={removeFriend}
            icon={
              <FontAwesome5
                name='user-minus'
                size={16}
                color={colors.blue[600]}
              />
            }
            title={'Remove'}
          />
        </View>
      )}
      {addFriend && (
        <View style={styles.btn}>
          <PatitoButton
            type={'primary'}
            onPress={addFriend}
            icon={
              <FontAwesome name='user-plus' size={16} color={colors.white} />
            }
            title={'Invite'}
          />
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: '3%'
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: '3%',
    width: 200
  },
  btn: { width: 120 },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    paddingLeft: 10
  },
  header: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 14,
    lineHeight: 24,
    color: colors.gray[700],
    textTransform: 'capitalize'
  },
  name: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    color: '#000',
    marginBottom: 2
  },
  userIcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    borderRadius: 100,
    backgroundColor: colors.blue[500],
    width: 50,
    height: 50
  }
})
export default UserCard
