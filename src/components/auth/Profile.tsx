import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../../auth/AuthUserprovider'
import colors from '../../styles/colors'
import PatitoInput from '../PatitoInput'

const UserProfile: React.FC<any> = ({ navigation }) => {
  const [name, setName] = useState<string>('')

  const { user, updateUserProfile } = useAuth()

  useEffect(() => {
    if (user.name) {
      setName(user.name)
    }
  }, [user])

  return (
    <View style={styles.signUp}>
      <View style={styles.inner}>
        <Text style={styles.header}>Profile</Text>
        <PatitoInput
          icon={
            <Ionicons name='mail-outline' size={20} color={colors.gray[700]} />
          }
          onChange={(e) => setName(e.nativeEvent.text)}
          placeholder='Name'
          style={styles.input}
          value={name}
        />

        <View style={styles.button}>
          <Button title='Update' onPress={() => updateUserProfile(name)} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  signUp: {
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
  input: {
    marginBottom: 16
  },
  button: {
    marginBottom: 16
  }
})

export default UserProfile
