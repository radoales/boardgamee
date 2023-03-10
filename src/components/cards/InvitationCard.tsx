import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium
} from '@expo-google-fonts/montserrat'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../../styles/colors'
import { Ionicons } from '@expo/vector-icons'

interface InvitationCardProps {
  name?: string
  userName: string
}

const InvitationCard: React.FC<InvitationCardProps> = ({ userName, name }) => {
  const [] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium
  })

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.userIcon}>
          <Ionicons name='person' size={25} color={colors.blue[50]} />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.name}>
          {name ?? userName}
        </Text>
        <Text style={styles.header}>{userName}</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: '3%',
    maxWidth: '65%'
  },
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
export default InvitationCard
