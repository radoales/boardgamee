import { Button, StyleSheet, Text, View } from 'react-native'
import { logOut } from '../../auth'
import colors from '../../styles/colors'

const UserProfile: React.FC<any> = ({ navigation }) => {
  return (
    <View style={styles.userProfile}>
      <View style={styles.inner}>
        <Text style={styles.header}>Profile</Text>

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
    justifyContent: 'center',
    height: '100%',
    backgroundColor: colors.blue[100]
  },
  inner: {
    padding: 16,
    height: '50%',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    fontSize: 20,
    marginBottom: 16
  },
  button: {
    marginBottom: 16
  }
})

export default UserProfile
