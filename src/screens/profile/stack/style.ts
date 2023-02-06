import { StyleSheet } from 'react-native'
import colors from '../../../styles/colors'

const authStyles = StyleSheet.create({
  scrollViewContainer: {
    height: '100%',
    backgroundColor: colors.white
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%'
  },
  inner: {
    padding: 32,
    width: '100%',
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
  },
  title: {
    color: colors.gray[900],
    marginBottom: 10,
    fontSize: 25
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 200
  },
  logo: {
    height: 170,
    aspectRatio: 1.5,
    resizeMode: 'contain'
  },
  link: {
    color: colors.blue[700],
    marginBottom: 10,
    fontSize: 16
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  userIcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    borderRadius: 100,
    backgroundColor: colors.blue[500],
    width: 170,
    height: 170
  },
  userEmail: {
    fontSize: 20,
    color: colors.blue[500],
    marginBottom: 16
  }
})

export default authStyles
